import type { APIEvent } from "@solidjs/start/server";
import { redirect } from "@solidjs/router";
import {
  fetchOidcConfig,
  fetchTokens,
  fetchUser,
  generateAuthUrl,
} from "./oidc";
import { useUserSession } from "./session";

const getRedirectUri = (origin: string) => `${origin}/api/oauth/callback`;

export async function loginHandler(event: APIEvent) {
  const { origin } = new URL(event.request.url);
  const redirect_uri = getRedirectUri(origin);

  const { authorization_endpoint } = await fetchOidcConfig();

  const authUrl = await generateAuthUrl(authorization_endpoint, redirect_uri);

  return redirect(authUrl);
}

export async function callbackHandler(event: APIEvent) {
  const { searchParams, origin } = new URL(event.request.url);
  const redirect_uri = getRedirectUri(origin);
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

  // TODO: customizable
  return redirect("/");
}
