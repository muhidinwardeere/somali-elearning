import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
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
    setTimeout(() => { setLoading(false); setStep(2); }, 1400);
  };

  const handleGoogleSuccess = (tokenResponse) => {
    console.log("Google Token:", tokenResponse.access_token);
    // Send access_token to your Spring Boot backend to verify
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1000);
  };

  const handleGoogleError = () => {
    setErrors({ google: "Google sign in failed. Please try again." });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  const strength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    return s;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#E05C5C", "#D4A04A", "#5CA4E0", "#4DC98A"];
  const s = strength();

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", minHeight: "100vh", background: "#F7F4EE", display: "flex", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .out { font-family: 'Outfit', sans-serif; }

        .left-panel { width: 44%; background: #1A1A2E; display: flex; flex-direction: column; justify-content: space-between; padding: 48px; position: relative; overflow: hidden; }
        .left-panel::before { content: ''; position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(200,169,110,0.15) 0%, transparent 70%); top: -100px; left: -100px; pointer-events: none; }
        .left-panel::after { content: ''; position: absolute; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(77,100,200,0.1) 0%, transparent 70%); bottom: 60px; right: -60px; pointer-events: none; }
        .left-logo { font-size: 26px; font-weight: 600; color: #F7F4EE; position: relative; z-index: 1; cursor: pointer; }
        .left-logo span { color: #C8A96E; font-style: italic; }
        .left-content { position: relative; z-index: 1; }
        .left-title { font-size: clamp(32px, 3vw, 48px); font-weight: 600; color: #F7F4EE; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 20px; }
        .left-title em { color: #C8A96E; }
        .left-sub { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 300; color: rgba(247,244,238,0.55); line-height: 1.7; margin-bottom: 40px; }
        .features { display: flex; flex-direction: column; gap: 16px; }
        .feature-row { display: flex; align-items: flex-start; gap: 14px; }
        .feature-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(200,169,110,0.15); border: 1px solid rgba(200,169,110,0.2); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .feature-text { font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 400; color: rgba(247,244,238,0.65); line-height: 1.5; padding-top: 2px; }
        .feature-text strong { color: rgba(247,244,238,0.9); font-weight: 500; display: block; margin-bottom: 2px; }
        .left-footer { font-family: 'Outfit', sans-serif; font-size: 12px; color: rgba(247,244,238,0.25); position: relative; z-index: 1; }

        .right-panel { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px 32px; background: #F7F4EE; position: relative; overflow-y: auto; }
        .right-panel::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(26,26,46,0.04) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }

        .form-box { width: 100%; max-width: 420px; position: relative; z-index: 1; animation: fadeUp 0.6s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .form-heading { font-size: 34px; font-weight: 600; color: #1A1A2E; letter-spacing: -0.5px; margin-bottom: 6px; }
        .form-heading em { font-style: italic; color: #C8A96E; }
        .form-sub { font-family: 'Outfit', sans-serif; font-size: 14px; color: #8A8578; margin-bottom: 24px; }

        .google-wrap { margin-bottom: 4px; }
        .google-btn {
          width: 100%; padding: 12px 16px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 500;
          background: #FFFFFF; color: #1A1A2E;
          border: 1.5px solid #E2DDD5; border-radius: 6px;
          cursor: pointer; transition: all 0.2s;
        }
        .google-btn:hover { border-color: #1A1A2E; box-shadow: 0 2px 8px rgba(26,26,46,0.08); transform: translateY(-1px); }

        .google-wrap > div { width: 100% !important; }

        .divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
        .divider-line { flex: 1; height: 1px; background: #E2DDD5; }
        .divider-text { font-family: 'Outfit', sans-serif; font-size: 12px; color: #B5B0A8; }

        .field { margin-bottom: 18px; }
        .field-label { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; color: #5A5750; margin-bottom: 8px; display: block; }
        .input-wrap { position: relative; }
        .input-field { width: 100%; padding: 13px 16px; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 400; background: #FFFFFF; border: 1.5px solid #E2DDD5; border-radius: 6px; color: #1A1A2E; outline: none; transition: border-color 0.2s, box-shadow 0.2s; -webkit-appearance: none; }
        .input-field:focus { border-color: #1A1A2E; box-shadow: 0 0 0 3px rgba(26,26,46,0.06); }
        .input-field.error { border-color: #E05C5C; }
        .input-field::placeholder { color: #C0BCB5; }
        .eye-btn { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9A9690; padding: 4px; display: flex; align-items: center; transition: color 0.2s; }
        .eye-btn:hover { color: #1A1A2E; }
        .error-msg { font-family: 'Outfit', sans-serif; font-size: 12px; color: #E05C5C; margin-top: 6px; display: flex; align-items: center; gap: 4px; }

        .strength-bar { display: flex; gap: 4px; margin-top: 8px; }
        .strength-seg { height: 3px; flex: 1; border-radius: 2px; background: #E2DDD5; transition: background 0.3s; }
        .strength-label { font-family: 'Outfit', sans-serif; font-size: 11px; margin-top: 4px; font-weight: 500; }

        .submit-btn { width: 100%; padding: 14px; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600; background: #1A1A2E; color: #F7F4EE; border: none; border-radius: 6px; cursor: pointer; margin-top: 8px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .submit-btn:hover:not(:disabled) { background: #2A2A4A; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(247,244,238,0.3); border-top-color: #F7F4EE; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .terms { font-family: 'Outfit', sans-serif; font-size: 12px; color: #9A9690; text-align: center; margin-top: 16px; line-height: 1.6; }
        .link-btn { background: none; border: none; padding: 0; color: #1A1A2E; font-weight: 500; font-size: inherit; text-decoration: underline; cursor: pointer; font-family: inherit; transition: color 0.2s; }
        .link-btn:hover { color: #C8A96E; }
        .terms .link-btn { color: #5A5750; font-weight: 400; }

        .success-box { text-align: center; animation: fadeUp 0.6s ease both; }
        .success-icon { width: 72px; height: 72px; border-radius: 50%; background: #E8F8EF; border: 2px solid #4DC98A; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 24px; animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .success-title { font-size: 32px; font-weight: 600; color: #1A1A2E; margin-bottom: 12px; }
        .success-sub { font-family: 'Outfit', sans-serif; font-size: 15px; color: #8A8578; line-height: 1.6; margin-bottom: 32px; }
        .success-btn { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600; background: #1A1A2E; color: #F7F4EE; border: none; border-radius: 6px; padding: 14px 40px; cursor: pointer; transition: all 0.2s; }
        .success-btn:hover { background: #2A2A4A; }

        @media (max-width: 768px) {
          .left-panel { display: none; }
          .right-panel { padding: 32px 20px; }
        }
      `}</style>

      {/* Left Panel */}
      <div className="left-panel">
        <div className="left-logo" onClick={() => navigate('/')}>Aqoon<span>.so</span></div>
        <div className="left-content">
          <h2 className="left-title">Start your<br /><em>learning journey</em><br />today</h2>
          <p className="left-sub out">Join thousands of Somali students accessing quality education from anywhere.</p>
          <div className="features">
            {[
              { icon: "🎬", title: "HD Video Lessons", desc: "Recorded by expert instructors, optimized for slow connections" },
              { icon: "📄", title: "Downloadable Notes", desc: "PDF notes for every course to study offline" },
              { icon: "📊", title: "Track Your Progress", desc: "See exactly how far you've come in each course" },
              { icon: "💳", title: "Pay with EVC, E-Dahab or Waafi", desc: "Simple local payment — no card needed" },
            ].map((f) => (
              <div className="feature-row" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-text out">
                  <strong>{f.title}</strong>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="left-footer out">© 2024 Aqoon.so — Education for Somalia</div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {step === 1 ? (
          <div className="form-box">
            <h1 className="form-heading">Create an<br /><em>account</em></h1>

            <form onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className="field">
                <label className="field-label out">Full Name</label>
                <div className="input-wrap">
                  <input
                    className={`input-field${errors.name ? " error" : ""}`}
                    type="text" name="name" placeholder="Faadumo Cali"
                    value={form.name} onChange={handleChange}
                  />
                </div>
                {errors.name && <div className="error-msg out">⚠ {errors.name}</div>}
              </div>

              {/* Email */}
              <div className="field">
                <label className="field-label out">Email Address</label>
                <div className="input-wrap">
                  <input
                    className={`input-field${errors.email ? " error" : ""}`}
                    type="email" name="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>
                {errors.email && <div className="error-msg out">⚠ {errors.email}</div>}
              </div>

              {/* Password */}
              <div className="field">
                <label className="field-label out">Password</label>
                <div className="input-wrap">
                  <input
                    className={`input-field${errors.password ? " error" : ""}`}
                    type={show ? "text" : "password"} name="password"
                    placeholder="Min. 6 characters"
                    value={form.password} onChange={handleChange}
                    style={{ paddingRight: 44 }}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShow(!show)}>
                    {show ? "🙈" : "👁"}
                  </button>
                </div>
                {form.password && (
                  <>
                    <div className="strength-bar">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="strength-seg" style={{ background: i <= s ? strengthColor[s] : "#E2DDD5" }} />
                      ))}
                    </div>
                    <div className="strength-label out" style={{ color: strengthColor[s] }}>{strengthLabel[s]}</div>
                  </>
                )}
                {errors.password && <div className="error-msg out">⚠ {errors.password}</div>}
              </div>

              {/* Confirm Password */}
              <div className="field">
                <label className="field-label out">Confirm Password</label>
                <div className="input-wrap">
                  <input
                    className={`input-field${errors.confirm ? " error" : ""}`}
                    type={showConfirm ? "text" : "password"} name="confirm"
                    placeholder="Repeat your password"
                    value={form.confirm} onChange={handleChange}
                    style={{ paddingRight: 44 }}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.confirm && <div className="error-msg out">⚠ {errors.confirm}</div>}
              </div>

              <button type="submit" className="submit-btn out" disabled={loading}>
                {loading ? <div className="spinner" /> : "Create Account →"}
              </button>

            </form>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text out">or sign up with Google</span>
              <div className="divider-line" />
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              className="google-btn out"
              onClick={() => googleLogin()}
            >
              <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign up with Google
            </button>
            {errors.google && <div className="error-msg out" style={{ marginTop: 8 }}>⚠ {errors.google}</div>}

            {/* Already have account */}
            <p className="terms out" style={{ marginTop: 20 }}>
              Already have an account?{" "}
              <button type="button" className="link-btn out" onClick={() => navigate('/login')}>
                Sign in
              </button>
            </p>

            <p className="terms out" style={{ marginTop: 8 }}>
              By registering you agree to our{" "}
              <button type="button" className="link-btn out">Terms of Service</button>
              {" "}and{" "}
              <button type="button" className="link-btn out">Privacy Policy</button>
            </p>
          </div>
        ) : (
          <div className="success-box">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Welcome aboard!</h2>
            <p className="success-sub out">
              Your account has been created successfully.<br />
              Start exploring courses and learning today.
            </p>
            <button className="success-btn out" onClick={() => navigate('/login')}>
              Go to Login →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}