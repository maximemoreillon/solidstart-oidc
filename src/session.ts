import { SessionConfig, useSession } from "vinxi/http";
import { AUTH_SESSION_SECRET, NODE_ENV } from "./config";

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

  const session = await useSession<UserSessionData>(config);

  return session;
}

export async function useVerifierSession() {
  const config: SessionConfig = {
    password: AUTH_SESSION_SECRET,
    name: "soildstart-oidc-verifier",
  };
  if (NODE_ENV === "development") config.cookie = { secure: false };

  const session = await useSession<verifierSessionData>(config);

  return session;
}
