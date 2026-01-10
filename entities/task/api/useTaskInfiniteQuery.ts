import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";
import { Task } from "../model/types";

export const useTaskInfiniteQuery = () => {
  return useInfiniteQuery<Task[]>({
    queryKey: ["task"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      try {
        const response = await apiClient.get("/task", {
          params: { page: pageParam },
        });
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 400) {
          return [];
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};
