import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

// // interceptors for request/response handling
// apiClient.interceptors.request.use(
//   (config) => {
//     // modify request if needed (e.g, add headers)
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
