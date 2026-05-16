import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PLANS = [
  { id: "monthly", name: "Monthly", price: 9, period: "month", desc: "Full access to all courses & notes", savings: null },
  { id: "yearly", name: "Yearly", price: 48, period: "year", desc: "Save 27% — best value for learners", savings: "Save $60" },
  { id: "course", name: "Per Course", price: 8, period: "course", desc: "One-time access to a single course", savings: null },
];

const METHODS = [
  { id: "evc", name: "EVC Plus", provider: "Hormuud Telecom", color: "#E63946", light: "rgba(230,57,70,0.08)", icon: "📱", prefix: "+252 61", placeholder: "61 XXX XXXX" },
  { id: "edahab", name: "E-Dahab", provider: "Dahabshiil", color: "#F4A261", light: "rgba(244,162,97,0.08)", icon: "💛", prefix: "+252 63", placeholder: "63 XXX XXXX" },
  { id: "waafi", name: "Waafi", provider: "Hormuud International", color: "#2EC4B6", light: "rgba(46,196,182,0.08)", icon: "🌐", prefix: "+252 61", placeholder: "61 XXX XXXX" },
];

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultPlan = params.get("plan") || "monthly";

  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [selectedMethod, setSelectedMethod] = useState("evc");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1); // 1=select, 2=confirm, 3=processing, 4=success, 5=failed
  const [phoneError, setPhoneError] = useState("");

  const plan = PLANS.find(p => p.id === selectedPlan);
  const method = METHODS.find(m => m.id === selectedMethod);

  const validatePhone = () => {
    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) { setPhoneError("Phone number is required"); return false; }
    if (digits.length < 8) { setPhoneError("Enter a valid phone number"); return false; }
    setPhoneError("");
    return true;
  };

  const handleProceed = () => {
    if (!validatePhone()) return;
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
    setTimeout(() => {
      // Simulate 80% success rate
      Math.random() > 0.2 ? setStep(4) : setStep(5);
    }, 3000);
  };

  return (
    <div style={{ fontFamily: "'Epilogue', sans-serif", minHeight: "100vh", background: "#080C10", color: "#EEE9E0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Yeseva+One&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ys { font-family: 'Yeseva One', serif; }

        /* Nav */
        .nav { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-bottom: 1px solid rgba(238,233,224,0.06); }
        .nav-logo { font-family: 'Yeseva One', serif; font-size: 20px; color: #EEE9E0; cursor: pointer; }
        .nav-logo span { color: #D4A843; }
        .nav-back { font-size: 13px; font-weight: 500; color: rgba(238,233,224,0.45); background: none; border: none; cursor: pointer; transition: color 0.2s; display: flex; align-items: center; gap: 6px; }
        .nav-back:hover { color: #EEE9E0; }
        .nav-secure { font-size: 12px; color: rgba(238,233,224,0.3); display: flex; align-items: center; gap: 6px; }

        /* Layout */
        .page { max-width: 1000px; margin: 0 auto; padding: 48px; display: grid; grid-template-columns: 1fr 360px; gap: 32px; }

        /* Left */
        .left-col { display: flex; flex-direction: column; gap: 24px; }

        /* Section card */
        .section-card { background: #0E1418; border: 1px solid rgba(238,233,224,0.07); border-radius: 16px; overflow: hidden; }
        .section-head { padding: 20px 24px; border-bottom: 1px solid rgba(238,233,224,0.05); display: flex; align-items: center; gap: 10px; }
        .section-num { width: 26px; height: 26px; border-radius: 50%; background: #D4A843; color: #080C10; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .section-num.done { background: #2EC4B6; }
        .section-label { font-size: 15px; font-weight: 600; color: #EEE9E0; }
        .section-body { padding: 20px 24px; }

        /* Plan selector */
        .plans-grid { display: flex; flex-direction: column; gap: 10px; }
        .plan-option { border: 1.5px solid rgba(238,233,224,0.08); border-radius: 12px; padding: 16px 18px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 14px; position: relative; }
        .plan-option:hover { border-color: rgba(212,168,67,0.3); background: rgba(212,168,67,0.03); }
        .plan-option.selected { border-color: #D4A843; background: rgba(212,168,67,0.06); }
        .plan-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgba(238,233,224,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: border-color 0.2s; }
        .plan-option.selected .plan-radio { border-color: #D4A843; }
        .plan-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #D4A843; opacity: 0; transition: opacity 0.2s; }
        .plan-option.selected .plan-radio-dot { opacity: 1; }
        .plan-info { flex: 1; }
        .plan-name { font-size: 14px; font-weight: 700; color: #EEE9E0; margin-bottom: 3px; }
        .plan-desc { font-size: 12px; color: rgba(238,233,224,0.4); }
        .plan-price-tag { text-align: right; }
        .plan-amount { font-family: 'Yeseva One', serif; font-size: 22px; color: #EEE9E0; }
        .plan-period { font-size: 11px; color: rgba(238,233,224,0.35); }
        .plan-savings { position: absolute; top: -8px; right: 14px; font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; background: #2EC4B6; color: #080C10; padding: 3px 10px; border-radius: 10px; }

        /* Method selector */
        .methods-grid { display: flex; flex-direction: column; gap: 10px; }
        .method-option { border: 1.5px solid rgba(238,233,224,0.08); border-radius: 12px; padding: 16px 18px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 14px; }
        .method-option:hover { border-color: rgba(238,233,224,0.2); }
        .method-option.selected { border-color: var(--mc); background: var(--ml); }
        .method-icon-box { width: 44px; height: 44px; border-radius: 10px; background: rgba(238,233,224,0.06); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .method-name { font-size: 15px; font-weight: 700; color: #EEE9E0; margin-bottom: 2px; }
        .method-provider { font-size: 12px; color: rgba(238,233,224,0.35); }
        .method-check { width: 22px; height: 22px; border-radius: 50%; border: 2px solid rgba(238,233,224,0.15); display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s; font-size: 12px; }
        .method-option.selected .method-check { background: var(--mc); border-color: var(--mc); }

        /* Phone input */
        .phone-wrap { display: flex; gap: 10px; }
        .phone-prefix { background: rgba(238,233,224,0.05); border: 1.5px solid rgba(238,233,224,0.08); border-radius: 10px; padding: 14px 16px; font-size: 14px; font-weight: 600; color: rgba(238,233,224,0.6); white-space: nowrap; }
        .phone-input { flex: 1; background: rgba(238,233,224,0.05); border: 1.5px solid rgba(238,233,224,0.08); border-radius: 10px; padding: 14px 16px; font-family: 'Epilogue', sans-serif; font-size: 15px; font-weight: 500; color: #EEE9E0; outline: none; transition: border-color 0.2s; }
        .phone-input:focus { border-color: #D4A843; box-shadow: 0 0 0 3px rgba(212,168,67,0.08); }
        .phone-input.err { border-color: #E63946; }
        .phone-input::placeholder { color: rgba(238,233,224,0.2); }
        .phone-error { font-size: 12px; color: #E63946; margin-top: 8px; }
        .phone-hint { font-size: 12px; color: rgba(238,233,224,0.3); margin-top: 8px; }

        /* Proceed button */
        .proceed-btn { width: 100%; padding: 16px; font-family: 'Epilogue', sans-serif; font-size: 15px; font-weight: 800; background: #D4A843; color: #080C10; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.3px; margin-top: 8px; }
        .proceed-btn:hover { background: #E8BC57; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(212,168,67,0.25); }

        /* Right col — order summary */
        .summary-card { background: #0E1418; border: 1px solid rgba(238,233,224,0.07); border-radius: 16px; padding: 24px; position: sticky; top: 24px; }
        .summary-title { font-family: 'Yeseva One', serif; font-size: 18px; color: #EEE9E0; margin-bottom: 20px; }
        .summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .summary-key { font-size: 13px; color: rgba(238,233,224,0.45); }
        .summary-val { font-size: 13px; font-weight: 600; color: #EEE9E0; }
        .summary-divider { height: 1px; background: rgba(238,233,224,0.06); margin: 16px 0; }
        .summary-total-key { font-size: 15px; font-weight: 700; color: #EEE9E0; }
        .summary-total-val { font-family: 'Yeseva One', serif; font-size: 28px; color: #D4A843; }
        .secure-badges { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(238,233,224,0.06); }
        .secure-badge { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(238,233,224,0.35); }

        /* Confirm overlay */
        .overlay { position: fixed; inset: 0; background: rgba(8,12,16,0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
        .overlay-card { background: #0E1418; border: 1px solid rgba(238,233,224,0.1); border-radius: 20px; padding: 36px; width: 100%; max-width: 420px; text-align: center; animation: popUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes popUp { from { opacity: 0; transform: scale(0.85) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        .overlay-icon { font-size: 48px; margin-bottom: 16px; }
        .overlay-title { font-family: 'Yeseva One', serif; font-size: 24px; color: #EEE9E0; margin-bottom: 8px; }
        .overlay-sub { font-size: 14px; color: rgba(238,233,224,0.45); line-height: 1.6; margin-bottom: 24px; }

        .confirm-details { background: rgba(238,233,224,0.04); border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: left; }
        .confirm-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
        .confirm-key { color: rgba(238,233,224,0.4); }
        .confirm-val { color: #EEE9E0; font-weight: 600; }
        .confirm-total { border-top: 1px solid rgba(238,233,224,0.06); margin-top: 8px; padding-top: 10px; }
        .confirm-total .confirm-val { color: #D4A843; font-family: 'Yeseva One', serif; font-size: 18px; }

        .overlay-btn { width: 100%; padding: 14px; font-family: 'Epilogue', sans-serif; font-size: 14px; font-weight: 800; border: none; border-radius: 10px; cursor: pointer; transition: all 0.2s; margin-bottom: 10px; }
        .overlay-btn.primary { background: #D4A843; color: #080C10; }
        .overlay-btn.primary:hover { background: #E8BC57; }
        .overlay-btn.secondary { background: rgba(238,233,224,0.06); color: rgba(238,233,224,0.6); }
        .overlay-btn.secondary:hover { background: rgba(238,233,224,0.1); color: #EEE9E0; }
        .overlay-btn.success { background: #2EC4B6; color: #080C10; }
        .overlay-btn.success:hover { background: #3DD5C7; }
        .overlay-btn.danger { background: rgba(230,57,70,0.1); color: #E63946; border: 1px solid rgba(230,57,70,0.2); }
        .overlay-btn.danger:hover { background: rgba(230,57,70,0.2); }

        /* Processing spinner */
        .processing-ring { width: 64px; height: 64px; border: 3px solid rgba(238,233,224,0.08); border-top-color: #D4A843; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .processing-dots { display: flex; gap: 6px; justify-content: center; margin-top: 16px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: #D4A843; animation: bounce 1.2s infinite; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }

        /* Success */
        .success-ring { width: 80px; height: 80px; border-radius: 50%; background: rgba(46,196,182,0.1); border: 2px solid #2EC4B6; display: flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto 20px; animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
        .receipt-num { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(238,233,224,0.3); margin-top: 12px; }

        @media (max-width: 768px) {
          .page { grid-template-columns: 1fr; padding: 24px 20px; }
          .nav { padding: 0 20px; }
          .summary-card { position: static; }
        }
      `}</style>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo ys" onClick={() => navigate('/')}>Aqoon<span>.so</span></div>
        <div className="nav-secure">🔒 Secure Payment</div>
        <button className="nav-back" onClick={() => navigate(-1)}>← Back</button>
      </nav>

      <div className="page">
        {/* Left Column */}
        <div className="left-col">

          {/* Step 1 — Choose Plan */}
          <div className="section-card">
            <div className="section-head">
              <div className="section-num ys">1</div>
              <div className="section-label">Choose Your Plan</div>
            </div>
            <div className="section-body">
              <div className="plans-grid">
                {PLANS.map(p => (
                  <div
                    key={p.id}
                    className={`plan-option${selectedPlan === p.id ? " selected" : ""}`}
                    onClick={() => setSelectedPlan(p.id)}
                  >
                    {p.savings && <div className="plan-savings">{p.savings}</div>}
                    <div className="plan-radio">
                      <div className="plan-radio-dot" />
                    </div>
                    <div className="plan-info">
                      <div className="plan-name">{p.name}</div>
                      <div className="plan-desc">{p.desc}</div>
                    </div>
                    <div className="plan-price-tag">
                      <div className="plan-amount ys">${p.price}</div>
                      <div className="plan-period">/ {p.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2 — Choose Payment Method */}
          <div className="section-card">
            <div className="section-head">
              <div className="section-num ys">2</div>
              <div className="section-label">Choose Payment Method</div>
            </div>
            <div className="section-body">
              <div className="methods-grid">
                {METHODS.map(m => (
                  <div
                    key={m.id}
                    className={`method-option${selectedMethod === m.id ? " selected" : ""}`}
                    style={{ "--mc": m.color, "--ml": m.light }}
                    onClick={() => setSelectedMethod(m.id)}
                  >
                    <div className="method-icon-box">{m.icon}</div>
                    <div>
                      <div className="method-name">{m.name}</div>
                      <div className="method-provider">{m.provider}</div>
                    </div>
                    <div className="method-check" style={{ color: "#080C10" }}>
                      {selectedMethod === m.id ? "✓" : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 — Phone Number */}
          <div className="section-card">
            <div className="section-head">
              <div className="section-num ys">3</div>
              <div className="section-label">Enter Your Phone Number</div>
            </div>
            <div className="section-body">
              <div className="phone-wrap">
                <div className="phone-prefix">{method.prefix}</div>
                <input
                  className={`phone-input${phoneError ? " err" : ""}`}
                  type="tel"
                  placeholder={method.placeholder}
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setPhoneError(""); }}
                />
              </div>
              {phoneError && <div className="phone-error">⚠ {phoneError}</div>}
              <div className="phone-hint">
                💡 You will receive a payment prompt on your {method.name} number
              </div>
              <button className="proceed-btn" onClick={handleProceed}>
                Review & Pay ${plan.price} →
              </button>
            </div>
          </div>

        </div>

        {/* Right Column — Order Summary */}
        <div>
          <div className="summary-card">
            <div className="summary-title">Order Summary</div>

            <div className="summary-row">
              <div className="summary-key">Plan</div>
              <div className="summary-val">{plan.name}</div>
            </div>
            <div className="summary-row">
              <div className="summary-key">Payment method</div>
              <div className="summary-val">{method.name}</div>
            </div>
            <div className="summary-row">
              <div className="summary-key">Billing period</div>
              <div className="summary-val">Per {plan.period}</div>
            </div>
            <div className="summary-row">
              <div className="summary-key">Access</div>
              <div className="summary-val">All courses + notes</div>
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <div className="summary-total-key">Total</div>
              <div className="summary-total-val">${plan.price}</div>
            </div>

            <div className="secure-badges">
              {[
                "🔒 256-bit SSL encryption",
                "✅ Instant access after payment",
                "🔄 Cancel anytime",
                "📱 Works on all devices",
              ].map(b => (
                <div className="secure-badge" key={b}>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONFIRM OVERLAY ── */}
      {step === 2 && (
        <div className="overlay">
          <div className="overlay-card">
            <div className="overlay-icon">💳</div>
            <div className="overlay-title ys">Confirm Payment</div>
            <p className="overlay-sub">Please review your payment details before confirming.</p>

            <div className="confirm-details">
              <div className="confirm-row">
                <span className="confirm-key">Plan</span>
                <span className="confirm-val">{plan.name}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-key">Method</span>
                <span className="confirm-val">{method.name}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-key">Phone</span>
                <span className="confirm-val">{method.prefix} {phone}</span>
              </div>
              <div className="confirm-row confirm-total">
                <span className="confirm-key" style={{ fontWeight: 700, color: "#EEE9E0" }}>Total</span>
                <span className="confirm-val">${plan.price}</span>
              </div>
            </div>

            <button className="overlay-btn primary" onClick={handleConfirm}>
              Confirm & Pay ${plan.price} →
            </button>
            <button className="overlay-btn secondary" onClick={() => setStep(1)}>
              Go Back
            </button>
          </div>
        </div>
      )}

      {/* ── PROCESSING OVERLAY ── */}
      {step === 3 && (
        <div className="overlay">
          <div className="overlay-card">
            <div className="processing-ring" />
            <div className="overlay-title ys">Processing Payment</div>
            <p className="overlay-sub">
              We sent a payment prompt to your {method.name} number.<br />
              Please approve it on your phone.
            </p>
            <p style={{ fontSize: 13, color: "rgba(238,233,224,0.3)" }}>
              {method.prefix} {phone}
            </p>
            <div className="processing-dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>
        </div>
      )}

      {/* ── SUCCESS OVERLAY ── */}
      {step === 4 && (
        <div className="overlay">
          <div className="overlay-card">
            <div className="success-ring">✓</div>
            <div className="overlay-title ys">Payment Successful!</div>
            <p className="overlay-sub">
              Your {plan.name} plan is now active.<br />
              You have full access to all courses and notes.
            </p>
            <div className="confirm-details" style={{ marginBottom: 20 }}>
              <div className="confirm-row">
                <span className="confirm-key">Amount paid</span>
                <span className="confirm-val" style={{ color: "#2EC4B6" }}>${plan.price}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-key">Method</span>
                <span className="confirm-val">{method.name}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-key">Plan</span>
                <span className="confirm-val">{plan.name}</span>
              </div>
            </div>
            <div className="receipt-num">
              Receipt #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
            <button className="overlay-btn success" style={{ marginTop: 20 }} onClick={() => navigate('/dashboard')}>
              Go to Dashboard →
            </button>
            <button className="overlay-btn secondary" onClick={() => navigate('/courses')}>
              Browse Courses
            </button>
          </div>
        </div>
      )}

      {/* ── FAILED OVERLAY ── */}
      {step === 5 && (
        <div className="overlay">
          <div className="overlay-card">
            <div className="overlay-icon">❌</div>
            <div className="overlay-title ys">Payment Failed</div>
            <p className="overlay-sub">
              Your payment could not be processed.<br />
              Please check your balance and try again.
            </p>
            <button className="overlay-btn primary" onClick={() => setStep(1)}>
              Try Again →
            </button>
            <button className="overlay-btn danger" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}