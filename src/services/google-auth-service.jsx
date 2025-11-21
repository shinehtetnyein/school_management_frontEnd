import Resources from "./resources";

class GoogleAuthService {
  constructor() {
    this.resources = new Resources();
    this.baseURL = this.resources.BACKEND_SIDE_BASE_URL;
  }

  /**
   * Get the Google authentication redirect URL from backend
   * This initiates the OAuth flow by redirecting to Google
   */
  getGoogleRedirectUrl() {
    return `${this.baseURL}v1/google`;
  }

  /**
   * Handle the Google OAuth callback and exchange token with backend
   * This is called after user completes Google authentication
   */
  async handleGoogleCallback(credentialResponse) {
    try {
      // Send the Google credential to the backend
      const response = await fetch(`${this.baseURL}v1/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.success && data.data?.token) {
        return {
          success: true,
          user: data.data.user,
          token: data.data.token,
          message: data.message,
        };
      } else {
        return {
          success: false,
          error: data.message || "Google authentication failed",
        };
      }
    } catch (error) {
      console.error("Google callback error:", error);
      return {
        success: false,
        error:
          error.message ||
          "An error occurred during Google authentication callback",
      };
    }
  }

  /**
   * Initiate Google login by redirecting to backend Google endpoint
   */
  initiateGoogleLogin() {
    window.location.href = this.getGoogleRedirectUrl();
  }
}

export default GoogleAuthService;
