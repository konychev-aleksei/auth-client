import Cookies from "js-cookie";

const EXPIRY = {
  ACCESS_TOKEN: 1 / 24,
  REFRESH_TOKEN: 3,
};

export const saveAccessToken = (accessToken) => {
  Cookies.set("accessToken", accessToken, {
    expires: EXPIRY.ACCESS_TOKEN,
    path: "",
  });
};

export const saveRefreshToken = (refreshToken) => {
  Cookies.set("refreshToken", refreshToken, {
    expires: EXPIRY.REFRESH_TOKENs,
    path: "",
  });
};

export const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
