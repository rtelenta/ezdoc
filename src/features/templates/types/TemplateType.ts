export interface TemplateType {
  id: string;
  name: string;
  created_by: {
    cognito_user_id: string;
    email: string;
  };
  created_at: string;
  view_link: string;
}
