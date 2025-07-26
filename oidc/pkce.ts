function generateCodeVerifier(length: number) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => (byte % 36).toString(36)).join("");
}

function generatePkceChallenge(verifier: string) {
  return "dummy";
}

export function createPkcePair() {
  const verifier = generateCodeVerifier(128);
  const challenge = generatePkceChallenge(verifier);

  return {
    verifier,
    challenge,
  };
}
