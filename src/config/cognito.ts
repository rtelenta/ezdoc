import { WebStorageStateStore } from "oidc-client-ts";
import { constants } from "./constants";

export const cognitoAuthConfig = {
  authority: `https://cognito-idp.${constants.AWS_REGION}.amazonaws.com/${constants.USER_POOL_ID}`,
  client_id: constants.USER_POOL_CLIENT_ID,
  redirect_uri: constants.REDIRECT_URI,
  response_type: "code",
  scope: "openid email",
  post_logout_redirect_uri: constants.POST_LOGOUT_REDIRECT_URI,
  extraQueryParams: {
    lang: "es",
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export default cognitoAuthConfig;
