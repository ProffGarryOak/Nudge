import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";

const NudgeLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="12" fill="#9178cc" fillOpacity="0.15" />
    <path d="M10 24L18 12L26 24" stroke="#9178cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="18" r="6" stroke="#9178cc" strokeWidth="2.5"/>
  </svg>
);

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-40">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full rounded-2xl bg-white/30 dark:bg-base-200/40 backdrop-blur-md border border-white/30 dark:border-base-300/40 shadow-lg">
          <div className="flex items-center gap-4 pl-3">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <NudgeLogo />
<h1 className="text-xl font-bold tracking-wide text-primary inline-block">
  Nudge{" "}
  <a
    href="https://nuzzle.onrender.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-accent font-semibold hover:scale-110 transition-transform inline-block ml-1"
  >
    — by Nuzzle ↗
  </a>
</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2 pr-3">
            <Link to={"/settings"} className="btn btn-sm gap-2 rounded-full transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2 rounded-full">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button className="btn btn-sm gap-2 rounded-full text-error hover:bg-error hover:text-error-content" onClick={logout}>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
