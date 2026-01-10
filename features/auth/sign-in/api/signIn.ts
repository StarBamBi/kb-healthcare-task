import { apiClient } from "@/shared/api/axios";

interface SignInRequest {
  email: string;
  password: string;
}

export const signIn = async (data: SignInRequest) => {
  const response = await apiClient.post("/sign-in", data);
  return response.data;
};
