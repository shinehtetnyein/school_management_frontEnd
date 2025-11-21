# Google OAuth Integration - Frontend Setup Guide

## Overview

Google OAuth has been successfully integrated into the frontend login system. The integration allows users to authenticate using their Google account as an alternative to the traditional email/password login.

## Files Created/Modified

### 1. **GoogleAuthService** (`src/services/google-auth-service.jsx`)

- **Purpose**: Handles all Google OAuth operations
- **Key Methods**:
  - `initiateGoogleLogin()`: Redirects user to backend Google OAuth endpoint
  - `handleGoogleCallback()`: Exchanges Google credential with backend (if using token-based flow)
  - `getGoogleRedirectUrl()`: Returns the backend Google auth endpoint

### 2. **LoginForm Component** (`src/Components/LoginForm.jsx`)

- **Modifications**:
  - Added import for `GoogleAuthService` and `Divider` UI component
  - Added `handleGoogleLogin()` handler function
  - Added "Continue with Google" button with Google logo
  - Button is integrated below the Sign In button with a divider separator

### 3. **GoogleCallbackHandler Component** (`src/Components/GoogleCallbackHandler.jsx`)

- **Purpose**: Handles the redirect callback from the backend after successful Google authentication
- **Flow**:
  1. Receives token and user data from URL query parameters
  2. Validates the data
  3. Calls `login()` from AuthContext to store credentials
  4. Redirects to dashboard on success
  5. Shows error and redirects to login on failure

### 4. **RouteComponent** (`src/RouteComponent.jsx`)

- **Modifications**:
  - Imported `GoogleCallbackHandler` component
  - Added route: `/google/callback` → `<GoogleCallbackHandler />`

## How It Works

### User Flow:

1. User clicks "Continue with Google" button on login page
2. `handleGoogleLogin()` redirects to backend endpoint: `http://localhost:8000/api/v1/google`
3. User is redirected to Google OAuth consent screen
4. After user authorizes, Google redirects to backend callback handler
5. Backend verifies user with Google, creates/updates user record, and redirects to frontend
6. Frontend `GoogleCallbackHandler` receives token and user data via query parameters
7. User data is stored in localStorage and auth context
8. User is redirected to `/dashboard`

## Backend Integration Points

### Expected Backend Behavior:

**Google Redirect Endpoint** (`GET /api/v1/google`)

- Initiates Socialite Google OAuth flow
- Redirects user to Google consent screen

**Google Callback Endpoint** (`GET /api/v1/google/callback`)

- Receives OAuth code from Google
- Exchanges code for user info
- Creates/updates user record in database
- Should redirect to frontend with URL parameters:
  ```
  http://localhost:3000/google/callback?token=<AUTH_TOKEN>&user=<JSON_ENCODED_USER_DATA>&error=<ERROR_MSG_IF_ANY>
  ```

**Expected Response Format (in URL parameters):**

```
?token=<sanctum_token>
&user={"id":1,"uuid":"xxx","name":"John Doe","email":"john@example.com","profile_photo":"url"}
&error=<optional_error_message>
```

## Configuration Requirements

### Frontend (.env or configuration file):

- Ensure `BACKEND_SIDE_BASE_URL` in `src/services/resources.jsx` points to your backend API
- Default: `http://localhost:8000/api/`

### Backend (.env file):

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/v1/google/callback
```

## Testing the Integration

1. Start the backend server (Laravel)
2. Start the frontend development server (`npm run dev`)
3. Navigate to login page
4. Click "Continue with Google" button
5. Complete Google OAuth flow
6. Verify user is authenticated and redirected to dashboard

## Error Handling

- Network errors: Snackbar notification with error message
- Google authentication failures: Redirected to login with error message
- Invalid token/user data: Error message and redirect to login after 3 seconds

## UI Components Used

- Material-UI (MUI) components for consistency
- Custom Google logo SVG for branding
- Divider component for visual separation
- Snackbar for notifications
- Circular progress for loading state

## Notes

- No additional npm packages required (uses native fetch API)
- Google logo is embedded as SVG (no external dependencies)
- Uses the existing AuthContext for state management
- Follows the same authentication flow as traditional login
- Token stored in localStorage for persistence
