import axios from "axios";

const createAxiosInstance = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_MUSIC_API,
  });
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
