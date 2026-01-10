const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const isClient = typeof window !== "undefined";

export const tokenStorage = {
  getAccessToken: () =>
    isClient ? localStorage.getItem(ACCESS_TOKEN_KEY) : null,

  getRefreshToken: () =>
    isClient ? localStorage.getItem(REFRESH_TOKEN_KEY) : null,

  setTokens: (accessToken: string, refreshToken: string) => {
    if (!isClient) return;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clear: () => {
    if (!isClient) return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
