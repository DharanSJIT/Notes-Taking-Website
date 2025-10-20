import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";

export default function Signup({ onSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwitchToLogin = () => {
    setIsAnimating(true);
    setTimeout(() => onSwitchToLogin(), 300);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess?.();
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please try logging in.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters long.");
          break;
        default:
          setError("Failed to create an account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      onSuccess?.();
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError("Failed to sign up with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-100 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full opacity-50 translate-x-1/2 translate-y-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className={`w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-200 z-10 transition-all duration-500 ${
        isAnimating ? 'opacity-0 scale-95 translate-x-8' : 'opacity-100 scale-100 translate-x-0'
      } animate-slideInFromRight`}>
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-2 tracking-tight">
          Create an Account
        </h2>
        <p className="text-slate-500 mb-8 text-center">
          Join to start taking notes.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-transparent border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 outline-none placeholder-slate-400 text-slate-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min. 6 characters)"
              className="w-full p-3 pr-12 bg-transparent border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 outline-none placeholder-slate-400 text-slate-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-indigo-600 transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 pr-12 bg-transparent border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 outline-none placeholder-slate-400 text-slate-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-indigo-600 transition-colors">
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">Or sign up with</span></div>
        </div>

        <button onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 py-3 rounded-xl shadow-sm hover:bg-slate-50 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none" disabled={loading}>
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5"/>
          Sign up with Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button onClick={handleSwitchToLogin} className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors duration-200" disabled={isAnimating}>
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
