import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import type { DocumentType } from "../types/DocumentType";
import { DOCUMENTS_QUERY_KEY } from "./useGetDocuments";

interface CreateDocumentPayload {
  template_id: string;
  description: string;
  data: Record<string, unknown>;
}

const createDocument = async (payload: CreateDocumentPayload) => {
  const response = await fetcher.post<DocumentType>("/documents/", payload);
  return response.data;
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCUMENTS_QUERY_KEY] });
    },
  });
};
