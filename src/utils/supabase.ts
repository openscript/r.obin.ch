import { createClient, type RealtimeChannel } from "@supabase/supabase-js";

// These will be replaced with actual environment variables
const SUPABASE_URL = "https://ebazfrryxabwtqaiezir.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_BnfPS3NmFKJC1rwKTHgs3w_EPkMGv6S";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface DisplayPixel {
  x: number;
  y: number;
  color: string;
  updated_at?: string;
}

/**
 * Upsert a single pixel to the display_pixels table.
 */
export async function upsertPixel(x: number, y: number, color: string): Promise<void> {
  const { error } = await supabase.from("display_pixels").upsert({ x, y, color }, { onConflict: "x,y" });

  if (error) {
    console.error("Error upserting pixel:", error);
    throw error;
  }
}

/**
 * Fetch all pixels from the display_pixels table.
 */
export async function fetchAllPixels(): Promise<DisplayPixel[]> {
  const { data, error } = await supabase.from("display_pixels").select("x, y, color");

  if (error) {
    console.error("Error fetching pixels:", error);
    throw error;
  }

  return data ?? [];
}

/**
 * Subscribe to realtime changes on the display_pixels table.
 * Returns a channel that can be used to unsubscribe.
 */
export function subscribeToPixelChanges(callback: (pixel: DisplayPixel) => void): RealtimeChannel {
  const channel = supabase
    .channel("display_pixels_changes")
    .on(
      "postgres_changes",
      {
        event: "*", // Listen to INSERT and UPDATE
        schema: "public",
        table: "display_pixels",
      },
      (payload) => {
        const pixel = payload.new as DisplayPixel;
        if (pixel && typeof pixel.x === "number" && typeof pixel.y === "number" && pixel.color) {
          callback(pixel);
        }
      },
    )
    .subscribe();

  return channel;
}

/**
 * Unsubscribe from a realtime channel.
 */
export async function unsubscribeFromChannel(channel: RealtimeChannel): Promise<void> {
  await supabase.removeChannel(channel);
}
