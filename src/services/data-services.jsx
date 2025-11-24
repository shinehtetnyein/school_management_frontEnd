import axios from "axios";
import Cookies from "js-cookie";
import Configuration from "./configuration";
import Resources from "./resources";

class DataServices {
  /**
   * options: { autoRedirect: boolean }
   */
  constructor(options = {}) {
    this.config = new Configuration();
    this.resources = new Resources();
    this.autoRedirect =
      options.autoRedirect !== undefined ? options.autoRedirect : true;

    this.axiosInstance = axios.create({
      baseURL: this.resources.BACKEND_SIDE_BASE_URL,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // Attach interceptor to include token automatically
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getTokenFromCookie();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle token expiration and refresh automatically
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Try refresh first
          const newToken = await this.refreshToken();
          if (newToken) {
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return this.axiosInstance.request(error.config);
          } else {
            this.removeTokenCookie();
            // Only redirect if autoRedirect is enabled; otherwise pass the error back
            if (this.autoRedirect) {
              window.location.href = "/login";
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /** Language management **/
  getLanguage() {
    return Cookies.get(this.config.COOKIE_NAME_LANGUAGE) || "mm";
  }

  setLanguage(lang) {
    const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
    Cookies.set(this.config.COOKIE_NAME_LANGUAGE, lang, {
      path: "/",
      expires: expireDate,
    });
    console.log("language=" + this.getLanguage());
  }

  /** Authorization & API Calls **/
  async authorize(data, serviceName) {
    try {
      const response = await this.axiosInstance.post(serviceName, data);
      // Normalize payload (backend wraps payload inside `data`)
      const payload = response.data || {};

      // Extract tokens from payload (either payload.data or payload)
      // Support multiple backend token key names (some endpoints return `token`, others `access_token`)
      const accessToken =
        payload.data?.access_token ||
        payload.access_token ||
        payload.data?.token ||
        payload.token ||
        null;
      const refreshToken =
        payload.data?.refresh_token ||
        payload.refresh_token ||
        payload.data?.refreshToken ||
        payload.refreshToken ||
        null;

      // Persist tokens in cookie + localStorage so DataServices and AuthContext remain in sync
      if (accessToken) {
        try {
          Cookies.set(this.config.COOKIE_NAME_TOKEN, accessToken, {
            path: "/",
          });
        } catch (e) {
          console.warn("Failed to set access token cookie:", e);
        }
        try {
          localStorage.setItem("token", accessToken);
        } catch (e) {
          console.warn("Failed to set access token in localStorage:", e);
        }
      }

      if (refreshToken) {
        try {
          Cookies.set(this.config.COOKIE_NAME_REFRESH_TOKEN, refreshToken, {
            path: "/",
          });
        } catch (e) {
          console.warn("Failed to set refresh token cookie:", e);
        }
        try {
          localStorage.setItem("refresh_token", refreshToken);
        } catch (e) {
          console.warn("Failed to set refresh token in localStorage:", e);
        }
      }

      // Normalize payload into consistent shape: { success, message, data }
      const normalized = {
        success: payload.success ?? Boolean(accessToken),
        message: payload.message || "",
        data: payload.data ? { ...payload.data } : {},
        errors: payload.errors || [],
      };

      if (accessToken) normalized.data.access_token = accessToken;
      if (refreshToken) normalized.data.refresh_token = refreshToken;

      // Ensure user object is present in data (support both payload.data.user and payload.user)
      if (!normalized.data.user) {
        normalized.data.user = payload.user || payload.data?.user || null;
      }

      return normalized; // Return normalized response
    } catch (error) {
      this.handleError(error);
      // Throw an error so React knows login failed
      if (error.response?.status === 401) {
        throw new Error("Invalid credentials");
      }
      throw error;
    }
  }

  async retrieve(serviceName, serviceAction = "") {
    try {
      const response = await this.axiosInstance.get(
        serviceName + serviceAction
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  async retrievePOST(data, serviceName) {
    try {
      const response = await this.axiosInstance.post(serviceName, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  async retrievePOSTFormData(data, serviceName) {
    try {
      const response = await this.axiosInstance.post(serviceName, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  async retrievePUT(data, serviceName) {
    try {
      const response = await this.axiosInstance.put(serviceName, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  async retrieveDELETE(serviceName, serviceAction = "") {
    try {
      const response = await this.axiosInstance.delete(
        serviceName + serviceAction
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  async authorizePUT(data, serviceName) {
    try {
      const response = await this.axiosInstance.put(serviceName, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  /** Token Management **/
  async refreshToken() {
    try {
      // Prefer cookie but fall back to localStorage-stored refresh token
      const refreshToken =
        Cookies.get(this.config.COOKIE_NAME_REFRESH_TOKEN) ||
        localStorage.getItem("refresh_token") ||
        null;

      if (!refreshToken) return null;

      const refreshUrl =
        this.config.SERVICE_NAME + this.config.COOKIE_REFRESH_TOKEN;

      // MUST use axiosInstance NOT axios
      const response = await this.axiosInstance.post(refreshUrl, {
        refresh_token: refreshToken, // FIXED NAME
      });

      const { access_token, refresh_token } = response.data?.data || {};

      if (access_token) {
        try {
          Cookies.set(this.config.COOKIE_NAME_TOKEN, access_token, {
            path: "/",
          });
        } catch (e) {
          console.warn("Failed to set access token cookie after refresh:", e);
        }
        try {
          localStorage.setItem("token", access_token);
        } catch (e) {
          console.warn(
            "Failed to set access token in localStorage after refresh:",
            e
          );
        }
      }

      if (refresh_token) {
        try {
          Cookies.set(this.config.COOKIE_NAME_REFRESH_TOKEN, refresh_token, {
            path: "/",
          });
        } catch (e) {
          console.warn("Failed to set refresh token cookie after refresh:", e);
        }
        try {
          localStorage.setItem("refresh_token", refresh_token);
        } catch (e) {
          console.warn(
            "Failed to set refresh token in localStorage after refresh:",
            e
          );
        }
      }

      return access_token || null;
    } catch (error) {
      console.error("Error refreshing token:", error);
      this.removeTokenCookie();
      return null;
    }
  }

  getTokenFromCookie() {
    // Prefer cookie (used for refresh flow), but fall back to localStorage token
    return (
      Cookies.get(this.config.COOKIE_NAME_TOKEN) ||
      localStorage.getItem("token") ||
      null
    );
  }

  removeTokenCookie() {
    try {
      Cookies.remove(this.config.COOKIE_NAME_TOKEN, { path: "/" });
      Cookies.remove(this.config.COOKIE_NAME_REFRESH_TOKEN, { path: "/" });
    } catch (e) {
      console.warn("Failed to remove auth cookies:", e);
    }

    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    } catch (e) {
      console.warn("Failed to remove auth tokens from localStorage:", e);
    }
  }

  /** Error Handling **/
  handleError(error) {
    console.error("Axios Error:", error.message || error);
  }

  /** Data Storage **/
  storeCurrentUserData(userInfo) {
    Cookies.set(this.config.COOKIE_NAME_USER_DATA, JSON.stringify(userInfo), {
      path: "/",
      expires: 7,
    });
  }

  getCurrentUserData() {
    const sessionData = Cookies.get(this.config.COOKIE_NAME_USER_DATA);
    if (!sessionData) {
      window.location.href = "/login";
      return null;
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
    const sessionData = window.sessionStorage.getItem(
      this.config.COOKIE_NAME_PAGE_DATA
    );
    if (!sessionData) {
      window.location.href = "/login";
      return null;
    }
    return JSON.parse(sessionData);
  }
}

export default DataServices;
