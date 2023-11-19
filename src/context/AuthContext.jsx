import { createContext, useState, useEffect } from "react";
import axios from "axios";
import inMemoryJWTService from "../services/inMemoryJWTService";

const ResourceClient = axios.create({
  baseURL: "http://localhost:5000/resource",
  withCredentials: true,
});

export const AuthClient = axios.create({
  baseURL: "http://localhost:5000/auth",
  withCredentials: true,
});

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState("");

  const handleFetchProtected = () => {
    ResourceClient.get("/protected")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    AuthClient.delete("/logout")
      .then(() => {
        inMemoryJWTService.deleteToken();
      })
      .catch(console.error);
  };

  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWTService.setToken(accessToken, accessTokenExpiration);
      })
      .catch(console.error);
  };

  const handleSignIn = (data) => {
    AuthClient.post("/sign-in", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWTService.setToken(accessToken, accessTokenExpiration);
      })
      .catch(console.error);
  };

  useEffect(() => {
    AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWTService.setToken(accessToken, accessTokenExpiration);
      })
      .catch(console.error);
  }, []);

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
