import { loginHandler } from "@moreillon/solidstart-oidc";
import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";

// export const GET = loginHandler;

// Need to redirect here because Solidstart is annoying
export async function GET(event: APIEvent) {
  const href = await loginHandler(event);
  return redirect(href);
}
