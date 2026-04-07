import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [loginMethod, setLoginMethod] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const identifier =
      loginMethod === "email" ? formData.email : formData.mobile;

    if (identifier && formData.password) {
      alert("Login successful!");
      onLogin && onLogin({ [loginMethod]: identifier });
    } else {
      alert(`Please enter ${loginMethod} and password.`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* HEADER */}
        <div className="login-header">
          <h1>🔐 Welcome Back</h1>
          <p>Login to SarkariXpress to continue</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="login-form">

          {/* LOGIN METHOD */}
          <div className="form-group">
            <label>Login using</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="email"
                  checked={loginMethod === "email"}
                  onChange={(e) => setLoginMethod(e.target.value)}
                />
                Email
              </label>

              <label>
                <input
                  type="radio"
                  value="mobile"
                  checked={loginMethod === "mobile"}
                  onChange={(e) => setLoginMethod(e.target.value)}
                />
                Mobile
              </label>
            </div>
          </div>

          {/* EMAIL / MOBILE */}
          <div className="form-group">
            <label>
              {loginMethod === "email"
                ? "Email Address"
                : "Mobile Number"}
            </label>

            <input
              type={loginMethod === "email" ? "email" : "tel"}
              placeholder={
                loginMethod === "email"
                  ? "Enter your email"
                  : "Enter mobile number"
              }
              value={
                loginMethod === "email"
                  ? formData.email
                  : formData.mobile
              }
              onChange={(e) =>
                handleChange(
                  loginMethod === "email" ? "email" : "mobile",
                  e.target.value
                )
              }
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button type="submit" className="login-btn">
            Login
          </button>

          {/* SIGNUP */}
          <p className="signup-text">
            Don’t have an account? <span>Sign up</span>
          </p>
        </form>

        {/* DIVIDER */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* SOCIAL LOGIN */}
        <div className="social-buttons">
          <button onClick={() => alert("Google Login")}>
            🌐 Continue with Google
          </button>

          <button onClick={() => alert("Facebook Login")}>
            📘 Continue with Facebook
          </button>

          <button onClick={() => alert("Instagram Login")}>
            📷 Continue with Instagram
          </button>
        </div>
      </div>
    </div>
  );
}