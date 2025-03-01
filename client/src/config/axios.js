import axios from "axios";

const ax = (getToken) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  if (getToken) {
    api.interceptors.request.use(async (request) => {
      api.defaults.baseURL = import.meta.env.VITE_API_URL;
      const token = await getToken();
      request.headers.Authorization = `Bearer ${token}`;
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return request;
    });
  }

  api.interceptors.response.use(
    (response) => {
      console.log("Creating");
      return response;
    },
    (error) => {
      console.log("Creating");
      return Promise.reject(error);
    }
  );

  return api;
};

export default ax;
