import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import {
  fetchOidcConfig,
  fetchTokens,
  fetchUser,
  useUserSession,
} from "~/oidc";

export async function GET(event: APIEvent) {
  const { url } = event.request;
  const { searchParams, origin } = new URL(url);
  // TODO: unifiy
  const redirect_uri = `${origin}/api/oauth/callback`;
  const code = searchParams.get("code");

  if (!code) throw new Error("No code");

  const { token_endpoint, userinfo_endpoint } = await fetchOidcConfig();

  const { access_token } = await fetchTokens({
    redirect_uri,
    code,
    token_endpoint,
  });

  const user = await fetchUser(userinfo_endpoint, access_token);

  const userSession = await useUserSession();

  await userSession.update({ user });

  return user;
}
