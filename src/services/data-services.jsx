import axios from "axios";
import Cookies from "js-cookie";
import Configuration from "./configuration";
import Resources from "./resources";

class DataServices {
  constructor() {
    this.config = new Configuration();
    this.resources = new Resources();

    this.axiosInstance = axios.create({
      baseURL: this.resources.BACKEND_SIDE_BASE_URL,
      headers: { "Content-Type": "application/json" },
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
          const newToken = await this.refreshToken();
          if (newToken) {
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return this.axiosInstance.request(error.config);
          } else {
            this.removeTokenCookie();
            window.location.href = "/login";
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
      console.log("response.data", response.data);
      return response.data; // Success response with access_token expected
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
      const refreshToken = Cookies.get(this.config.COOKIE_NAME_REFRESH_TOKEN);
      if (!refreshToken) return null;

      const refreshUrl =
        this.config.SERVICE_NAME + this.config.COOKIE_REFRESH_TOKEN;

      const response = await axios.post(
        this.resources.BACKEND_SIDE_BASE_URL + refreshUrl,
        { accessToken: refreshToken }
      );

      if (!response.data.success || !response.data.data?.access_token)
        throw new Error("Token refresh failed");

      const { access_token, refresh_token } = response.data.data;
      Cookies.set(this.config.COOKIE_NAME_TOKEN, access_token, { path: "/" });
      if (refresh_token)
        Cookies.set(this.config.COOKIE_NAME_REFRESH_TOKEN, refresh_token, {
          path: "/",
        });

      return access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      this.removeTokenCookie();
      return null;
    }
  }

  getTokenFromCookie() {
    return Cookies.get(this.config.COOKIE_NAME_TOKEN) || null;
  }

  removeTokenCookie() {
    Cookies.remove(this.config.COOKIE_NAME_TOKEN, { path: "/" });
    Cookies.remove(this.config.COOKIE_NAME_REFRESH_TOKEN, { path: "/" });
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
