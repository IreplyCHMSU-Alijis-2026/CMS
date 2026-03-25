import axios from "axios";
import authAxios from "./authaxios";

const axiosPrivate = axios.create({
  baseURL: "http://192.168.68.117:3000",
  withCredentials: true
});

axiosPrivate.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


axiosPrivate.interceptors.response.use(
  res => res,
  async err => {

    const prevRequest = err.config;

   if ((err.response?.status === 401 || err.response?.status === 403) && !prevRequest._retry) {

      prevRequest._retry = true;

      const res = await authAxios.get("/refresh");

      localStorage.setItem("accessToken", res.data.accessToken);

      prevRequest.headers.Authorization =
        "Bearer " + res.data.accessToken;

      return axiosPrivate(prevRequest);
    }

    return Promise.reject(err);
  }
);

export default axiosPrivate;