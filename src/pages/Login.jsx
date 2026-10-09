import { login } from "../services/authService";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      alert("Login successful!");

      // Reload the app after successful login
      window.location.reload();

    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Side */}
      <div className="login-brand">

        <div className="brand-logo">
          <Sparkles size={22} />
        </div>

        <h1>ProjectPilot</h1>

        <p className="brand-tagline">
          Smarter project management.<br />
          Better team decisions.
        </p>

        <div className="login-features">
          <div>
            <strong>AI-Powered Insights</strong>
            <span>Identify project risks before they become problems.</span>
          </div>

          <div>
            <strong>Smart Team Management</strong>
            <span>Track workload and improve team productivity.</span>
          </div>

          <div>
            <strong>Real-Time Progress</strong>
            <span>Keep every project and task under control.</span>
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className="login-section">

        <div className="login-card">

          <div className="mobile-logo">
            <Sparkles size={20} />
          </div>

          <h2>Welcome back</h2>

          <p className="login-subtitle">
            Sign in to continue to your workspace.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="input-group">

              <label>Email address</label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>

            {/* Password */}
            <div className="input-group">

              <div className="password-label">

                <label>Password</label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    alert("Password reset will be connected to Supabase.")
                  }
                >
                  Forgot password?
                </button>

              </div>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight size={18} />}
            </button>

          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button
            className="demo-button"
            onClick={() => {
              setEmail("demo@projectpilot.ai");
              setPassword("Demo@123");
              setError("");
            }}
          >
            Try Demo Account
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <button
              className="signup-button"
              onClick={() =>
                alert("Sign-up will be connected to Supabase.")
              }
            >
              Create account
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;