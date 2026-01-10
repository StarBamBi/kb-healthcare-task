import axios from "axios";
import { tokenStorage } from "@/shared/lib/token";

export const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.clear();

      // 현재 경로 저장
      const currentPath =
        typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : "/";

      window.location.href = `/sign-in?redirect=${encodeURIComponent(
        currentPath
      )}`;
    }

    return Promise.reject(error);
  }
);
