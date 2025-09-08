import Cookies from "js-cookie";
import Configuration from "./configuration";
import Resources from "./resources";

class DataServices {
  constructor() {
    this.config = new Configuration();
    this.resources = new Resources();
  }
  getLanguage() {
    var lang = Cookies.get(this.config.COOKIE_NAME_LANGUAGE);
    if (!lang) {
      lang = "mm";
    }
    return lang;
  }

  setLanguage(lang) {
    let d = new Date();
    d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 14);
    Cookies.set(this.config.COOKIE_NAME_LANGUAGE, lang, {
      path: "/",
      expires: d,
    });
    console.log("language=" + this.getLanguage());
  }

  async authorize(data, serviceName) {
    console.log("data=" + JSON.stringify(data));
    console.log(this.resources.BACKEND_SIDE_BASE_URL + serviceName);

    return fetch(this.resources.BACKEND_SIDE_BASE_URL + serviceName, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // if (!response.ok) {
        // this.handleResponseError(response);
        // 	console.log("res error: " + response.error);
        // }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        this.handleError(error);
        return error;
      });
  }
  async retrievePOST(data, serviceName) {
    console.log(this.resources.BACKEND_SIDE_BASE_URL + serviceName);
    return fetch(this.resources.BACKEND_SIDE_BASE_URL + serviceName, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.getTokenFromCookie(),
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status === 401) {
          const newToken = await this.refreshToken();
          if (newToken) {
            return this.retrievePOST(data, serviceName);
          } else {
            this.removeTokenCookie();
            window.location.href = "/login";
          }
        }
        if (!response.ok) this.handleResponseError(response);
        return response.json();
      })
      .catch((error) => {
        this.handleError(error);
      });
  }
  async retrieve(serviceName, serviceAction) {
    const url = `${this.resources.BACKEND_SIDE_BASE_URL}${serviceName}${serviceAction}`;
    console.log(url);

    try {
      let response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getTokenFromCookie()}`,
        },
      });

      if (response.status === 401) {
        const newToken = await this.refreshToken();
        if (newToken) {
          response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          });
        } else {
          this.removeTokenCookie?.();
          window.location.href = "/login";
          return null;
        }
      }
      if (!response.ok) {
        this.handleResponseError?.(response);
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      this.handleError?.(error);
      return null;
    }
  }

  async retrievePOSTFormData(data, serviceName) {
    const url = this.resources.BACKEND_SIDE_BASE_URL + serviceName;
    console.log(url);

    try {
      let response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + this.getTokenFromCookie(),
        },
        body: data,
      });

      if (response.status === 401) {
        const newToken = await this.refreshToken();
        if (newToken) {
          response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + newToken,
            },
            body: data,
          });
        } else {
          this.removeTokenCookie();
          window.location.href = "/login";
          return null;
        }
      }

      if (!response.ok) {
        this.handleResponseError(response);
        throw new Error(`HTTP error, status = ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  async retrievePUT(data, serviceName) {
    const url = this.resources.BACKEND_SIDE_BASE_URL + serviceName;
    console.log(url, JSON.stringify(data));

    try {
      let response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getTokenFromCookie(),
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        const newToken = await this.refreshToken();
        if (newToken) {
          response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + newToken,
            },
            body: JSON.stringify(data),
          });
        } else {
          this.removeTokenCookie();
          window.location.href = "/login";
          return null;
        }
      }

      if (!response.ok) {
        this.handleResponseError(response);
        throw new Error(`HTTP error, status = ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  async retrieveDELETE(serviceName, serviceAction) {
    const url = this.resources.BACKEND_SIDE_BASE_URL + serviceName + serviceAction;
    console.log(url);

    try {
      let response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getTokenFromCookie(),
        },
      });

      if (response.status === 401) {
        const newToken = await this.refreshToken();
        if (newToken) {
          response = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + newToken,
            },
          });
        } else {
          this.removeTokenCookie();
          window.location.href = "/login";
          return null;
        }
      }

      if (!response.ok) {
        this.handleResponseError(response);
        throw new Error(`HTTP error, status = ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }


  async authorizePUT(data, serviceName) {
    console.log(this.resources.BACKEND_SIDE_BASE_URL + serviceName);
    console.log(JSON.stringify(data));
    return fetch(this.resources.BACKEND_SIDE_BASE_URL + serviceName, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          this.handleResponseError(response);
        }

        return response.json();
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }

  // Retrieves and parses userBriefInfo from cookies.
  // Returns null if the data is missing or cannot be parsed.
  getUserBriefInfo = () => {
    const storedData = Cookies.get("userBriefInfo");

    if (!storedData) {
      console.warn("No userBriefInfo found in sessionStorage.");
      return null;
    }

    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing userBriefInfo:", error);
      return null;
    }
  };

  handleError(error) {
    console.log(error.message);
  }

  // Uses the refresh token to get a new access token from the server.
  // Updates cookies and user account data with the new tokens.
  // Returns the new access token on success, or null on failure.
  async refreshToken() {
    try {
      // Get the refresh token from cookie using the correct config property
      const refreshToken = Cookies.get(this.config.COOKIE_NAME_REFRESH_TOKEN);

      if (!refreshToken) {
        console.warn("No refresh token available.");
        return null;
      }

      // Use the correct refresh token API path
      const refreshUrl =
        this.resources.BACKEND_SIDE_BASE_URL +
        this.config.SERVICE_NAME +
        this.config.COOKIE_REFRESH_TOKEN;

      console.log("Refreshing token with URL:", refreshUrl);
      console.log("Using refresh token:", refreshToken);

      const response = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: refreshToken, // This is correct based on your requirements
        }),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        console.error(
          "Refresh token request failed with status:",
          response.status
        );
        throw new Error(`Token refresh failed with status ${response.status}`);
      }

      // Check content type to ensure it's JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Refresh token response is not JSON:", contentType);
        throw new Error("Token refresh response is not JSON");
      }

      // Add error handling around JSON parsing
      let responseData;
      try {
        responseData = await response.json();
        console.log("Refresh token response:", responseData);
      } catch (jsonError) {
        console.error("Failed to parse refresh token response:", jsonError);
        throw new Error("Failed to parse refresh token response");
      }

      if (!responseData.success || !responseData.data?.access_token) {
        console.error("Failed to refresh token:", responseData);
        throw new Error("Token refresh failed: Invalid response format");
      }

      const { access_token, refresh_token } = responseData.data;

      // Save new access token
      Cookies.set(this.config.COOKIE_NAME_TOKEN, access_token, { path: "/" });

      // Save new refresh token if provided
      if (refresh_token) {
        Cookies.set(this.config.COOKIE_NAME_REFRESH_TOKEN, refresh_token, {
          path: "/",
        });
      }

      // Update the token in userAccounts if it exists
      try {
        const userAccounts = Cookies.get(
          this.config.COOKIE_SAVED_USER_ACCOUNTS
        );
        const currentUser = Cookies.get(this.config.COOKIE_CURRENT_USER);

        if (userAccounts && currentUser) {
          const accounts = JSON.parse(userAccounts);
          const userData = JSON.parse(currentUser);

          if (userData?.userGuid) {
            const accountIndex = accounts.findIndex(
              (acc) => acc.userGuid === userData.userGuid
            );

            if (accountIndex >= 0) {
              accounts[accountIndex].token = access_token;
              if (refresh_token) {
                accounts[accountIndex].refreshToken = refresh_token;
              }
              // Use expiration time from API response if available
              const expiresIn = responseData.data?.expires_in
                ? Date.now() + responseData.data.expires_in * 1000 // Convert seconds to milliseconds
                : Date.now() + 3600 * 1000; // Fallback to 1 hour if not provided

              accounts[accountIndex].expiresIn = expiresIn;

              Cookies.set(
                this.config.COOKIE_SAVED_USER_ACCOUNTS,
                JSON.stringify(accounts),
                { path: "/" }
              );
            }
          }
        }
      } catch (error) {
        console.warn("Failed to update user accounts with new token:", error);
      }

      // Return the new access token so handleResponseError can use it
      return access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }

  // Logs the error message to the console.
  // Centralized place to extend error handling
  // Handles different HTTP response errors, primarily 401 and 400.
  // For 401, it attempts token refresh.
  // If refresh fails, token is removed.
  // Throws an error to reject the original request.

  async handleResponseError(response) {
    if (response.status === 401) {
      // Try to refresh token
      const newToken = await this.refreshToken();
      if (newToken) {
        // Retry the original request with new token
        const originalRequest = response.request;
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return fetch(originalRequest);
        }
      } else {
        // Only remove token but don't redirect to login
        console.warn("Token refresh failed");
        this.removeTokenCookie();
        // Remove the redirect to login
        // window.location.href = "/login";
      }
    } else if (response.status === 400) {
      console.log(JSON.stringify(response) + " error 400 " + response.json());
    }
    throw new Error("HTTP error, status = " + JSON.stringify(response));
  }

  // Retrieves the access token from cookies.
  // If missing, it attempts to look in user account data (COOKIE_SAVED_USER_ACCOUNTS) using the current user.
  getTokenFromCookie() {
    const token = Cookies.get(this.config.COOKIE_NAME_TOKEN);
    if (!token) {
      console.warn("No token found in cookies");
      // Check userAccounts as fallback
      const userAccounts = Cookies.get(this.config.COOKIE_SAVED_USER_ACCOUNTS);
      const currentUser = Cookies.get(this.config.COOKIE_CURRENT_USER);

      if (userAccounts && currentUser) {
        try {
          const accounts = JSON.parse(userAccounts);
          const userData = JSON.parse(currentUser);

          if (userData?.userGuid) {
            const savedAccount = accounts.find(
              (acc) => acc.userGuid === userData.userGuid
            );

            if (savedAccount?.token) {
              // Found token in saved accounts, restore it
              console.log("Restoring token from saved account");
              Cookies.set(this.config.COOKIE_NAME_TOKEN, savedAccount.token, {
                path: "/",
              });

              // Also restore refresh token if available
              if (savedAccount.refreshToken) {
                Cookies.set(
                  this.config.COOKIE_NAME_REFRESH_TOKEN, // Fixed: Use COOKIE_NAME_REFRESH_TOKEN instead of COOKIE_REFRESH_TOKEN
                  savedAccount.refreshToken,
                  { path: "/" }
                );
              }

              return savedAccount.token;
            }
          }
        } catch (error) {
          console.error("Error parsing user accounts or user data:", error);
        }
      }

      // If we get here, we couldn't find a token
      console.warn("No valid token found in any storage");
      return null;
    }
    return token;
  }

  // Would remove the token from cookies, likely used after logout or token expiration.
  removeTokenCookie() {
    Cookies.remove(this.config.COOKIE_NAME_TOKEN, { path: "/" });
    Cookies.remove(this.config.COOKIE_NAME_REFRESH_TOKEN, { path: "/" }); // Also remove refresh token
  }

  checkTokenFromCookie() {
    const token = this.getTokenFromCookie();
    console.log("Checking token:", token);
    return token != null;
  }

  storeCurrentUserData(userInfo) {
    Cookies.set(this.config.COOKIE_NAME_USER_DATA, JSON.stringify(userInfo), {
      path: "/",
      expires: 7,
    });
  }
  getCurrentUserData() {
    var sessionData = Cookies.get(this.config.COOKIE_NAME_USER_DATA);
    if (!sessionData) {
      // Try to get from the user-data cookie as fallback
      sessionData = Cookies.get("user-data");
      if (!sessionData) {
        // Remove the hardcoded redirect
        window.location.href = "/login";
        return null;
      }
    }
    return JSON.parse(sessionData);
  }
  storeCurrentPageData(pageInfo) {
    window.sessionStorage.setItem(
      this.config.COOKIE_NAME_PAGE_DATA,
      JSON.stringify(pageInfo)
    );
  }
  getCurrentPageData() {
    var sessionData = window.sessionStorage.getItem(
      this.config.COOKIE_NAME_PAGE_DATA
    );
    if (!sessionData) {
      window.location.href = "/login";
    }
    return JSON.parse(sessionData);
  }
}
export default DataServices;
