import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import type { TemplateType } from "../types/TemplateType";

const getTemplates = async () => {
  const response = await fetcher.get<TemplateType[]>("/templates");
  return response.data;
};

export const TEMPLATES_QUERY_KEY = "TEMPLATES_QUERY_KEY";

export const useGetTemplates = () => {
  return useQuery({
    queryKey: [TEMPLATES_QUERY_KEY],
    queryFn: getTemplates,
  });
};
