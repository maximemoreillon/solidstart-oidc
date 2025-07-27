import { SessionConfig, useSession } from "vinxi/http";
import { AUTH_SESSION_SECRET, NODE_ENV } from "./config.js";

export type UserSessionData = {
  user: any;
};

export type verifierSessionData = {
  verifier: string;
};

export async function useUserSession() {
  const config: SessionConfig = {
    password: AUTH_SESSION_SECRET,
    name: "soildstart-oidc-user",
  };
  if (NODE_ENV === "development") config.cookie = { secure: false };

  return await useSession<UserSessionData>(config);
}

export async function useVerifierSession() {
  const config: SessionConfig = {
    password: AUTH_SESSION_SECRET,
    name: "soildstart-oidc-verifier",
  };
  if (NODE_ENV === "development") config.cookie = { secure: false };

  return await useSession<verifierSessionData>(config);
}
