import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Home } from "lucide-react"; // ✅ Added Home icon

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login (for now)
    if (email && password) {
      alert("Login Successful");
      navigate("/"); // redirect to home
    }
  };

  return (
    // ✅ Added "relative" to the main wrapper
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative">
      
      {/* 🔷 NEW: Floating Back to Home Button */}
      <button 
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 px-4 py-2.5 bg-white text-slate-600 rounded-xl shadow-sm border border-slate-200 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all font-bold"
      >
        <Home size={18} /> Home
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Sign In
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Welcome back to Shiksha Sahayak
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Show/Hide */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between text-sm">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <span className="text-blue-500 cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-white font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer font-semibold"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;