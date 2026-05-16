import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const courses = [
  { id: 1, title: "Xisaabta Asaasiga", subject: "Mathematics", lessons: 12, price: "$8", thumb: "📐" },
  { id: 2, title: "Sayniska Dabiiciga", subject: "Science", lessons: 9, price: "$8", thumb: "🔬" },
  { id: 3, title: "Luuqadda Ingiriisiga", subject: "English", lessons: 15, price: "$8", thumb: "📖" },
  { id: 4, title: "Taariikhda Soomaaliya", subject: "History", lessons: 10, price: "$8", thumb: "🏛️" },
  { id: 5, title: "Teknolojiyadda", subject: "Technology", lessons: 11, price: "$8", thumb: "💻" },
  { id: 6, title: "Juqraafiyada Adduunka", subject: "Geography", lessons: 8, price: "$8", thumb: "🌍" },
];

const plans = [
  { name: "Monthly", price: "$9", period: "/month", desc: "Full access to all courses & notes", tag: null },
  { name: "Yearly", price: "$48", period: "/year", desc: "Save 27% — best value for learners", tag: "Best Value" },
  { name: "Per Course", price: "$8", period: "/course", desc: "One-time access to a single course", tag: null },
];

const stats = [
  { value: "500+", label: "Students" },
  { value: "30+", label: "Courses" },
  { value: "3", label: "Payment Methods" },
  { value: "24/7", label: "Access" },
];

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    setTimeout(() => setVisible(true), 100);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", background: "#0B0F1A", color: "#F0EDE6", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; transition: all 0.4s ease; }
        .nav.scrolled { background: rgba(11,15,26,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 14px 48px; }
        .nav-logo { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #F0EDE6; }
        .nav-logo span { color: #C8A96E; }
        .nav-links { display: flex; gap: 36px; }
        .nav-links a { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400; color: rgba(240,237,230,0.65); text-decoration: none; transition: color 0.2s; cursor: pointer; }
        .nav-links a:hover { color: #F0EDE6; }
        .nav-cta { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; background: #C8A96E; color: #0B0F1A; border: none; padding: 10px 24px; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
        .nav-cta:hover { background: #DFC08A; }
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px; position: relative; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 30%, rgba(200,169,110,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(99,83,158,0.08) 0%, transparent 60%); }
        .hero-grid { position: absolute; inset: 0; opacity: 0.035; background-image: linear-gradient(rgba(240,237,230,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,230,1) 1px, transparent 1px); background-size: 60px 60px; }
        .hero-tag { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: #C8A96E; border: 1px solid rgba(200,169,110,0.35); padding: 6px 18px; border-radius: 20px; margin-bottom: 32px; opacity: 0; transform: translateY(16px); transition: all 0.7s ease; position: relative; }
        .hero-tag.show { opacity: 1; transform: translateY(0); }
        .hero-title { font-size: clamp(42px, 7vw, 80px); font-weight: 700; line-height: 1.08; letter-spacing: -2px; margin-bottom: 24px; opacity: 0; transform: translateY(24px); transition: all 0.7s ease 0.15s; position: relative; }
        .hero-title.show { opacity: 1; transform: translateY(0); }
        .hero-title em { font-style: italic; color: #C8A96E; }
        .hero-sub { font-family: 'DM Sans', sans-serif; font-size: 18px; font-weight: 300; color: rgba(240,237,230,0.6); max-width: 520px; line-height: 1.7; margin-bottom: 48px; opacity: 0; transform: translateY(24px); transition: all 0.7s ease 0.3s; position: relative; }
        .hero-sub.show { opacity: 1; transform: translateY(0); }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; opacity: 0; transform: translateY(24px); transition: all 0.7s ease 0.45s; position: relative; }
        .hero-btns.show { opacity: 1; transform: translateY(0); }
        .btn-primary { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; background: #C8A96E; color: #0B0F1A; border: none; padding: 14px 36px; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover { background: #DFC08A; transform: translateY(-1px); }
        .btn-outline { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 400; background: transparent; color: #F0EDE6; border: 1px solid rgba(240,237,230,0.25); padding: 14px 36px; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { border-color: rgba(240,237,230,0.5); transform: translateY(-1px); }
        .stats-bar { display: flex; justify-content: center; gap: 0; border-top: 1px solid rgba(240,237,230,0.08); border-bottom: 1px solid rgba(240,237,230,0.08); margin: 0; padding: 32px 48px; background: rgba(255,255,255,0.02); }
        .stat-item { text-align: center; padding: 0 48px; border-right: 1px solid rgba(240,237,230,0.1); }
        .stat-item:last-child { border-right: none; }
        .stat-value { font-size: 36px; font-weight: 700; color: #C8A96E; letter-spacing: -1px; }
        .stat-label { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; color: rgba(240,237,230,0.45); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
        .section { padding: 96px 48px; max-width: 1200px; margin: 0 auto; }
        .section-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: #C8A96E; margin-bottom: 16px; }
        .section-title { font-size: clamp(28px, 4vw, 42px); font-weight: 700; line-height: 1.15; letter-spacing: -1px; margin-bottom: 48px; }
        .section-title em { font-style: italic; color: #C8A96E; }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .course-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(240,237,230,0.08); border-radius: 8px; padding: 28px; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; }
        .course-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(200,169,110,0.06) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; }
        .course-card:hover { border-color: rgba(200,169,110,0.3); transform: translateY(-4px); }
        .course-card:hover::before { opacity: 1; }
        .course-thumb { font-size: 36px; margin-bottom: 16px; }
        .course-subject { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #C8A96E; margin-bottom: 8px; }
        .course-title { font-size: 18px; font-weight: 600; margin-bottom: 12px; line-height: 1.3; }
        .course-meta { font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(240,237,230,0.45); display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(240,237,230,0.07); }
        .course-price { color: #C8A96E; font-weight: 500; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .plan-card { border: 1px solid rgba(240,237,230,0.1); border-radius: 8px; padding: 36px 28px; position: relative; transition: all 0.3s; }
        .plan-card.featured { border-color: #C8A96E; background: rgba(200,169,110,0.05); }
        .plan-card:hover { transform: translateY(-4px); }
        .plan-tag { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; background: #C8A96E; color: #0B0F1A; padding: 4px 14px; border-radius: 20px; }
        .plan-name { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: rgba(240,237,230,0.5); margin-bottom: 16px; }
        .plan-price { font-size: 48px; font-weight: 700; letter-spacing: -2px; color: #F0EDE6; }
        .plan-period { font-family: 'DM Sans', sans-serif; font-size: 14px; color: rgba(240,237,230,0.4); margin-left: 4px; }
        .plan-desc { font-family: 'DM Sans', sans-serif; font-size: 14px; color: rgba(240,237,230,0.55); margin: 16px 0 28px; line-height: 1.6; }
        .plan-btn { width: 100%; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; padding: 12px; border-radius: 4px; cursor: pointer; transition: all 0.2s; border: none; }
        .plan-btn.gold { background: #C8A96E; color: #0B0F1A; }
        .plan-btn.gold:hover { background: #DFC08A; }
        .plan-btn.outline { background: transparent; border: 1px solid rgba(240,237,230,0.2); color: #F0EDE6; }
        .plan-btn.outline:hover { border-color: rgba(240,237,230,0.4); }
        .pay-methods { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 32px; }
        .pay-badge { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; padding: 10px 22px; border-radius: 4px; border: 1px solid rgba(240,237,230,0.12); background: rgba(255,255,255,0.03); color: rgba(240,237,230,0.7); display: flex; align-items: center; gap: 8px; }
        .pay-dot { width: 8px; height: 8px; border-radius: 50%; background: #C8A96E; flex-shrink: 0; }
        .footer { border-top: 1px solid rgba(240,237,230,0.08); padding: 40px 48px; display: flex; justify-content: space-between; align-items: center; font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(240,237,230,0.3); }
        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .nav-links { display: none; }
          .section { padding: 64px 20px; }
          .pricing-grid { grid-template-columns: 1fr; }
          .stats-bar { flex-wrap: wrap; gap: 24px; padding: 24px 20px; }
          .stat-item { border-right: none; padding: 0 24px; }
          .footer { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      {/* Navbar */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">Aqoon<span>.</span>so</div>
        <div className="nav-links">
          <a href="#courses">Courses</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>
        <button className="nav-cta" onClick={() => navigate('/register')}>
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className={`hero-tag${visible ? " show" : ""}`}>Somalia's E-Learning Platform</div>
        <h1 className={`hero-title${visible ? " show" : ""}`}>
          Learn anything,<br /><em>anywhere in Somalia</em>
        </h1>
        <p className={`hero-sub dm${visible ? " show" : ""}`}>
          Access high-quality recorded lessons and study notes from expert instructors — designed for Somali students on any device, even on slow internet.
        </p>
        <div className={`hero-btns${visible ? " show" : ""}`}>
          <button className="btn-primary" onClick={() => navigate('/register')}>
            Browse Courses
          </button>
          <button className="btn-outline" onClick={() => navigate('/register')}>
            View Pricing
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar">
        {stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label dm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Courses */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <section className="section" id="courses">
          <div className="section-label dm">What we offer</div>
          <h2 className="section-title">Featured <em>Courses</em></h2>
          <div className="courses-grid">
            {courses.map((c) => (
              <div className="course-card" key={c.id} onClick={() => navigate('/register')}>
                <div className="course-thumb">{c.thumb}</div>
                <div className="course-subject dm">{c.subject}</div>
                <div className="course-title">{c.title}</div>
                <div className="course-meta dm">
                  <span>{c.lessons} lessons</span>
                  <span className="course-price">{c.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="section" id="pricing" style={{ paddingTop: 0 }}>
          <div className="section-label dm">Simple pricing</div>
          <h2 className="section-title">Choose your <em>plan</em></h2>
          <div className="pricing-grid">
            {plans.map((p) => (
              <div className={`plan-card${p.tag ? " featured" : ""}`} key={p.name}>
                {p.tag && <div className="plan-tag dm">{p.tag}</div>}
                <div className="plan-name dm">{p.name}</div>
                <div>
                  <span className="plan-price">{p.price}</span>
                  <span className="plan-period dm">{p.period}</span>
                </div>
                <p className="plan-desc dm">{p.desc}</p>
                <button
                  className={`plan-btn dm${p.tag ? " gold" : " outline"}`}
                  onClick={() => navigate('/register')}
                >
                  Get {p.name}
                </button>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div style={{ marginTop: 48 }}>
            <div className="section-label dm" style={{ marginBottom: 12 }}>Accepted payment methods</div>
            <div className="pay-methods">
              {["EVC Plus", "E-Dahab", "Waafi"].map((m) => (
                <div className="pay-badge dm" key={m}>
                  <span className="pay-dot" />
                  {m}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="nav-logo" style={{ fontSize: 18 }}>Aqoon<span style={{ color: "#C8A96E" }}>.</span>so</div>
        <span>© 2024 Aqoon.so — Education for Somalia</span>
        <span>Built with ❤️ for Somali Students</span>
      </footer>
    </div>
  );
}