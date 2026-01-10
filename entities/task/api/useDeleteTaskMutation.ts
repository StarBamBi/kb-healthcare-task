import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/apiClient";

export const useDeleteTaskMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/task/${id}`);
    },
  });
};
