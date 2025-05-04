import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const NudgeLogo = () => (
  <svg width="72" height="72" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="12" fill="#9178cc" fillOpacity="0.15" />
    <path d="M10 24L18 12L26 24" stroke="#9178cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="18" r="6" stroke="#9178cc" strokeWidth="2.5"/>
  </svg>
);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/20">
      <div className="w-full max-w-md rounded-3xl bg-white/40 dark:bg-base-200/60 backdrop-blur-xl shadow-2xl p-8 flex flex-col items-center gap-6 border border-white/30 dark:border-base-300/40">
        <NudgeLogo />
        <h1 className="text-3xl font-extrabold text-primary mb-1">Welcome Back</h1>
        <p className="text-base-content/70 mb-4">Sign in to continue your journey</p>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10 rounded-full"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 rounded-full"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full rounded-full shadow-lg" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <div className="text-center w-full">
          <p className="text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary font-semibold">
              Create account
            </Link>
          </p>
        </div>
        <div className="mt-2 text-xs text-base-content/60 text-center">
          <a href="https://nuzzle.onrender.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary font-semibold">Powered by Nuzzle</a>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
