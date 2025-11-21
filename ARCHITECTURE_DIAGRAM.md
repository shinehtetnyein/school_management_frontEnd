# Google OAuth Integration - Architecture Diagram

## Frontend Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend Application                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  RouteComponent (Main Router)                            │    │
│  ├──────────────────────────────────────────────────────────┤    │
│  │  Routes:                                                  │    │
│  │  • / → LoginForm                                          │    │
│  │  • /login → LoginForm                                    │    │
│  │  • /google/callback → GoogleCallbackHandler  ← NEW      │    │
│  │  • /dashboard → Dashboard (Protected)                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  LoginForm Component                                     │    │
│  ├──────────────────────────────────────────────────────────┤    │
│  │                                                           │    │
│  │  ┌────────────────────────────────────────────────────┐ │    │
│  │  │ Traditional Login Section                           │ │    │
│  │  │ • Email TextField                                   │ │    │
│  │  │ • Role Dropdown                                     │ │    │
│  │  │ • Password TextField                                │ │    │
│  │  │ • Sign In Button                                    │ │    │
│  │  │   └─→ handleSubmit()                                │ │    │
│  │  │       └─→ DataServices.authorize()                  │ │    │
│  │  │           └─→ /api/v1/login                         │ │    │
│  │  └────────────────────────────────────────────────────┘ │    │
│  │                                                           │    │
│  │  ┌────────────────────────────────────────────────────┐ │    │
│  │  │ Divider with "OR" Text               ← NEW         │ │    │
│  │  └────────────────────────────────────────────────────┘ │    │
│  │                                                           │    │
│  │  ┌────────────────────────────────────────────────────┐ │    │
│  │  │ Google OAuth Section                   ← NEW       │ │    │
│  │  │ • "Continue with Google" Button                     │ │    │
│  │  │ • Google Logo SVG                                   │ │    │
│  │  │   └─→ handleGoogleLogin()             ← NEW        │ │    │
│  │  │       └─→ GoogleAuthService.initiateGoogleLogin()  │ │    │
│  │  │           └─→ Redirect to /api/v1/google           │ │    │
│  │  └────────────────────────────────────────────────────┘ │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  GoogleAuthService (New)                                 │    │
│  ├──────────────────────────────────────────────────────────┤    │
│  │                                                           │    │
│  │  Methods:                                                │    │
│  │  • initiateGoogleLogin()                                │    │
│  │    └─→ Redirects to: /api/v1/google                     │    │
│  │                                                           │    │
│  │  • getGoogleRedirectUrl()                               │    │
│  │    └─→ Returns backend endpoint                         │    │
│  │                                                           │    │
│  │  • handleGoogleCallback()                               │    │
│  │    └─→ For alternative token-based flow                │    │
│  │                                                           │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  GoogleCallbackHandler Component (New)                   │    │
│  ├──────────────────────────────────────────────────────────┤    │
│  │                                                           │    │
│  │  useEffect() → handleCallback()                         │    │
│  │  • Extract: token from URL param                        │    │
│  │  • Extract: user from URL param                         │    │
│  │  • Extract: error from URL param                        │    │
│  │                                                           │    │
│  │  If Error:                                              │    │
│  │  • Show error alert                                     │    │
│  │  • Redirect to /login after 3s                          │    │
│  │                                                           │    │
│  │  If Success:                                            │    │
│  │  • Call: AuthContext.login(user, token)                │    │
│  │  • Store token in localStorage                          │    │
│  │  • Store user in localStorage                           │    │
│  │  • Redirect to /dashboard                               │    │
│  │                                                           │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  AuthContext (Existing)                                 │    │
│  ├──────────────────────────────────────────────────────────┤    │
│  │                                                           │    │
│  │  • login(userData, token)                               │    │
│  │    └─→ Stores user and token                            │    │
│  │        localStorage.setItem('token', token)             │    │
│  │        localStorage.setItem('user', userJSON)           │    │
│  │        setUser(userData)                                │    │
│  │                                                           │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION                          │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │ Click "Continue  │
                    │  with Google"    │
                    └────────┬─────────┘
                             │
                    ┌────────▼──────────┐
                    │ handleGoogleLogin │
                    │      called       │
                    └────────┬──────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │ GoogleAuthService.initiateGoogleLogin() │
        │                                          │
        │ window.location.href =                  │
        │  "http://localhost:8000/api/v1/google"  │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │    BACKEND: Google OAuth Flow           │
        │    ┌──────────────────────────────────┐ │
        │    │ GoogleAuthController::redirect()│ │
        │    │ → User to Google Consent       │ │
        │    └──────────────────────────────────┘ │
        │                                          │
        │    ┌──────────────────────────────────┐ │
        │    │ User Authorizes with Google     │ │
        │    │ → Google sends code back        │ │
        │    └──────────────────────────────────┘ │
        │                                          │
        │    ┌──────────────────────────────────┐ │
        │    │ GoogleAuthController::callback()│ │
        │    │ • Verify code with Google      │ │
        │    │ • Create/Update User in DB     │ │
        │    │ • Generate Sanctum Token       │ │
        │    │ • Redirect to Frontend:        │ │
        │    │   /google/callback?            │ │
        │    │   token=XXX&                   │ │
        │    │   user=JSON&                   │ │
        │    │   error=MSG (if error)         │ │
        │    └──────────────────────────────────┘ │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │   FRONTEND: Callback Handler            │
        │                                          │
        │   GoogleCallbackHandler Component       │
        │   • Extract token from URL              │
        │   • Extract user from URL               │
        │   • Extract error from URL (if any)     │
        │                                          │
        │   If Error → Show Alert → /login        │
        │                                          │
        │   If Success:                           │
        │   ├─→ AuthContext.login(user, token)   │
        │   ├─→ localStorage.setItem(token)      │
        │   ├─→ localStorage.setItem(user)       │
        │   └─→ navigate("/dashboard")           │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │   USER AUTHENTICATED & LOGGED IN        │
        │   Viewing Dashboard with Token          │
        └─────────────────────────────────────────┘
```

## Component Hierarchy

```
RouteComponent (routes/index)
│
├── ThemeProvider
│   └── AuthProvider (contexts/AuthContext)
│       └── Router (React Router v7)
│           └── Routes
│               ├── Route: "/" → LoginForm
│               │   └── LoginForm Component
│               │       ├── Traditional Login Form
│               │       ├── "OR" Divider
│               │       └── Google Login Button
│               │           └── handleGoogleLogin()
│               │               └── GoogleAuthService
│               │
│               ├── Route: "/login" → LoginForm
│               │   └── LoginForm Component
│               │
│               ├── Route: "/google/callback" → GoogleCallbackHandler ← NEW
│               │   └── GoogleCallbackHandler Component
│               │       ├── Extract URL params
│               │       ├── Validate data
│               │       └── AuthContext.login()
│               │
│               └── Route: "/dashboard" → Main Layout
│                   └── ProtectedRoute
│                       └── Dashboard Components
```

## File Organization

```
src/
├── services/
│   ├── data-services.jsx (existing)
│   ├── configuration.jsx (existing)
│   ├── resources.jsx (existing)
│   └── google-auth-service.jsx ← NEW
│
├── Components/
│   ├── LoginForm.jsx ← MODIFIED
│   ├── GoogleCallbackHandler.jsx ← NEW
│   ├── AdminDashboard/
│   ├── Student/
│   ├── Courses/
│   ├── Classes/
│   └── ... (other components)
│
├── contexts/
│   └── AuthContext.jsx (existing - used)
│
├── RouteComponent.jsx ← MODIFIED
│
└── ... (other files)
```

## Security Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    SECURITY MEASURES                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. HTTPS Only (Production)                                  │
│    └─ All OAuth requests encrypted                          │
│                                                              │
│ 2. Token Storage                                            │
│    ├─ Stored in localStorage (same as current)              │
│    ├─ Sent in Authorization header                          │
│    └─ Validated on each request                             │
│                                                              │
│ 3. Data Validation                                          │
│    ├─ Check token exists                                    │
│    ├─ Check user data exists                                │
│    ├─ Parse JSON safely                                     │
│    └─ Verify user object structure                          │
│                                                              │
│ 4. Error Handling                                           │
│    ├─ No sensitive data in error messages                   │
│    ├─ Generic error messages to user                        │
│    ├─ Console logging for debugging                         │
│    └─ Proper error state management                         │
│                                                              │
│ 5. Backend Verification                                     │
│    ├─ Google OAuth signature validation                      │
│    ├─ Token generation (Sanctum)                            │
│    └─ User record validation                                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Integration Status

```
┌────────────────────────────────────────────────────────────────┐
│                   INTEGRATION CHECKLIST                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Frontend Implementation                                      │
│  ✅ Google OAuth Service Created                              │
│  ✅ Callback Handler Component Created                        │
│  ✅ Login Form Updated                                        │
│  ✅ Routing Updated                                           │
│  ✅ Error Handling Implemented                                │
│  ✅ UI/UX Polished                                            │
│  ✅ Documentation Complete                                    │
│                                                                │
│  Backend Requirements (Manual Steps)                          │
│  ⏳ Modify GoogleAuthController::callback()                  │
│  ⏳ Add FRONTEND_URL to .env                                  │
│  ⏳ Implement redirect to frontend                            │
│  ⏳ Test end-to-end                                           │
│                                                                │
│  Result: Frontend READY, Awaiting Backend Integration        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

For detailed implementation steps, see:

- `GOOGLE_OAUTH_SETUP.md` - Frontend setup
- `GOOGLE_OAUTH_CALLBACK_SETUP.md` - Backend modification
- `VERIFICATION_CHECKLIST.md` - Complete verification guide
