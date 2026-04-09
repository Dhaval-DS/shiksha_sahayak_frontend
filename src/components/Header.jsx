import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

function Header() {
  return (
    <div className="fixed top-0 left-16 w-[calc(100%-4rem)] h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-40 transition-all">

      {/* 1. LEFT ZONE (Empty spacer to force perfect centering) */}
      <div className="flex-1"></div>

      {/* 2. CENTER ZONE / LOGO */}
      <div className="flex shrink-0 items-center gap-3">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
          Shiksha Sahayak
        </h1>
      </div>

      {/* 3. RIGHT ZONE / BUTTONS */}
      <div className="flex-1 flex items-center justify-end gap-4">
        <Link to="/login">
          <button className="px-5 py-2.5 rounded-xl text-slate-600 font-bold hover:text-indigo-600 hover:bg-indigo-50 transition-all">
            Sign In
          </button>
        </Link>

        <Link to="/signup">
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
            Sign Up
          </button>
        </Link>
      </div>

    </div>
  );
}

export default Header;