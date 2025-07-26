import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { fetchOidcConfig, generateAuthUrl } from "~/oidc";

export async function GET(event: APIEvent) {
  const { url } = event.request;

  const { origin } = new URL(url);
  const redirectUri = `${origin}/api/oauth/callback`;

  const { authorization_endpoint } = await fetchOidcConfig();

  const authUrl = await generateAuthUrl(authorization_endpoint, redirectUri);

  return redirect(authUrl);
}
