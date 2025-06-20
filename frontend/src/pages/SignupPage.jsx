import React, { useState, useCallback } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const InputField = ({ 
  icon: Icon, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  showToggle, 
  toggleType, 
  name 
}) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className="w-full bg-white/20 border border-white/30 rounded-full py-3 pl-10 pr-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
      value={value}
      onChange={onChange}
      required
      minLength={type === "password" ? 6 : undefined}
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

export default function SignupPage() {
  const { signup, loading } = useUserStore();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;
    const result = await signup(name, email, password, confirmPassword);
    if (result === "success") {
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
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
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/70">Join LuxeShop and start shopping</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            <InputField
              icon={User}
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              name="name"
            />
            <InputField
              icon={Mail}
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              name="email"
            />
            <InputField
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              name="password"
              showToggle
              toggleType={() => setShowPassword((prev) => !prev)}
            />
            <InputField
              icon={Lock}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              showToggle
              toggleType={() => setShowConfirmPassword((prev) => !prev)}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-green-400 hover:bg-green-300 text-gray-900 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Already have an account?{' '}
              <Link to="/login" className="text-green-300 hover:text-green-200 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 