import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import type { TemplateType } from "../types/TemplateType";
import { TEMPLATES_QUERY_KEY } from "./useGetTemplates";

interface UploadTemplatePayload {
  content: string;
  name: string;
}

const uploadTemplate = async (payload: UploadTemplatePayload) => {
  const response = await fetcher.post<TemplateType>("/templates/", payload);
  return response.data;
};

export const useUploadTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEMPLATES_QUERY_KEY] });
    },
  });
};
