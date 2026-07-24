let globalToken: string | null = null;

export function getGlobalToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || globalToken;
  }
  return globalToken;
}

export function setGlobalToken(token: string | null) {
  globalToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
}
