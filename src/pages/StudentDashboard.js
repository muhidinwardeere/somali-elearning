import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STUDENT = {
  name: "Faadumo Cali",
  email: "faadumo@gmail.com",
  avatar: "F",
  plan: "Monthly",
  planExpiry: "Jan 15, 2025",
  joinedDate: "Oct 2024",
};

const MY_COURSES = [
  { id: 1, emoji: "📐", title: "Xisaabta Asaasiga", subject: "Mathematics", totalLessons: 12, doneLessons: 5, lastLesson: "Addition basics", nextLesson: "Variables and expressions" },
  { id: 3, emoji: "📖", title: "Luuqadda Ingiriisiga", subject: "English", totalLessons: 15, doneLessons: 3, lastLesson: "Sentence structure", nextLesson: "Tenses" },
];

const RECENT_ACTIVITY = [
  { icon: "✅", text: "Completed: Addition basics", time: "2 hours ago", course: "Xisaabta" },
  { icon: "📄", text: "Downloaded: Chapter 2 — Algebra", time: "2 hours ago", course: "Xisaabta" },
  { icon: "✅", text: "Completed: Sentence structure", time: "Yesterday", course: "English" },
  { icon: "✅", text: "Completed: Parts of speech", time: "2 days ago", course: "English" },
  { icon: "🎯", text: "Enrolled in: Luuqadda Ingiriisiga", time: "3 days ago", course: "English" },
];

const RECOMMENDED = [
  { id: 2, emoji: "🔬", title: "Sayniska Dabiiciga", subject: "Science", lessons: 9, price: "$8", rating: 4.7 },
  { id: 4, emoji: "🏛️", title: "Taariikhda Soomaaliya", subject: "History", lessons: 10, price: "$8", rating: 4.6 },
  { id: 5, emoji: "💻", title: "Teknolojiyadda", subject: "Technology", lessons: 11, price: "$8", rating: 4.8 },
];

const NOTES = [
  { id: 1, title: "Chapter 1 — Numbers", course: "Xisaabta", size: "1.2 MB", date: "Oct 28" },
  { id: 2, title: "Chapter 2 — Algebra", course: "Xisaabta", size: "0.9 MB", date: "Oct 28" },
  { id: 3, title: "Grammar Guide", course: "English", size: "2.1 MB", date: "Oct 26" },
  { id: 4, title: "Vocabulary List", course: "English", size: "0.5 MB", date: "Oct 26" },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const totalProgress = MY_COURSES.reduce((a, c) => a + Math.round((c.doneLessons / c.totalLessons) * 100), 0) / MY_COURSES.length;

  return (
    <div style={{ fontFamily: "'DM Serif Display', serif", background: "#0F1419", minHeight: "100vh", color: "#F2EDE4", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .jk { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* Sidebar */
        .sidebar {
          width: 260px; min-height: 100vh;
          background: #141B24;
          border-right: 1px solid rgba(242,237,228,0.06);
          display: flex; flex-direction: column;
          position: fixed; left: 0; top: 0; bottom: 0;
          z-index: 50; transition: transform 0.3s;
        }
        .sidebar-logo { padding: 28px 24px 20px; border-bottom: 1px solid rgba(242,237,228,0.06); }
        .logo-text { font-size: 22px; font-weight: 400; color: #F2EDE4; cursor: pointer; }
        .logo-text span { color: #D4A843; font-style: italic; }

        .sidebar-user { padding: 20px 24px; border-bottom: 1px solid rgba(242,237,228,0.06); display: flex; align-items: center; gap: 12px; }
        .user-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #D4A843, #B8861A); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: #0F1419; flex-shrink: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        .user-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; color: #F2EDE4; }
        .user-plan { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; color: #D4A843; margin-top: 2px; }

        .sidebar-nav { flex: 1; padding: 16px 12px; }
        .nav-section-label { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(242,237,228,0.3); padding: 0 12px; margin: 16px 0 8px; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; margin-bottom: 2px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500; color: rgba(242,237,228,0.5); border: none; background: none; width: 100%; text-align: left; }
        .nav-item:hover { background: rgba(242,237,228,0.06); color: #F2EDE4; }
        .nav-item.active { background: rgba(212,168,67,0.12); color: #D4A843; }
        .nav-item-icon { font-size: 16px; width: 20px; text-align: center; }
        .nav-item-badge { margin-left: auto; font-size: 10px; font-weight: 700; background: #D4A843; color: #0F1419; padding: 2px 7px; border-radius: 10px; }

        .sidebar-bottom { padding: 16px 12px; border-top: 1px solid rgba(242,237,228,0.06); }
        .logout-btn { display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500; color: rgba(242,237,228,0.4); border: none; background: none; width: 100%; }
        .logout-btn:hover { background: rgba(224,80,80,0.08); color: #E05050; }

        /* Main */
        .main { margin-left: 260px; flex: 1; min-height: 100vh; }

        /* Topbar */
        .topbar { background: #141B24; border-bottom: 1px solid rgba(242,237,228,0.06); padding: 0 40px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
        .page-title { font-size: 20px; font-weight: 400; color: #F2EDE4; }
        .page-title em { color: #D4A843; font-style: italic; }
        .topbar-right { display: flex; align-items: center; gap: 12px; }
        .topbar-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; background: #D4A843; color: #0F1419; border: none; padding: 9px 20px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .topbar-btn:hover { background: #E8BC57; }
        .notif-btn { width: 38px; height: 38px; border-radius: 8px; background: rgba(242,237,228,0.06); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; position: relative; transition: background 0.2s; }
        .notif-btn:hover { background: rgba(242,237,228,0.1); }
        .notif-dot { width: 8px; height: 8px; background: #D4A843; border-radius: 50%; position: absolute; top: 6px; right: 6px; border: 2px solid #141B24; }

        /* Content */
        .content { padding: 36px 40px; }

        /* Stats row */
        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-card { background: #141B24; border: 1px solid rgba(242,237,228,0.06); border-radius: 12px; padding: 20px; position: relative; overflow: hidden; transition: border-color 0.2s; }
        .stat-card:hover { border-color: rgba(212,168,67,0.3); }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(212,168,67,0.5), transparent); opacity: 0; transition: opacity 0.3s; }
        .stat-card:hover::before { opacity: 1; }
        .stat-icon { font-size: 24px; margin-bottom: 12px; }
        .stat-value { font-size: 30px; font-weight: 400; color: #F2EDE4; letter-spacing: -1px; margin-bottom: 4px; }
        .stat-label { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: rgba(242,237,228,0.4); font-weight: 500; }
        .stat-change { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; color: #4DC98A; font-weight: 600; margin-top: 8px; }

        /* Grid layout */
        .grid-2 { display: grid; grid-template-columns: 1fr 340px; gap: 20px; margin-bottom: 20px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }

        /* Cards */
        .card { background: #141B24; border: 1px solid rgba(242,237,228,0.06); border-radius: 12px; overflow: hidden; }
        .card-header { padding: 20px 24px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(242,237,228,0.05); }
        .card-title { font-size: 16px; font-weight: 400; color: #F2EDE4; }
        .card-link { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; color: #D4A843; background: none; border: none; cursor: pointer; transition: opacity 0.2s; }
        .card-link:hover { opacity: 0.7; }
        .card-body { padding: 20px 24px; }

        /* Course progress cards */
        .course-progress-card { padding: 20px 24px; border-bottom: 1px solid rgba(242,237,228,0.05); cursor: pointer; transition: background 0.2s; }
        .course-progress-card:last-child { border-bottom: none; }
        .course-progress-card:hover { background: rgba(242,237,228,0.02); }
        .cpcard-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .cpcard-emoji { width: 44px; height: 44px; border-radius: 10px; background: rgba(212,168,67,0.1); border: 1px solid rgba(212,168,67,0.15); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .cpcard-info { flex: 1; }
        .cpcard-title { font-size: 15px; font-weight: 400; color: #F2EDE4; margin-bottom: 3px; }
        .cpcard-subject { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(242,237,228,0.35); }
        .cpcard-pct { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; color: #D4A843; }
        .progress-track { height: 5px; background: rgba(242,237,228,0.08); border-radius: 3px; margin-bottom: 10px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #D4A843, #E8C060); transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); }
        .cpcard-meta { display: flex; justify-content: space-between; }
        .cpcard-meta-item { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: rgba(242,237,228,0.4); }
        .cpcard-meta-item strong { color: rgba(242,237,228,0.7); }
        .continue-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700; color: #D4A843; background: rgba(212,168,67,0.1); border: 1px solid rgba(212,168,67,0.2); padding: 5px 14px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .continue-btn:hover { background: rgba(212,168,67,0.2); }

        /* Subscription card */
        .sub-card { background: linear-gradient(135deg, #1C2535 0%, #141B24 100%); border: 1px solid rgba(212,168,67,0.2); border-radius: 12px; padding: 24px; position: relative; overflow: hidden; }
        .sub-card::before { content: ''; position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; border-radius: 50%; background: radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%); }
        .sub-badge { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #D4A843; background: rgba(212,168,67,0.12); border: 1px solid rgba(212,168,67,0.2); padding: 4px 10px; border-radius: 20px; display: inline-block; margin-bottom: 12px; }
        .sub-plan { font-size: 24px; font-weight: 400; color: #F2EDE4; margin-bottom: 6px; }
        .sub-expiry { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: rgba(242,237,228,0.45); margin-bottom: 20px; }
        .sub-bar-bg { height: 4px; background: rgba(242,237,228,0.08); border-radius: 2px; margin-bottom: 8px; }
        .sub-bar-fill { height: 4px; background: linear-gradient(90deg, #D4A843, #E8C060); border-radius: 2px; width: 65%; }
        .sub-days { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; color: rgba(242,237,228,0.35); margin-bottom: 20px; }
        .renew-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; background: #D4A843; color: #0F1419; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; width: 100%; transition: all 0.2s; }
        .renew-btn:hover { background: #E8C060; }

        /* Activity feed */
        .activity-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(242,237,228,0.04); }
        .activity-item:last-child { border-bottom: none; }
        .activity-icon-wrap { width: 32px; height: 32px; border-radius: 8px; background: rgba(242,237,228,0.05); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .activity-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: rgba(242,237,228,0.7); line-height: 1.4; flex: 1; }
        .activity-text strong { color: #F2EDE4; font-weight: 600; }
        .activity-time { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; color: rgba(242,237,228,0.3); margin-top: 3px; }

        /* Recommended */
        .rec-card { background: #141B24; border: 1px solid rgba(242,237,228,0.06); border-radius: 12px; overflow: hidden; cursor: pointer; transition: all 0.3s; }
        .rec-card:hover { border-color: rgba(212,168,67,0.3); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.3); }
        .rec-card-top { padding: 20px; background: linear-gradient(135deg, #1C2535, #141B24); }
        .rec-emoji { font-size: 32px; margin-bottom: 8px; }
        .rec-subject { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #D4A843; }
        .rec-card-body { padding: 16px 20px; }
        .rec-title { font-size: 16px; color: #F2EDE4; margin-bottom: 10px; }
        .rec-meta { display: flex; justify-content: space-between; align-items: center; }
        .rec-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 700; color: #D4A843; }
        .rec-lessons { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: rgba(242,237,228,0.4); }

        /* Notes */
        .note-row { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(242,237,228,0.04); }
        .note-row:last-child { border-bottom: none; }
        .note-icon-box { width: 36px; height: 36px; border-radius: 8px; background: rgba(212,168,67,0.1); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .note-info { flex: 1; }
        .note-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; color: #F2EDE4; margin-bottom: 2px; }
        .note-meta { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; color: rgba(242,237,228,0.35); }
        .note-dl-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 700; color: #D4A843; background: rgba(212,168,67,0.1); border: none; padding: 5px 12px; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
        .note-dl-btn:hover { background: rgba(212,168,67,0.2); }

        /* Tabs */
        .tabs { display: flex; gap: 4px; padding: 6px; background: rgba(242,237,228,0.04); border-radius: 10px; margin-bottom: 28px; width: fit-content; }
        .tab-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; padding: 8px 20px; border-radius: 7px; border: none; cursor: pointer; transition: all 0.2s; color: rgba(242,237,228,0.45); background: none; }
        .tab-btn.active { background: #141B24; color: #F2EDE4; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
        .tab-btn:hover:not(.active) { color: rgba(242,237,228,0.7); }

        @media (max-width: 1024px) {
          .grid-2 { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .main { margin-left: 0; }
          .content { padding: 24px 20px; }
          .topbar { padding: 0 20px; }
          .grid-3 { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-text" onClick={() => navigate('/')}>Aqoon<span>.so</span></div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar jk">{STUDENT.avatar}</div>
          <div>
            <div className="user-name">{STUDENT.name}</div>
            <div className="user-plan">🟡 {STUDENT.plan} Plan</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu</div>
          {[
            { icon: "🏠", label: "Overview", tab: "overview" },
            { icon: "📚", label: "My Courses", tab: "courses", badge: MY_COURSES.length },
            { icon: "📄", label: "My Notes", tab: "notes", badge: NOTES.length },
            { icon: "📊", label: "Progress", tab: "progress" },
          ].map(item => (
            <button
              key={item.tab}
              className={`nav-item${activeTab === item.tab ? " active" : ""}`}
              onClick={() => setActiveTab(item.tab)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-item-badge jk">{item.badge}</span>}
            </button>
          ))}

          <div className="nav-section-label" style={{ marginTop: 20 }}>Explore</div>
          {[
            { icon: "🔍", label: "Browse Courses", action: () => navigate('/courses') },
            { icon: "💳", label: "Subscription", action: () => setActiveTab("subscription") },
          ].map(item => (
            <button key={item.label} className="nav-item" onClick={item.action}>
              <span className="nav-item-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={() => navigate('/')}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="page-title">
            {activeTab === "overview" && <>Good morning, <em>{STUDENT.name.split(" ")[0]}</em></>}
            {activeTab === "courses" && "My Courses"}
            {activeTab === "notes" && "My Notes"}
            {activeTab === "progress" && "My Progress"}
            {activeTab === "subscription" && "Subscription"}
          </div>
          <div className="topbar-right">
            <button className="notif-btn">
              🔔
              <span className="notif-dot" />
            </button>
            <button className="topbar-btn jk" onClick={() => navigate('/courses')}>
              Browse Courses
            </button>
          </div>
        </div>

        <div className="content">

          {/* Tab switcher */}
          <div className="tabs">
            {["overview", "courses", "notes", "progress"].map(t => (
              <button key={t} className={`tab-btn${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <>
              {/* Stats */}
              <div className="stats-row">
                {[
                  { icon: "📚", value: MY_COURSES.length, label: "Enrolled Courses", change: "+1 this month" },
                  { icon: "✅", value: MY_COURSES.reduce((a, c) => a + c.doneLessons, 0), label: "Lessons Completed", change: "+3 this week" },
                  { icon: "📊", value: `${Math.round(totalProgress)}%`, label: "Avg. Progress", change: "↑ 12% vs last week" },
                  { icon: "📄", value: NOTES.length, label: "Notes Downloaded", change: "+2 today" },
                ].map(s => (
                  <div className="stat-card" key={s.label}>
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label jk">{s.label}</div>
                    <div className="stat-change jk">{s.change}</div>
                  </div>
                ))}
              </div>

              {/* My courses + subscription */}
              <div className="grid-2">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Continue Learning</div>
                    <button className="card-link jk" onClick={() => setActiveTab("courses")}>View all →</button>
                  </div>
                  {MY_COURSES.map(c => {
                    const pct = Math.round((c.doneLessons / c.totalLessons) * 100);
                    return (
                      <div className="course-progress-card" key={c.id} onClick={() => navigate(`/courses/${c.id}`)}>
                        <div className="cpcard-top">
                          <div className="cpcard-emoji">{c.emoji}</div>
                          <div className="cpcard-info">
                            <div className="cpcard-title">{c.title}</div>
                            <div className="cpcard-subject jk">{c.subject}</div>
                          </div>
                          <div className="cpcard-pct jk">{pct}%</div>
                        </div>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="cpcard-meta">
                          <div className="cpcard-meta-item jk"><strong>{c.doneLessons}</strong> / {c.totalLessons} lessons</div>
                          <button className="continue-btn jk" onClick={e => { e.stopPropagation(); navigate(`/courses/${c.id}`); }}>
                            Continue →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Subscription */}
                  <div className="sub-card">
                    <div className="sub-badge jk">Active Plan</div>
                    <div className="sub-plan">{STUDENT.plan} Subscription</div>
                    <div className="sub-expiry jk">Expires {STUDENT.planExpiry}</div>
                    <div className="sub-bar-bg"><div className="sub-bar-fill" /></div>
                    <div className="sub-days jk">20 days remaining</div>
                    <button className="renew-btn">Renew Plan →</button>
                  </div>

                  {/* Recent activity */}
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Recent Activity</div>
                    </div>
                    <div className="card-body" style={{ padding: "12px 24px" }}>
                      {RECENT_ACTIVITY.slice(0, 4).map((a, i) => (
                        <div className="activity-item" key={i}>
                          <div className="activity-icon-wrap">{a.icon}</div>
                          <div>
                            <div className="activity-text jk">{a.text}</div>
                            <div className="activity-time jk">{a.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended */}
              <div className="card" style={{ marginBottom: 20 }}>
                <div className="card-header">
                  <div className="card-title">Recommended for You</div>
                  <button className="card-link jk" onClick={() => navigate('/courses')}>Browse all →</button>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div className="grid-3">
                    {RECOMMENDED.map(c => (
                      <div className="rec-card" key={c.id} onClick={() => navigate(`/courses/${c.id}`)}>
                        <div className="rec-card-top">
                          <div className="rec-emoji">{c.emoji}</div>
                          <div className="rec-subject jk">{c.subject}</div>
                        </div>
                        <div className="rec-card-body">
                          <div className="rec-title">{c.title}</div>
                          <div className="rec-meta">
                            <div className="rec-price jk">{c.price}</div>
                            <div className="rec-lessons jk">{c.lessons} lessons</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── COURSES TAB ── */}
          {activeTab === "courses" && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">My Enrolled Courses</div>
                <button className="card-link jk" onClick={() => navigate('/courses')}>Find more →</button>
              </div>
              {MY_COURSES.map(c => {
                const pct = Math.round((c.doneLessons / c.totalLessons) * 100);
                return (
                  <div className="course-progress-card" key={c.id} onClick={() => navigate(`/courses/${c.id}`)}>
                    <div className="cpcard-top">
                      <div className="cpcard-emoji">{c.emoji}</div>
                      <div className="cpcard-info">
                        <div className="cpcard-title">{c.title}</div>
                        <div className="cpcard-subject jk">{c.subject}</div>
                      </div>
                      <div className="cpcard-pct jk">{pct}%</div>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="cpcard-meta">
                      <div className="cpcard-meta-item jk">Next: <strong>{c.nextLesson}</strong></div>
                      <button className="continue-btn jk" onClick={e => { e.stopPropagation(); navigate(`/courses/${c.id}`); }}>
                        Continue →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── NOTES TAB ── */}
          {activeTab === "notes" && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Downloaded Notes</div>
              </div>
              <div className="card-body">
                {NOTES.map(n => (
                  <div className="note-row" key={n.id}>
                    <div className="note-icon-box">📄</div>
                    <div className="note-info">
                      <div className="note-name jk">{n.title}</div>
                      <div className="note-meta jk">{n.course} · {n.size} · {n.date}</div>
                    </div>
                    <button className="note-dl-btn jk">↓ Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROGRESS TAB ── */}
          {activeTab === "progress" && (
            <>
              <div className="stats-row" style={{ marginBottom: 20 }}>
                {[
                  { icon: "🎯", value: `${Math.round(totalProgress)}%`, label: "Overall Progress" },
                  { icon: "🔥", value: "5", label: "Day Streak" },
                  { icon: "⏱", value: "12h", label: "Total Study Time" },
                  { icon: "🏆", value: "0", label: "Certificates Earned" },
                ].map(s => (
                  <div className="stat-card" key={s.label}>
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label jk">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="card-header"><div className="card-title">Course Progress</div></div>
                {MY_COURSES.map(c => {
                  const pct = Math.round((c.doneLessons / c.totalLessons) * 100);
                  return (
                    <div className="course-progress-card" key={c.id}>
                      <div className="cpcard-top">
                        <div className="cpcard-emoji">{c.emoji}</div>
                        <div className="cpcard-info">
                          <div className="cpcard-title">{c.title}</div>
                          <div className="cpcard-subject jk">{c.subject}</div>
                        </div>
                        <div className="cpcard-pct jk">{pct}%</div>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="cpcard-meta">
                        <div className="cpcard-meta-item jk"><strong>{c.doneLessons}</strong> of <strong>{c.totalLessons}</strong> lessons done</div>
                        <div className="cpcard-meta-item jk">{c.totalLessons - c.doneLessons} lessons remaining</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── SUBSCRIPTION TAB ── */}
          {activeTab === "subscription" && (
            <div style={{ maxWidth: 480 }}>
              <div className="sub-card" style={{ marginBottom: 20 }}>
                <div className="sub-badge jk">Current Plan</div>
                <div className="sub-plan">{STUDENT.plan} Subscription</div>
                <div className="sub-expiry jk">Member since {STUDENT.joinedDate} · Expires {STUDENT.planExpiry}</div>
                <div className="sub-bar-bg"><div className="sub-bar-fill" /></div>
                <div className="sub-days jk">20 of 30 days used</div>
                <button className="renew-btn" style={{ marginTop: 16 }}>Renew — $9/month →</button>
              </div>
              <div className="card">
                <div className="card-header"><div className="card-title">Upgrade to Yearly</div></div>
                <div className="card-body">
                  <p className="jk" style={{ fontSize: 14, color: "rgba(242,237,228,0.55)", lineHeight: 1.7, marginBottom: 16 }}>Save 27% by switching to the yearly plan. Pay once and get full access for 12 months.</p>
                  <button className="renew-btn">Switch to Yearly — $48/year →</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}