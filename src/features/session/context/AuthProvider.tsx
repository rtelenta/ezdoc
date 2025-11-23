import { AuthProvider as OidcAuthProvider } from "react-oidc-context";
import { cognitoAuthConfig } from "@/config/cognito";
import { SessionManager } from "../components/SessionManager";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <OidcAuthProvider {...cognitoAuthConfig}>
      <SessionManager>{children}</SessionManager>
    </OidcAuthProvider>
  );
};
