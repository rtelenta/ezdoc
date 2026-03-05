import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

interface GenerateViewUrlResponse {
  token: string;
  view_url: string;
  expires_in_minutes: number;
}

const generateViewUrl = async (templateId: string) => {
  const response = await fetcher.post<GenerateViewUrlResponse>(
    `/templates/${templateId}/generate-temporal-view`
  );
  return response.data;
};

export const useGetViewUrl = () => {
  return useMutation({
    mutationFn: generateViewUrl,
  });
};
