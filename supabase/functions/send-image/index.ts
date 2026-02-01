/**
 * Supabase Edge Function: send-image
 *
 * This function handles HTTP GET requests from the Ulanzi TC001 display
 * (or can be triggered via MQTT subscription externally).
 *
 * It fetches all pixels from the database, creates a 32x8 RGB image,
 * encodes it as base64, and publishes it via MQTT to the display.
 *
 * Environment variables required:
 * - MQTT_BROKER: HiveMQ broker URL (e.g., "your-cluster.s1.eu.hivemq.cloud")
 * - MQTT_USERNAME: MQTT username
 * - MQTT_PASSWORD: MQTT password
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase service role key (for server-side access)
 */

import mqtt from "npm:mqtt@5";
import { createClient } from "npm:@supabase/supabase-js@2";

const MQTT_BROKER = Deno.env.get("MQTT_BROKER") || "";
const MQTT_USERNAME = Deno.env.get("MQTT_USERNAME") || "";
const MQTT_PASSWORD = Deno.env.get("MQTT_PASSWORD") || "";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Log environment setup (redacted for security)
console.log(`MQTT_BROKER: ${MQTT_BROKER ? MQTT_BROKER.substring(0, 10) + "..." : "NOT SET"}`);
console.log(`MQTT_USERNAME: ${MQTT_USERNAME ? MQTT_USERNAME.substring(0, 3) + "..." : "NOT SET"}`);

const DISPLAY_WIDTH = 32;
const DISPLAY_HEIGHT = 8;

interface DisplayPixel {
  x: number;
  y: number;
  color: string;
}

/**
 * Convert hex color (#RRGGBB) to RGB values.
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return [0, 0, 0];
  }
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

/**
 * Create a 32x8 RGB buffer from pixel data.
 * Format: row by row (top to bottom, left to right), 3 bytes per pixel (R, G, B).
 * Total: 768 bytes.
 */
function createImageBuffer(pixels: DisplayPixel[]): Uint8Array {
  // Initialize with black pixels
  const buffer = new Uint8Array(DISPLAY_WIDTH * DISPLAY_HEIGHT * 3);

  // Create a map for quick lookup
  const pixelMap = new Map<string, string>();
  for (const pixel of pixels) {
    pixelMap.set(`${pixel.x},${pixel.y}`, pixel.color);
  }

  // Fill the buffer
  for (let y = 0; y < DISPLAY_HEIGHT; y++) {
    for (let x = 0; x < DISPLAY_WIDTH; x++) {
      const idx = (y * DISPLAY_WIDTH + x) * 3;
      const color = pixelMap.get(`${x},${y}`) || "#000000";
      const [r, g, b] = hexToRgb(color);
      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
    }
  }

  return buffer;
}

/**
 * Encode buffer to base64.
 */
function bufferToBase64(buffer: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
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

/**
 * Fetch all pixels from the database.
 */
async function fetchAllPixels(): Promise<DisplayPixel[]> {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data, error } = await supabase.from("display_pixels").select("x, y, color");

  if (error) {
    console.error("Error fetching pixels:", error);
    throw error;
  }

  return data ?? [];
}

Deno.serve(async (req) => {
  // Accept both GET (from display webhook) and POST (for manual triggers)
  if (req.method !== "GET" && req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    console.log("Image request received - fetching pixels from database...");

    // Fetch all pixels from the database
    const pixels = await fetchAllPixels();
    console.log(`Fetched ${pixels.length} pixels from database`);

    // Create the RGB image buffer
    const imageBuffer = createImageBuffer(pixels);

    // Encode to base64
    const imageBase64 = bufferToBase64(imageBuffer);
    console.log(`Created base64 image (${imageBase64.length} chars)`);

    // Publish to MQTT
    await publishToMqtt("pixelwidget/pixel/image", imageBase64);
    console.log("Image published to MQTT");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Image sent to display",
        pixel_count: pixels.length,
        image_size_bytes: imageBuffer.length,
        base64_length: imageBase64.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error processing image request:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process image request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
