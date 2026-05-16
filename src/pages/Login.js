import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // Simulate login — replace with real API call later
    setTimeout(() => {
      setLoading(false);
      // Admin email goes to admin dashboard, others go to student dashboard
      if (form.email === "admin@aqoon.so") {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }, 1400);
  };

  return (
    <div style={{ fontFamily: "'Libre Baskerville', Georgia, serif", minHeight: "100vh", background: "#0D1117", display: "flex", alignItems: "stretch", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Mulish:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ml { font-family: 'Mulish', sans-serif; }

        /* ── Left decorative panel ── */
        .left {
          width: 48%;
          position: relative;
          overflow: hidden;
          background: #0D1117;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 56px;
        }
        .left-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 20%, rgba(194,154,87,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 50% 60% at 80% 80%, rgba(56,189,142,0.07) 0%, transparent 60%);
        }
        .left-lines {
          position: absolute; inset: 0; opacity: 0.04;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,1) 59px, rgba(255,255,255,1) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,1) 59px, rgba(255,255,255,1) 60px);
        }

        /* Floating cards */
        .float-card {
          position: absolute;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 16px 20px;
          backdrop-filter: blur(8px);
          animation: float 6s ease-in-out infinite;
          z-index: 1;
        }
        .float-card:nth-child(3) { top: 8%; left: 10%; animation-delay: 0s; }
        .float-card:nth-child(4) { top: 28%; right: 8%; animation-delay: 2s; }
        .float-card:nth-child(5) { top: 48%; left: 18%; animation-delay: 4s; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-icon { font-size: 22px; margin-bottom: 6px; }
        .float-title { font-family: 'Mulish', sans-serif; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8); }
        .float-sub { font-family: 'Mulish', sans-serif; font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 2px; }

        .left-bottom { position: relative; z-index: 2; background: linear-gradient(to top, rgba(13,17,23,0.95) 70%, transparent 100%); padding-top: 40px; margin-top: 20px; }
        .left-logo { font-size: 28px; font-weight: 700; color: #F5F0E8; margin-bottom: 20px; }
        .left-logo span { color: #C29A57; font-style: italic; }
        .left-title { font-size: clamp(28px, 3vw, 40px); font-weight: 700; color: #F5F0E8; line-height: 1.2; letter-spacing: -0.5px; margin-bottom: 12px; }
        .left-title em { color: #C29A57; font-style: italic; }
        .left-sub { font-family: 'Mulish', sans-serif; font-size: 14px; font-weight: 300; color: rgba(245,240,232,0.45); line-height: 1.7; }

        /* ── Right form panel ── */
        .right {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 32px;
          background: #F5F0E8;
          position: relative;
        }
        .right::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(13,17,23,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .form-wrap {
          width: 100%; max-width: 400px;
          position: relative; z-index: 1;
          animation: slideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-eyebrow { font-family: 'Mulish', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #C29A57; margin-bottom: 12px; }
        .form-title { font-size: 38px; font-weight: 700; color: #0D1117; letter-spacing: -1px; line-height: 1.1; margin-bottom: 8px; }
        .form-title em { font-style: italic; color: #C29A57; }
        .form-sub { font-family: 'Mulish', sans-serif; font-size: 14px; color: #7A7468; margin-bottom: 36px; }

        .field { margin-bottom: 22px; }
        .field-label { font-family: 'Mulish', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #4A4640; margin-bottom: 8px; display: block; }

        .input-wrap { position: relative; }
        .input {
          width: 100%; padding: 14px 18px;
          font-family: 'Mulish', sans-serif; font-size: 15px; font-weight: 400;
          background: #FFFFFF; color: #0D1117;
          border: 1.5px solid #DDD8CF;
          border-radius: 8px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus { border-color: #0D1117; box-shadow: 0 0 0 3px rgba(13,17,23,0.07); }
        .input.err { border-color: #D94F4F; }
        .input.err:focus { box-shadow: 0 0 0 3px rgba(217,79,79,0.08); }
        .input::placeholder { color: #BDB8B0; }

        .eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          font-size: 16px; color: #9A9590; padding: 4px;
          transition: color 0.2s;
        }
        .eye:hover { color: #0D1117; }

        .err-msg { font-family: 'Mulish', sans-serif; font-size: 12px; color: #D94F4F; margin-top: 6px; }

        .forgot {
          display: block; text-align: right;
          font-family: 'Mulish', sans-serif; font-size: 12px; font-weight: 600;
          color: #7A7468; margin-top: 6px; cursor: pointer;
          background: none; border: none; padding: 0;
          text-decoration: underline; transition: color 0.2s;
        }
        .forgot:hover { color: #0D1117; }

        .submit {
          width: 100%; padding: 15px;
          font-family: 'Mulish', sans-serif; font-size: 15px; font-weight: 700;
          background: #0D1117; color: #F5F0E8;
          border: none; border-radius: 8px; cursor: pointer;
          margin-top: 12px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s; letter-spacing: 0.3px;
        }
        .submit:hover:not(:disabled) { background: #1E2730; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(13,17,23,0.2); }
        .submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .spinner { width: 18px; height: 18px; border: 2px solid rgba(245,240,232,0.3); border-top-color: #F5F0E8; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider { display: flex; align-items: center; gap: 12px; margin: 28px 0 20px; }
        .div-line { flex: 1; height: 1px; background: #DDD8CF; }
        .div-text { font-family: 'Mulish', sans-serif; font-size: 12px; color: #B0AB A3; }

        .register-row { text-align: center; font-family: 'Mulish', sans-serif; font-size: 14px; color: #7A7468; }
        .link-btn { background: none; border: none; padding: 0; font-family: 'Mulish', sans-serif; font-size: 14px; font-weight: 700; color: #0D1117; text-decoration: underline; cursor: pointer; transition: color 0.2s; }
        .link-btn:hover { color: #C29A57; }

        .back-btn {
          display: flex; align-items: center; gap: 8px;
          background: none; border: none; padding: 0;
          font-family: 'Mulish', sans-serif; font-size: 13px; font-weight: 600;
          color: #7A7468; cursor: pointer; margin-bottom: 36px;
          transition: color 0.2s;
        }
        .back-btn:hover { color: #0D1117; }

        .demo-box {
          background: rgba(194,154,87,0.08);
          border: 1px solid rgba(194,154,87,0.2);
          border-radius: 8px; padding: 14px 16px;
          margin-bottom: 24px;
        }
        .demo-title { font-family: 'Mulish', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #C29A57; margin-bottom: 8px; }
        .demo-row { font-family: 'Mulish', sans-serif; font-size: 12px; color: #7A7468; margin-bottom: 3px; }
        .demo-row span { color: #0D1117; font-weight: 600; }

        @media (max-width: 768px) {
          .left { display: none; }
          .right { padding: 32px 20px; }
        }
      `}</style>

      {/* Left Panel */}
      <div className="left">
        <div className="left-bg" />
        <div className="left-lines" />

        {/* Floating cards */}
        <div className="float-card">
          <div className="float-icon">🎬</div>
          <div className="float-title ml">HD Video Lessons</div>
          <div className="float-sub ml">30+ courses available</div>
        </div>
        <div className="float-card">
          <div className="float-icon">📊</div>
          <div className="float-title ml">Track Progress</div>
          <div className="float-sub ml">Resume where you left off</div>
        </div>
        <div className="float-card">
          <div className="float-icon">💳</div>
          <div className="float-title ml">EVC Plus · E-Dahab · Waafi</div>
          <div className="float-sub ml">Simple local payments</div>
        </div>

        <div className="left-bottom">
          <div className="left-logo">Aqoon<span>.so</span></div>
          <h2 className="left-title">Welcome<br /><em>back</em></h2>
          <p className="left-sub ml">Continue your learning journey. Your progress is saved and waiting for you.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right">
        <div className="form-wrap">

          {/* Back to Home */}
          <button className="back-btn ml" onClick={() => navigate('/')}>
            ← Back to Home
          </button>

          <div className="form-eyebrow ml">Student & Admin Login</div>
          <h1 className="form-title">Sign <em>in</em></h1>
          <p className="form-sub ml">
            Don't have an account?{" "}
            <button type="button" className="link-btn" onClick={() => navigate('/register')}>
              Register now
            </button>
          </p>

          {/* Demo credentials hint */}
          <div className="demo-box">
            <div className="demo-title ml">Demo Credentials</div>
            <div className="demo-row ml">Student: <span>student@aqoon.so</span> / <span>password</span></div>
            <div className="demo-row ml">Admin: <span>admin@aqoon.so</span> / <span>password</span></div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="field">
              <label className="field-label ml">Email Address</label>
              <div className="input-wrap">
                <input
                  className={`input${errors.email ? " err" : ""}`}
                  type="email" name="email"
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                />
              </div>
              {errors.email && <div className="err-msg ml">⚠ {errors.email}</div>}
            </div>

            {/* Password */}
            <div className="field">
              <label className="field-label ml">Password</label>
              <div className="input-wrap">
                <input
                  className={`input${errors.password ? " err" : ""}`}
                  type={show ? "text" : "password"} name="password"
                  placeholder="Your password"
                  value={form.password} onChange={handleChange}
                  style={{ paddingRight: 44 }}
                />
                <button type="button" className="eye" onClick={() => setShow(!show)}>
                  {show ? "🙈" : "👁"}
                </button>
              </div>
              {errors.password && <div className="err-msg ml">⚠ {errors.password}</div>}
              <button type="button" className="forgot ml">Forgot password?</button>
            </div>

            <button type="submit" className="submit ml" disabled={loading}>
              {loading ? <div className="spinner" /> : "Sign In →"}
            </button>
          </form>

          <div className="divider">
            <div className="div-line" />
            <span className="div-text ml">or</span>
            <div className="div-line" />
          </div>

          <div className="register-row ml">
            New to Aqoon.so?{" "}
            <button type="button" className="link-btn" onClick={() => navigate('/register')}>
              Create a free account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}