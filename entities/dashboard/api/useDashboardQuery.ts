import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";

interface DashboardResponse {
  numOfTask: number;
  numOfRestTask: number;
  numOfDoneTask: number;
}

export const useDashboardQuery = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await apiClient.get("/dashboard");
      return response.data;
    },
  });
};
