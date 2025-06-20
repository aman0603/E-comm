import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

 export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async (name, email, password, confirmPassword) => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    set({ loading: true });

    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      set({ user: res.data.user, loading: false });
      toast.success("Signup successful!");
      return "success"; // ✅ Return success to navigate
    } catch (err) {
      toast.error(err.response.data.message || "Signup failed");
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log("Login response:", res.data.user); // Debugging line
      set({ user: res.data.user, loading: false });
      toast.success("Login successful!");
      return "success"; // ✅ Return success to navigate
    } catch (err) {
      toast.error(err.response.data.message || "Login failed");
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data.user, checkingAuth: false });
    } catch (err) {
      console.error("Error checking auth:", err.message);
      set({ user: null, checkingAuth: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logout successful!");
    } catch (err) {
      toast.error(err.response.data.message || "Logout failed");
      set({ loading: false });
    }
  },
}));
