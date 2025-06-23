import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { persist } from "zustand/middleware";
export const useUserStore = create(
  persist((set, get) => ({
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
        console.log("Auth check response:", res.data.user); // Debugging line
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
    refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
  }),
  {
    name: "user-storage", // Unique name for the storage
    getStorage: (state) => {user: state.user} // Use localStorage for persistence
  }
)
);
