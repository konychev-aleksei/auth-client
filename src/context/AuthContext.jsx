import { createContext, useState } from "react";
import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

const AuthClient = axios.create({
  baseURL: "http://localhost:5000/auth",
});

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});

  const handleFetchProtected = async () => {
    try {
      const response = await ApiClient.get("/protected");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    try {
      AuthClient.delete("/logout");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = (data) => {
    try {
    
      AuthClient.post("/registration", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = (data) => {
    try {
      AuthClient.post("/login", data);
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
