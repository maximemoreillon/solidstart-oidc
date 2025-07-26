import { SessionConfig, useSession } from "vinxi/http";
import { redirect } from "@solidjs/router";
import {
  AUTH_SESSION_SECRET,
  NODE_ENV,
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID,
} from "./config";
import { createPkcePair } from "./pkce";

export type OpenIdConfig = {
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  end_session_endpoint: string;
};

export type UserSessionData = {
  user: any;
};

export type verifierSessionData = {
  verifier: string;
};

export async function useUserSession() {
  "use server";

  const config: SessionConfig = {
    password: AUTH_SESSION_SECRET,
    name: "soildstart-oidc-user",
  };
  if (NODE_ENV === "development") config.cookie = { secure: false };

  const session = await useSession<UserSessionData>(config);

  return session;
}

export async function useVerifierSession() {
  "use server";

  const config: SessionConfig = {
    password: AUTH_SESSION_SECRET,
    name: "soildstart-oidc-verifier",
  };
  if (NODE_ENV === "development") config.cookie = { secure: false };

  const session = await useSession<verifierSessionData>(config);

  return session;
}

export async function fetchOidcConfig(): Promise<OpenIdConfig> {
  const openIdConfigUrl = `${OIDC_AUTHORITY}/.well-known/openid-configuration`;
  const response = await fetch(openIdConfigUrl);
  // TODO: handle errors
  return await response.json();
}

export async function generateAuthUrl(
  authorization_endpoint: string,
  redirect_uri: string
) {
  "use server";
  const { verifier, challenge } = createPkcePair();

  const authUrl = new URL(authorization_endpoint);

  // TODO: have scope configurable
  // TODO: offline access
  authUrl.searchParams.append("scope", "openid profile");
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("code_challenge_method", "S256");
  authUrl.searchParams.append("code_challenge", challenge);
  authUrl.searchParams.append("client_id", OIDC_CLIENT_ID);
  authUrl.searchParams.append("redirect_uri", redirect_uri);

  // TODO: audience

  const session = await useVerifierSession();
  await session.update({ verifier });

  return authUrl.toString();
}

export async function fetchTokens(opts: {
  token_endpoint: string;
  code: string;
  redirect_uri: string;
}) {
  const { token_endpoint, code, redirect_uri } = opts;

  const verifierSession = await useVerifierSession();
  const { verifier } = verifierSession.data;

  const body = new URLSearchParams({
    code,
    code_verifier: verifier,
    redirect_uri,
    client_id: OIDC_CLIENT_ID,
    grant_type: "authorization_code",
  });

  const init: RequestInit = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  };

  const response = await fetch(token_endpoint, init);
  await verifierSession.clear();

  if (!response.ok) {
    const text = await response.text();
    console.error(text);
    throw new Error(text);
  }

  return await response.json();
}

export async function fetchUser(
  userinfo_endpoint: string,
  access_token: string
) {
  const init: RequestInit = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await fetch(userinfo_endpoint, init);

  if (!response.ok)
    throw new Error(`Error fetching user ${await response.text()}`);
  return await response.json();
}
