import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";

interface SignInRequest {
  email: string;
  password: string;
}

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (data: SignInRequest) => {
      const response = await apiClient.post("/sign-in", data);
      return response.data;
    },
  });
};
