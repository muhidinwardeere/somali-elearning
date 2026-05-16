import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav { background: #1A1A1A; height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 20px; color: #FAFAF8; cursor: pointer; }
        .nav-logo span { color: #E6A817; font-style: italic; }
        .nav-right { display: flex; gap: 16px; align-items: center; }
        .nav-link { font-size: 13px; font-weight: 600; color: rgba(250,250,248,0.6); background: none; border: none; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #FAFAF8; }
        .main { max-width: 1100px; margin: 0 auto; padding: 48px; }
        .welcome { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; margin-bottom: 8px; }
        .welcome em { color: #E6A817; font-style: italic; }
        .sub { font-size: 15px; color: #8A8580; margin-bottom: 40px; }
        .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: #FFFFFF; border: 1px solid #F0EDE8; border-radius: 12px; padding: 24px; }
        .stat-icon { font-size: 28px; margin-bottom: 12px; }
        .stat-value { font-size: 32px; font-weight: 800; color: #1A1A1A; letter-spacing: -1px; }
        .stat-label { font-size: 13px; color: #8A8580; margin-top: 4px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-bottom: 20px; }
        .course-row { display: flex; align-items: center; gap: 16px; background: #FFFFFF; border: 1px solid #F0EDE8; border-radius: 10px; padding: 16px 20px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; }
        .course-row:hover { border-color: #E6A817; transform: translateX(4px); }
        .course-emoji { font-size: 28px; }
        .course-info { flex: 1; }
        .course-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
        .progress-bar-bg { height: 6px; background: #F0EDE8; border-radius: 3px; }
        .progress-bar-fill { height: 6px; background: #E6A817; border-radius: 3px; transition: width 0.5s; }
        .progress-text { font-size: 12px; color: #8A8580; margin-top: 4px; }
        .browse-btn { font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700; background: #E6A817; color: #1A1A1A; border: none; padding: 12px 28px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .browse-btn:hover { background: #F5B820; transform: translateY(-1px); }
        @media (max-width: 768px) { .nav { padding: 0 20px; } .main { padding: 24px 20px; } }
      `}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate('/')}>Aqoon<span>.so</span></div>
        <div className="nav-right">
          <button className="nav-link" onClick={() => navigate('/courses')}>Browse Courses</button>
          <button className="nav-link" onClick={() => navigate('/')}>Logout</button>
        </div>
      </nav>

      <div className="main">
        <h1 className="welcome">Welcome back, <em>Student!</em></h1>
        <p className="sub">Continue your learning journey — you are doing great.</p>

        {/* Stats */}
        <div className="cards">
          {[
            { icon: "📚", value: "2", label: "Courses Enrolled" },
            { icon: "✅", value: "5", label: "Lessons Completed" },
            { icon: "⏱", value: "3h 20m", label: "Total Watch Time" },
            { icon: "📄", value: "4", label: "Notes Downloaded" },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* My Courses */}
        <div className="section-title">My Courses</div>
        {[
          { emoji: "📐", name: "Xisaabta Asaasiga", progress: 40, total: 12, done: 5, id: 1 },
          { emoji: "📖", name: "Luuqadda Ingiriisiga", progress: 20, total: 15, done: 3, id: 3 },
        ].map(c => (
          <div className="course-row" key={c.id} onClick={() => navigate(`/courses/${c.id}`)}>
            <span className="course-emoji">{c.emoji}</span>
            <div className="course-info">
              <div className="course-name">{c.name}</div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="progress-text">{c.done} of {c.total} lessons completed · {c.progress}%</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 32 }}>
          <div className="section-title">Discover More</div>
          <p style={{ fontSize: 14, color: "#8A8580", marginBottom: 20 }}>Browse all available courses and expand your knowledge.</p>
          <button className="browse-btn" onClick={() => navigate('/courses')}>Browse All Courses →</button>
        </div>
      </div>
    </div>
  );
}