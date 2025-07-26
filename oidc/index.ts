import { SessionConfig, useSession } from "vinxi/http";
import { redirect } from "@solidjs/router";

export type SessionContent = {
  user: any;
  tokens: {
    access_token: string;
    // Potentially refresh token
  };
  verifier: string;
};

const {
  AUTH_SESSION_SECRET = "areallylongsecretthatyoushouldreplace",
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID,
  NODE_ENV,
} = process.env;

export async function getSession() {
  const config: SessionConfig = { password: AUTH_SESSION_SECRET };
  if (NODE_ENV === "development") config.cookie = { secure: false };

  try {
    return await useSession(config);
  } catch (error) {
    throw redirect("/login");
  }
}

export async function fetchOidcConfig() {
  const openIdConfigUrl = `${OIDC_AUTHORITY}/.well-known/openid-configuration`;
  const response = await fetch(openIdConfigUrl);
  // TODO: handle errors
  return await response.json();
}

export async function fetchUserInfo() {}
