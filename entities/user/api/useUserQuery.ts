import { apiClient } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

export interface User {
  name: string;
  memo: string;
}

export const useUserQuery = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiClient.get("/user");
      return response.data;
    },
    retry: false,
  });
};
