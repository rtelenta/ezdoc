export interface TemplateType {
  id: string;
  name: string;
  created_by: {
    cognito_user_id: string;
    email: string;
    full_name: string | null;
  };
  created_at: string;
}
