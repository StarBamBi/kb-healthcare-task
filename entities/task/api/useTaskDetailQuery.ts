import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";
import { TaskDetail } from "@/entities/task/model/types";

export const useTaskDetailQuery = (id: string) => {
  return useQuery<TaskDetail>({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await apiClient.get(`/task/${id}`);
      return response.data;
    },
    retry: false,
  });
};
