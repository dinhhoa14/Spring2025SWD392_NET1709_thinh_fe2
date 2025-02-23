import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

const authService = {
  login: async (credentials) => {
    const response = await axiosClient.post("/api/auth/signin", credentials);
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
    }
    return response;
  },

  register: async (credentials) => {
    const response = await axiosClient.post("/api/auth/signup", credentials);
    if (response.code === "201") {
      toast.success("🎉 Đăng ký thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`❌  "Đăng ký thất bại!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },
};

export default authService;
