import type { APIEvent } from "@solidjs/start/server";

export async function GET(event: APIEvent) {
  return "Hello";
}
