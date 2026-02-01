/**
 * Supabase Edge Function: send-pixel
 *
 * This function is triggered by a database webhook when pixels are updated.
 * It converts hex color to RGB and sends the pixel data via MQTT to the Ulanzi TC001 display.
 *
 * Environment variables required:
 * - MQTT_BROKER: HiveMQ broker URL (e.g., "your-cluster.s1.eu.hivemq.cloud")
 * - MQTT_USERNAME: MQTT username
 * - MQTT_PASSWORD: MQTT password
 */

import mqtt from "npm:mqtt@5";

const MQTT_BROKER = Deno.env.get("MQTT_BROKER") || "";
const MQTT_USERNAME = Deno.env.get("MQTT_USERNAME") || "";
const MQTT_PASSWORD = Deno.env.get("MQTT_PASSWORD") || "";

// Log environment setup (redacted for security)
console.log(`MQTT_BROKER: ${MQTT_BROKER ? MQTT_BROKER.substring(0, 10) + "..." : "NOT SET"}`);
console.log(`MQTT_USERNAME: ${MQTT_USERNAME ? MQTT_USERNAME.substring(0, 3) + "..." : "NOT SET"}`);

interface PixelPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: {
    x: number;
    y: number;
    color: string;
    updated_at: string;
  } | null;
  old_record: {
    x: number;
    y: number;
    color: string;
    updated_at: string;
  } | null;
}

/**
 * Convert hex color (#RRGGBB) to RGB object.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Connect to MQTT broker and publish a message.
 */
async function publishToMqtt(topic: string, message: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Connecting to MQTT broker: ${MQTT_BROKER}`);

    const client = mqtt.connect(MQTT_BROKER, {
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
      protocol: "wss",
      connectTimeout: 5000,
      reconnectPeriod: 0,
      clientId: `pixel-widget-${Date.now()}`,
    });

    client.on("connect", () => {
      console.log("MQTT connected successfully");
      client.publish(topic, message, { qos: 1 }, (err) => {
        client.end();
        if (err) {
          console.error(`Failed to publish: ${err.message}`);
          reject(err);
        } else {
          console.log(`Published to ${topic}`);
          resolve();
        }
      });
    });

    client.on("error", (err) => {
      console.error(`MQTT error: ${err.message}`, err);
      client.end();
      reject(err);
    });

    client.on("offline", () => {
      console.warn("MQTT client went offline");
    });

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      console.error("MQTT connection timeout after 10s");
      client.end();
      reject(new Error("MQTT connection timeout"));
    }, 10000);

    // Clear timeout on successful connection
    client.once("connect", () => clearTimeout(timeout));
  });
}

Deno.serve(async (req) => {
  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload: PixelPayload = await req.json();

    // Only process INSERT and UPDATE events
    if (payload.type !== "INSERT" && payload.type !== "UPDATE") {
      return new Response(JSON.stringify({ message: "Ignored event type" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const record = payload.record;
    if (!record) {
      return new Response(JSON.stringify({ error: "No record in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { x, y, color } = record;
    const rgb = hexToRgb(color);

    // Format: "x,y,r,g,b" as expected by pixelwidget/pixel/set topic
    const mqttMessage = `${x},${y},${rgb.r},${rgb.g},${rgb.b}`;

    console.log(`Publishing pixel update: ${mqttMessage}`);

    await publishToMqtt("pixelwidget/pixel/set", mqttMessage);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Pixel (${x},${y}) updated to ${color}`,
        mqtt_payload: mqttMessage,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error processing pixel update:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process pixel update",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
