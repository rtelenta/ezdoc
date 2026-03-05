import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { TEMPLATES_QUERY_KEY } from "./useGetTemplates";

const deleteTemplate = async (id: string) => {
  await fetcher.delete(`/templates/${id}`);
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEMPLATES_QUERY_KEY] });
    },
  });
};
