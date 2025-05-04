import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme, font } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen bg-base-100" style={{ fontFamily: font }}>
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold text-primary">Nudge</div>
          <Loader className="size-10 animate-spin text-primary" />
        </div>
      </div>
    );

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100 flex flex-col" style={{ fontFamily: font }}>
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1 rounded-3xl bg-base-100/80 shadow-xl mt-20 mb-4">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};
export default App;
