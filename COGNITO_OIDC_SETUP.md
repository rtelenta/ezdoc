# EzDoc - AWS Cognito OIDC Authentication Setup

This project integrates AWS Cognito authentication using the OIDC (OpenID Connect) standard with `react-oidc-context`, following AWS's recommended tutorial approach.

## Key Benefits of OIDC Approach

- ✅ **Industry Standard**: Uses OAuth 2.0 / OIDC protocols
- ✅ **Simplified Setup**: No complex AWS SDK configuration
- ✅ **Better Security**: Authorization Code Flow with PKCE
- ✅ **AWS Recommended**: Official AWS tutorial approach
- ✅ **Smaller Bundle**: Only includes necessary OIDC libraries

## Step-by-Step Setup Guide

### Step 1: Create AWS Cognito User Pool

1. **Log in to AWS Console**

   - Navigate to Amazon Cognito service

2. **Create User Pool**

   - Click "Create user pool"
   - **Authentication providers**: Choose "Cognito user pool"
   - **Sign-in options**: ✅ Enable "Email" and "Username"

3. **Configure Security**

   - **Password policy**: Set minimum requirements (8+ characters recommended)
   - **MFA**: Choose "No MFA" for development, "Optional" for production
   - **Account recovery**: Enable "Email only"

4. **Configure Sign-up**

   - ✅ Enable "Self-service sign-up"
   - **Required attributes**: Select "email"
   - ✅ Enable email verification

5. **Configure App Integration**
   - **User pool name**: `ezdoc-user-pool` (or your choice)
   - **App client name**: `ezdoc-web-client`
   - ❌ **UNCHECK** "Generate a client secret" (important for web apps)
   - **App client type**: "Public client"

### Step 2: Configure App Client Settings

**IMPORTANT**: After creating your User Pool, configure these settings:

1. **Go to your User Pool** → **App integration** tab
2. **Click on your App Client**
3. **Edit Hosted UI settings**:

   - **Allowed callback URLs**: Add `http://localhost:5173/` (and your production URL)
   - **Allowed sign-out URLs**: Add `http://localhost:5173/` (and your production URL)
   - **OAuth 2.0 grant types**: ✅ Authorization code grant
   - **OpenID Connect scopes**: ✅ Email, OpenID, Profile

4. **Edit Authentication flow**:
   - ✅ Enable "ALLOW_USER_PASSWORD_AUTH"
   - ✅ Enable "ALLOW_USER_SRP_AUTH"
   - ✅ Enable "ALLOW_REFRESH_TOKEN_AUTH"

### Step 3: Get Your Configuration Values

**From your User Pool:**

- **User Pool ID**: Found in User Pool overview (format: `us-east-1_XXXXXXXXX`)
- **App Client ID**: Found in App integration → App clients section
- **AWS Region**: First part of User Pool ID (e.g., `us-east-1`)

### Step 4: Configure Environment Variables

1. **Create your .env file**:

   ```bash
   cp .env.example .env
   ```

2. **Fill in your .env file**:

   ```env
   # AWS Region where your User Pool is located
   VITE_AWS_REGION=us-east-1

   # Your User Pool ID
   VITE_USER_POOL_ID=us-east-1_ABC123DEF

   # Your App Client ID
   VITE_USER_POOL_CLIENT_ID=1234567890abcdefghijklmnop

   # Redirect URLs (must match your Cognito settings)
   VITE_REDIRECT_URI=http://localhost:5173/
   VITE_POST_LOGOUT_REDIRECT_URI=http://localhost:5173/
   ```

### Step 5: Install Dependencies and Run

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

## How It Works

### OIDC Flow

1. User clicks "Sign In" → Redirects to Cognito Hosted UI
2. User authenticates → Cognito redirects back with authorization code
3. `react-oidc-context` exchanges code for tokens automatically
4. App receives ID token, access token, and refresh token

### Key Files

```
src/
├── config/
│   ├── cognito.ts          # OIDC configuration
│   └── constants.ts        # Environment variables
├── main.tsx               # AuthProvider wrapper
└── App.tsx               # Main app with auth logic
```

## Authentication Features

- ✅ **OAuth 2.0 Authorization Code Flow**: Most secure for web apps
- ✅ **Automatic Token Management**: Handles refresh tokens automatically
- ✅ **Hosted UI**: Uses AWS Cognito's secure hosted authentication
- ✅ **PKCE Support**: Enhanced security for public clients
- ✅ **Session Management**: Persistent login across browser sessions

## Testing Your Setup

1. **Start the app**: `bun run dev`
2. **Visit**: `http://localhost:5173/`
3. **Click "Sign In"**: Should redirect to Cognito hosted UI
4. **Create account**: Use a real email for verification
5. **Sign in**: Should redirect back to your app

## Troubleshooting

### ❌ "Invalid redirect URI"

- Check that your redirect URI exactly matches what's configured in Cognito
- Ensure both callback and sign-out URLs are configured

### ❌ "Client authentication failed"

- Verify your App Client ID is correct
- Make sure client secret generation is DISABLED

### ❌ "User pool does not exist"

- Double-check your User Pool ID and region
- Ensure the User Pool exists in the specified region

### ❌ "Access denied"

- Check that the required OAuth scopes are enabled
- Verify that "Authorization code grant" is enabled

## Production Considerations

1. **Update redirect URLs** in both your `.env` and Cognito settings
2. **Enable HTTPS** for production redirect URLs
3. **Consider enabling MFA** for enhanced security
4. **Set up custom domain** in Cognito for branded experience
5. **Configure AWS SES** for production email delivery

## Customization

### Custom Styling

- The hosted UI can be customized in Cognito settings
- App UI uses Tailwind CSS and Ant Design components

### Additional Scopes

Add more OAuth scopes in Cognito settings:

```javascript
scope: "phone openid email profile address";
```

### Error Handling

The app includes comprehensive error handling for:

- Authentication failures
- Token refresh issues
- Network connectivity problems

This OIDC approach provides a robust, standards-based authentication system that's easy to maintain and secure by default!
