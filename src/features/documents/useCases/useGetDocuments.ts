import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import type { DocumentType } from "../types/DocumentType";

const getDocuments = async () => {
  const response = await fetcher.get<DocumentType[]>("/documents/");
  return response.data;
};

export const DOCUMENTS_QUERY_KEY = "DOCUMENTS_QUERY_KEY";

export const useGetDocuments = () => {
  return useQuery({
    queryKey: [DOCUMENTS_QUERY_KEY],
    queryFn: getDocuments,
  });
};
