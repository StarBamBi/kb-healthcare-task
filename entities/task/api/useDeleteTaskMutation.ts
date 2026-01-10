import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";

export const useDeleteTaskMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/task/${id}`);
    },
  });
};
