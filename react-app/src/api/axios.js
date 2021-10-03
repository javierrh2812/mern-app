import axios from "axios";
const baseUrl = process.env.REACT_APP_API;

if (!baseUrl) {
  throw Error("REACT_APP_API must be defined into .env");
}

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    if (!user || !user.token) return config;
    config.headers.authorization = "Bearer " + user.token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  (res) => res.data,
  (error) => {

    if (error.response.data.message === "Token has expired") {
      console.log("logout TODO: implement refresh token")
      window.sessionStorage.removeItem("user")
      window.location.reload()
    }
    return Promise.reject(
      error.response?.data?.message || "No se pudo contectar al servidor"
    );
  }
);

export const login = (email, password) => axios.post("/auth/login", { email, password });

export const register = (data) => axios.post("/auth/register", data);

export const listUsers = () => axios.get("/users");

export const updateUser = (id, data) => axios.put("/users/" + id, data);

export const getUser = (id) => axios.get("/users/" + id);
