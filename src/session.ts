import { SessionConfig, useSession } from "vinxi/http";
import { OIDC_SESSION_SECRET, OIDC_COOKIES_INSECURE } from "./config.js";

export type UserSessionData = {
  user: any;
};

export type verifierSessionData = {
  verifier: string;
};

const baseConfig: SessionConfig = {
  password: OIDC_SESSION_SECRET,
  cookie: {
    secure: !OIDC_COOKIES_INSECURE,
  },
};

export async function useUserSession() {
  return await useSession<UserSessionData>({
    ...baseConfig,
    name: "soildstart-oidc-user",
  });
}

export async function useVerifierSession() {
  return await useSession<verifierSessionData>({
    ...baseConfig,
    name: "soildstart-oidc-verifier",
  });
}
