import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  saveRefreshToken,
  saveAccessToken,
  removeTokens,
} from "../utils/tokenManagement";

const RefreshToken = axios.create({
  baseURL: "http://localhost:5000/auth/refresh",
  method: "POST",
});

const Api = axios.create({
  baseURL: "http://localhost:5000",
});

Api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      return config;
    }

    config.headers["Authorization"] = "Bearer " + accessToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      let accessToken;
      const refreshToken = Cookies.get("refreshToken");

      try {
        const response = await RefreshToken({
          data: { refreshToken },
        });

        accessToken = response.data;
        saveAccessToken(accessToken);
      } catch (error) {
        return Promise.reject(error);
      }

      originalRequest.headers["Authorization"] = "Bearer " + accessToken;
      return Api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});

  const handleFetchProtected = async () => {
    try {
      const response = await Api.get("/protected", data);

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");

      await Api.delete("/auth/logout", { data: { refreshToken } });

      removeTokens();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (data) => {
    try {
      const response = await Api.post("/auth/registration", data);

      const { accessToken, refreshToken } = response.data;
      saveAccessToken(accessToken);
      saveRefreshToken(refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async (data) => {
    try {
      const response = await Api.post("/auth/login", data);

      const { accessToken, refreshToken } = response.data;
      saveAccessToken(accessToken);
      saveRefreshToken(refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
