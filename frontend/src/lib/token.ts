let globalToken: string | null = null;

export function getGlobalToken() {
  return globalToken;
}

export function setGlobalToken(token: string | null) {
  globalToken = token;
}
