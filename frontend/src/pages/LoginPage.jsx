import React, { useState, useCallback } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

// Reusable InputField component
const InputField = ({
  icon: Icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  showToggle,
  toggleType
}) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full bg-white/20 border border-white/30 rounded-full py-3 pl-10 pr-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
      value={value}
      onChange={onChange}
      required
    />
    {showToggle && (
      <button
        type="button"
        onClick={toggleType}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
      >
        {type === "text" ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    )}
  </div>
);

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useUserStore();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    const result = await login(email, password);
    if (result === "success") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex items-center justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 w-full h-full -translate-x-1/2"
            style={{
              background: "linear-gradient(to right, #1f4037, #99f2c8)",
            }}
          ></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to your LuxeShop account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleChange}
              showToggle
              toggleType={() => setShowPassword((prev) => !prev)}
            />

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-green-300 hover:text-green-200 text-sm">
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-400 hover:bg-green-300 text-gray-900 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-300 hover:text-green-200 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}