import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALL_COURSES = [
  { id: 1, title: "Xisaabta Asaasiga", subject: "Mathematics", lessons: 12, duration: "6h 20m", level: "Beginner", price: 8, thumb: "📐", students: 142, rating: 4.8 },
  { id: 2, title: "Sayniska Dabiiciga", subject: "Science", lessons: 9, duration: "4h 45m", level: "Beginner", price: 8, thumb: "🔬", students: 98, rating: 4.7 },
  { id: 3, title: "Luuqadda Ingiriisiga", subject: "English", lessons: 15, duration: "8h 10m", level: "Intermediate", price: 8, thumb: "📖", students: 210, rating: 4.9 },
  { id: 4, title: "Taariikhda Soomaaliya", subject: "History", lessons: 10, duration: "5h 30m", level: "Beginner", price: 8, thumb: "🏛️", students: 87, rating: 4.6 },
  { id: 5, title: "Teknolojiyadda", subject: "Technology", lessons: 11, duration: "7h 00m", level: "Intermediate", price: 8, thumb: "💻", students: 176, rating: 4.8 },
  { id: 6, title: "Juqraafiyada Adduunka", subject: "Geography", lessons: 8, duration: "4h 15m", level: "Beginner", price: 8, thumb: "🌍", students: 63, rating: 4.5 },
  { id: 7, title: "Xisaabta Sare", subject: "Mathematics", lessons: 14, duration: "9h 40m", level: "Advanced", price: 8, thumb: "📊", students: 54, rating: 4.7 },
  { id: 8, title: "Cilmiga Bulshada", subject: "Social Studies", lessons: 8, duration: "4h 00m", level: "Beginner", price: 8, thumb: "🤝", students: 71, rating: 4.5 },
  { id: 9, title: "Barnaamijyada Computer-ka", subject: "Technology", lessons: 18, duration: "12h 30m", level: "Advanced", price: 8, thumb: "🖥️", students: 132, rating: 4.9 },
];

const SUBJECTS = ["All", "Mathematics", "Science", "English", "History", "Technology", "Geography", "Social Studies"];
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState("All");
  const [sort, setSort] = useState("popular");

  const filtered = ALL_COURSES
    .filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.subject.toLowerCase().includes(search.toLowerCase());
      const matchSubject = subject === "All" || c.subject === subject;
      const matchLevel = level === "All" || c.level === level;
      return matchSearch && matchSubject && matchLevel;
    })
    .sort((a, b) => {
      if (sort === "popular") return b.students - a.students;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "lessons") return b.lessons - a.lessons;
      return 0;
    });

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: "#F8F6F1", minHeight: "100vh", color: "#1C1917" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .fr { font-family: 'Fraunces', Georgia, serif; }

        /* Navbar */
        .nav {
          background: #1C1917; padding: 0 48px;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px; position: sticky; top: 0; z-index: 100;
        }
        .nav-logo { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: #F8F6F1; cursor: pointer; }
        .nav-logo span { color: #D4A84B; font-style: italic; }
        .nav-right { display: flex; align-items: center; gap: 16px; }
        .nav-link { font-size: 13px; font-weight: 500; color: rgba(248,246,241,0.55); background: none; border: none; cursor: pointer; transition: color 0.2s; padding: 0; }
        .nav-link:hover { color: #F8F6F1; }
        .nav-btn { font-size: 13px; font-weight: 600; background: #D4A84B; color: #1C1917; border: none; padding: 9px 22px; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
        .nav-btn:hover { background: #E8BC5F; }

        /* Hero bar */
        .hero-bar {
          background: linear-gradient(135deg, #1C1917 0%, #2D2825 100%);
          padding: 56px 48px 48px;
          position: relative; overflow: hidden;
        }
        .hero-bar::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,168,75,0.1) 0%, transparent 65%);
        }
        .hero-bar-inner { max-width: 1200px; margin: 0 auto; position: relative; }
        .hero-label { font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #D4A84B; margin-bottom: 12px; }
        .hero-title { font-family: 'Fraunces', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 700; color: #F8F6F1; line-height: 1.1; letter-spacing: -1px; margin-bottom: 8px; }
        .hero-title em { color: #D4A84B; font-style: italic; }
        .hero-sub { font-size: 15px; font-weight: 300; color: rgba(248,246,241,0.5); }

        /* Search + filters */
        .filters-bar {
          background: #FFFFFF;
          border-bottom: 1px solid #EAE6DF;
          padding: 20px 48px;
          position: sticky; top: 64px; z-index: 90;
        }
        .filters-inner { max-width: 1200px; margin: 0 auto; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }

        .search-wrap { position: relative; flex: 1; min-width: 220px; }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 15px; pointer-events: none; }
        .search-input {
          width: 100%; padding: 10px 16px 10px 40px;
          font-family: 'Sora', sans-serif; font-size: 14px;
          background: #F8F6F1; border: 1.5px solid #EAE6DF;
          border-radius: 8px; color: #1C1917; outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: #1C1917; }
        .search-input::placeholder { color: #B0A99E; }

        .filter-select {
          font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 500;
          padding: 10px 14px; background: #F8F6F1;
          border: 1.5px solid #EAE6DF; border-radius: 8px;
          color: #1C1917; outline: none; cursor: pointer;
          transition: border-color 0.2s;
        }
        .filter-select:focus { border-color: #1C1917; }

        .filter-chip {
          font-size: 13px; font-weight: 500; padding: 9px 16px;
          border-radius: 8px; border: 1.5px solid #EAE6DF;
          background: #F8F6F1; color: #5A5550; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
        }
        .filter-chip.active { background: #1C1917; color: #F8F6F1; border-color: #1C1917; }
        .filter-chip:hover:not(.active) { border-color: #1C1917; }

        .results-count { font-size: 13px; color: #8A847E; margin-left: auto; white-space: nowrap; }

        /* Main content */
        .main { max-width: 1200px; margin: 0 auto; padding: 40px 48px; }

        /* Course grid */
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

        .course-card {
          background: #FFFFFF; border-radius: 12px;
          border: 1px solid #EAE6DF;
          overflow: hidden; cursor: pointer;
          transition: all 0.3s ease;
          display: flex; flex-direction: column;
        }
        .course-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(28,25,23,0.12); border-color: transparent; }

        .card-top {
          padding: 28px 28px 20px;
          background: linear-gradient(135deg, #1C1917 0%, #2D2825 100%);
          position: relative; overflow: hidden;
        }
        .card-top::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(212,168,75,0.15) 0%, transparent 60%);
        }
        .card-thumb { font-size: 40px; position: relative; z-index: 1; margin-bottom: 12px; }
        .card-subject {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: #D4A84B;
          position: relative; z-index: 1;
        }
        .card-level {
          position: absolute; top: 16px; right: 16px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.5px;
          padding: 4px 10px; border-radius: 20px;
          z-index: 1;
        }
        .level-beginner { background: rgba(77,201,138,0.2); color: #4DC98A; }
        .level-intermediate { background: rgba(212,168,75,0.2); color: #D4A84B; }
        .level-advanced { background: rgba(217,79,79,0.2); color: #D94F4F; }

        .card-body { padding: 20px 28px 24px; flex: 1; display: flex; flex-direction: column; }
        .card-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #1C1917; margin-bottom: 16px; line-height: 1.25; }

        .card-stats { display: flex; gap: 16px; margin-bottom: 20px; }
        .card-stat { font-size: 12px; color: #8A847E; display: flex; align-items: center; gap: 4px; }
        .card-stat strong { color: #1C1917; font-weight: 600; }

        .card-rating { display: flex; align-items: center; gap: 6px; margin-bottom: 20px; }
        .stars { color: #D4A84B; font-size: 13px; letter-spacing: 1px; }
        .rating-val { font-size: 13px; font-weight: 700; color: #1C1917; }
        .rating-count { font-size: 12px; color: #8A847E; }

        .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 16px; border-top: 1px solid #EAE6DF; }
        .card-price { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; color: #1C1917; }
        .card-price span { font-size: 13px; font-weight: 400; color: #8A847E; font-family: 'Sora', sans-serif; }
        .card-btn {
          font-size: 13px; font-weight: 600; padding: 10px 20px;
          background: #1C1917; color: #F8F6F1; border: none;
          border-radius: 8px; cursor: pointer; transition: all 0.2s;
        }
        .card-btn:hover { background: #D4A84B; color: #1C1917; }

        /* Empty state */
        .empty { text-align: center; padding: 80px 24px; }
        .empty-icon { font-size: 48px; margin-bottom: 16px; }
        .empty-title { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; color: #1C1917; margin-bottom: 8px; }
        .empty-sub { font-size: 14px; color: #8A847E; }

        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .hero-bar { padding: 40px 20px 32px; }
          .filters-bar { padding: 16px 20px; }
          .main { padding: 24px 20px; }
          .courses-grid { grid-template-columns: 1fr; }
          .filters-inner { gap: 8px; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="nav">
        <div className="nav-logo fr" onClick={() => navigate('/')}>Aqoon<span>.so</span></div>
        <div className="nav-right">
          <button className="nav-link" onClick={() => navigate('/')}>Home</button>
          <button className="nav-link" onClick={() => navigate('/login')}>Sign In</button>
          <button className="nav-btn" onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Bar */}
      <div className="hero-bar">
        <div className="hero-bar-inner">
          <div className="hero-label">Course Library</div>
          <h1 className="hero-title fr">Browse all <em>courses</em></h1>
          <p className="hero-sub">{ALL_COURSES.length} courses · Video lessons · Downloadable notes</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="filters-inner">
          {/* Search */}
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Subject filter */}
          <select className="filter-select" value={subject} onChange={e => setSubject(e.target.value)}>
            {SUBJECTS.map(s => <option key={s} value={s}>{s === "All" ? "All Subjects" : s}</option>)}
          </select>

          {/* Level chips */}
          {LEVELS.map(l => (
            <button
              key={l}
              className={`filter-chip${level === l ? " active" : ""}`}
              onClick={() => setLevel(l)}
            >
              {l === "All" ? "All Levels" : l}
            </button>
          ))}

          {/* Sort */}
          <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="lessons">Most Lessons</option>
          </select>

          <span className="results-count">{filtered.length} courses</span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="main">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-title fr">No courses found</div>
            <div className="empty-sub">Try adjusting your search or filters</div>
          </div>
        ) : (
          <div className="courses-grid">
            {filtered.map((c, i) => (
              <div
                className="course-card"
                key={c.id}
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => navigate(`/courses/${c.id}`)}
              >
                {/* Card Top */}
                <div className="card-top">
                  <div className={`card-level ${
                    c.level === "Beginner" ? "level-beginner" :
                    c.level === "Intermediate" ? "level-intermediate" :
                    "level-advanced"
                  }`}>{c.level}</div>
                  <div className="card-thumb">{c.thumb}</div>
                  <div className="card-subject">{c.subject}</div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="card-title fr">{c.title}</div>

                  <div className="card-stats">
                    <div className="card-stat">📹 <strong>{c.lessons}</strong> lessons</div>
                    <div className="card-stat">⏱ <strong>{c.duration}</strong></div>
                    <div className="card-stat">👥 <strong>{c.students}</strong></div>
                  </div>

                  <div className="card-rating">
                    <span className="stars">{"★".repeat(Math.floor(c.rating))}{"☆".repeat(5 - Math.floor(c.rating))}</span>
                    <span className="rating-val">{c.rating}</span>
                    <span className="rating-count">({c.students} students)</span>
                  </div>

                  <div className="card-footer">
                    <div className="card-price fr">
                      ${c.price} <span>/ course</span>
                    </div>
                    <button
                      className="card-btn"
                      onClick={e => { e.stopPropagation(); navigate(`/courses/${c.id}`); }}
                    >
                      View Course →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}