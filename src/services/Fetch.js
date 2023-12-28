import axios from "axios";
import { showError } from "../utility/Helper";
import { removeAuthCache } from "./User";

export const BASE_URL = "https://okft.org/api/";

export const COMMON_HEADER = {
  "content-type": "application/json",
  accept: "application/json",
};

export const COMMON_HEADER_AUTH = (token) => {
  return {
    "content-type": "application/json",
    accept: "application/json",
    Authorization: "Bearer " + token,
  };
};

export const _GET = async (url, token = null) => {
  let res = await axios
    .get(BASE_URL + url, {
      headers:
        token !== null && token !== undefined
          ? COMMON_HEADER_AUTH(token)
          : COMMON_HEADER,
    })
    .then(async (response) => {
      if (response.status == 200) {
        if (response?.data?.msg === "Token is not valid") {
          window.location.href = "https://okft.org/login";
          return null;
        }
        return response.data;
      } else {
        return null;
      }
    })
    .catch(async (error) => {
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        error.response.data.msg === "Token is not valid"
      ) {
        if (token !== null) await removeAuthCache();

        showError("توکن شما منقضی شده است و نیاز است لاگین کنید");
        window.location.href = "/login";
        return undefined;
      } else {
        showError("خطایی در انجام عملیات موردنظر رخ داده است");
      }
      return null;
    });

  return res;
};

export const _POST = async (url, data, token = null) => {
  let res = await axios
    .post(BASE_URL + url, data, {
      headers:
        token !== null && token !== undefined
          ? COMMON_HEADER_AUTH(token)
          : COMMON_HEADER,
    })
    .then(async (response) => {
      if (response.status == 200) {
        if (response?.data?.msg === "Token is not valid") {
          window.location.href = "https://okft.org/login";
          return null;
        }
        return response.data;
      } else {
        return null;
      }
    })
    .catch(async (error) => {
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        error.response.data.msg === "Token is not valid"
      ) {
        if (token !== null) await removeAuthCache();

        showError("توکن شما منقضی شده است و نیاز است لاگین کنید");
        window.location.href = "/login";
        return undefined;
      } else {
        showError("خطایی در انجام عملیات موردنظر رخ داده است");
      }
      return null;
    });

  return res;
};
