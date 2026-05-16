import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const COURSES = {
  1: { id: 1, title: "Xisaabta Asaasiga", subject: "Mathematics", lessons: 12, duration: "6h 20m", level: "Beginner", price: 8, thumb: "📐", students: 142, rating: 4.8, instructor: "Maxamed Cali", about: "This course covers the fundamentals of mathematics including arithmetic, algebra, and geometry designed specifically for Somali students.", sections: [ { title: "Introduction to Numbers", lessons: [ { id: 1, title: "What are numbers?", duration: "12:30", free: true }, { id: 2, title: "Counting and ordering", duration: "15:00", free: true }, { id: 3, title: "Addition basics", duration: "18:45", free: false } ] }, { title: "Algebra Foundations", lessons: [ { id: 4, title: "Variables and expressions", duration: "20:10", free: false }, { id: 5, title: "Solving equations", duration: "22:00", free: false }, { id: 6, title: "Word problems", duration: "25:30", free: false } ] }, { title: "Geometry", lessons: [ { id: 7, title: "Shapes and angles", duration: "19:00", free: false }, { id: 8, title: "Perimeter and area", duration: "21:15", free: false }, { id: 9, title: "3D shapes", duration: "17:40", free: false } ] } ], notes: [ { id: 1, title: "Chapter 1 — Numbers", size: "1.2 MB" }, { id: 2, title: "Chapter 2 — Algebra", size: "0.9 MB" }, { id: 3, title: "Chapter 3 — Geometry", size: "1.5 MB" } ] },
  2: { id: 2, title: "Sayniska Dabiiciga", subject: "Science", lessons: 9, duration: "4h 45m", level: "Beginner", price: 8, thumb: "🔬", students: 98, rating: 4.7, instructor: "Fadumo Xasan", about: "Explore the natural world through biology, chemistry, and physics fundamentals tailored for Somali students.", sections: [ { title: "Biology Basics", lessons: [ { id: 1, title: "Living things", duration: "14:00", free: true }, { id: 2, title: "Plants and animals", duration: "16:30", free: false }, { id: 3, title: "Human body", duration: "20:00", free: false } ] }, { title: "Chemistry Introduction", lessons: [ { id: 4, title: "Matter and materials", duration: "18:00", free: false }, { id: 5, title: "Mixing substances", duration: "15:45", free: false } ] } ], notes: [ { id: 1, title: "Biology Notes", size: "1.0 MB" }, { id: 2, title: "Chemistry Notes", size: "0.8 MB" } ] },
  3: { id: 3, title: "Luuqadda Ingiriisiga", subject: "English", lessons: 15, duration: "8h 10m", level: "Intermediate", price: 8, thumb: "📖", students: 210, rating: 4.9, instructor: "Cabdi Warsame", about: "Master English language skills including grammar, vocabulary, reading and writing for everyday and academic use.", sections: [ { title: "Grammar Essentials", lessons: [ { id: 1, title: "Parts of speech", duration: "16:00", free: true }, { id: 2, title: "Sentence structure", duration: "18:30", free: true }, { id: 3, title: "Tenses", duration: "22:00", free: false } ] }, { title: "Vocabulary Building", lessons: [ { id: 4, title: "Common words", duration: "14:00", free: false }, { id: 5, title: "Synonyms and antonyms", duration: "15:30", free: false } ] } ], notes: [ { id: 1, title: "Grammar Guide", size: "2.1 MB" }, { id: 2, title: "Vocabulary List", size: "0.5 MB" } ] },
};

// Default course for unknown IDs
const DEFAULT_COURSE = COURSES[1];

export default function CourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const course = COURSES[id] || DEFAULT_COURSE;
  const [openSection, setOpenSection] = useState(0);
  const [activeTab, setActiveTab] = useState("lessons");

  const totalLessons = course.sections.reduce((a, s) => a + s.lessons.length, 0);
  const freeLessons = course.sections.reduce((a, s) => a + s.lessons.filter(l => l.free).length, 0);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .pf { font-family: 'Playfair Display', serif; }

        /* Nav */
        .nav { background: #1A1A1A; height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; position: sticky; top: 0; z-index: 100; }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 20px; color: #FAFAF8; cursor: pointer; }
        .nav-logo span { color: #E6A817; font-style: italic; }
        .nav-back { font-size: 13px; font-weight: 600; color: rgba(250,250,248,0.6); background: none; border: none; cursor: pointer; transition: color 0.2s; display: flex; align-items: center; gap: 6px; }
        .nav-back:hover { color: #FAFAF8; }

        /* Hero */
        .hero { background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%); padding: 48px; position: relative; overflow: hidden; }
        .hero::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 50% 80% at 90% 50%, rgba(230,168,23,0.1) 0%, transparent 65%); pointer-events: none; }
        .hero-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 340px; gap: 48px; align-items: start; position: relative; z-index: 1; }

        .hero-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #E6A817; background: rgba(230,168,23,0.12); border: 1px solid rgba(230,168,23,0.25); padding: 5px 12px; border-radius: 20px; margin-bottom: 16px; }
        .hero-thumb { font-size: 28px; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; color: #FAFAF8; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 16px; }
        .hero-desc { font-size: 15px; font-weight: 400; color: rgba(250,250,248,0.6); line-height: 1.7; margin-bottom: 24px; max-width: 560px; }

        .hero-meta { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 20px; }
        .meta-item { font-size: 13px; color: rgba(250,250,248,0.55); display: flex; align-items: center; gap: 6px; }
        .meta-item strong { color: #FAFAF8; font-weight: 600; }

        .rating-row { display: flex; align-items: center; gap: 8px; }
        .stars { color: #E6A817; font-size: 14px; letter-spacing: 1px; }
        .rating-num { font-size: 14px; font-weight: 700; color: #FAFAF8; }
        .rating-count { font-size: 13px; color: rgba(250,250,248,0.45); }

        .instructor-row { display: flex; align-items: center; gap: 10px; margin-top: 16px; }
        .instructor-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #E6A817, #C8860F); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #1A1A1A; }
        .instructor-info { font-size: 13px; color: rgba(250,250,248,0.55); }
        .instructor-info strong { color: #FAFAF8; font-weight: 600; display: block; }

        /* Sticky card */
        .sticky-card { background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.2); position: sticky; top: 76px; }
        .card-price-box { padding: 28px 28px 20px; border-bottom: 1px solid #F0EDE8; }
        .card-price { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: #1A1A1A; letter-spacing: -1px; }
        .card-price span { font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 400; color: #8A8580; }
        .card-free-tag { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #4DC98A; background: rgba(77,201,138,0.1); border: 1px solid rgba(77,201,138,0.2); padding: 3px 10px; border-radius: 20px; margin-left: 10px; }

        .enroll-btn { width: 100%; padding: 15px; font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 800; background: #E6A817; color: #1A1A1A; border: none; border-radius: 10px; cursor: pointer; margin-top: 16px; transition: all 0.2s; letter-spacing: 0.3px; }
        .enroll-btn:hover { background: #F5B820; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(230,168,23,0.3); }

        .card-includes { padding: 20px 28px; }
        .card-includes-title { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #8A8580; margin-bottom: 14px; }
        .include-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #4A4540; margin-bottom: 10px; }
        .include-icon { font-size: 16px; width: 24px; text-align: center; }

        /* Main content */
        .main { max-width: 1100px; margin: 0 auto; padding: 40px 48px; display: grid; grid-template-columns: 1fr 340px; gap: 48px; }
        .content-area { min-width: 0; }

        /* Tabs */
        .tabs { display: flex; gap: 0; border-bottom: 2px solid #F0EDE8; margin-bottom: 32px; }
        .tab { font-size: 14px; font-weight: 600; padding: 12px 20px; background: none; border: none; cursor: pointer; color: #8A8580; transition: all 0.2s; border-bottom: 2px solid transparent; margin-bottom: -2px; }
        .tab.active { color: #1A1A1A; border-bottom-color: #E6A817; }
        .tab:hover:not(.active) { color: #1A1A1A; }

        /* Lessons accordion */
        .section-block { border: 1px solid #F0EDE8; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
        .section-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; cursor: pointer; background: #FFFFFF; transition: background 0.2s; }
        .section-header:hover { background: #FAFAF8; }
        .section-title-text { font-size: 15px; font-weight: 700; color: #1A1A1A; }
        .section-meta { font-size: 12px; color: #8A8580; margin-top: 3px; }
        .section-chevron { font-size: 12px; color: #8A8580; transition: transform 0.3s; }
        .section-chevron.open { transform: rotate(180deg); }

        .lesson-list { border-top: 1px solid #F0EDE8; }
        .lesson-row { display: flex; align-items: center; gap: 14px; padding: 13px 20px; border-bottom: 1px solid #F8F5F0; transition: background 0.2s; cursor: pointer; }
        .lesson-row:last-child { border-bottom: none; }
        .lesson-row:hover { background: #FAFAF8; }
        .lesson-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .lesson-icon.free { background: rgba(77,201,138,0.1); }
        .lesson-icon.locked { background: rgba(138,133,128,0.1); }
        .lesson-title { font-size: 14px; font-weight: 500; color: #1A1A1A; flex: 1; }
        .lesson-badge { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #4DC98A; background: rgba(77,201,138,0.1); padding: 2px 8px; border-radius: 10px; }
        .lesson-duration { font-size: 12px; color: #8A8580; margin-left: auto; }

        /* Notes tab */
        .notes-grid { display: flex; flex-direction: column; gap: 12px; }
        .note-card { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: #FFFFFF; border: 1px solid #F0EDE8; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
        .note-card:hover { border-color: #E6A817; transform: translateX(4px); }
        .note-icon { width: 44px; height: 44px; border-radius: 10px; background: rgba(230,168,23,0.1); border: 1px solid rgba(230,168,23,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .note-info { flex: 1; }
        .note-title { font-size: 14px; font-weight: 700; color: #1A1A1A; margin-bottom: 3px; }
        .note-size { font-size: 12px; color: #8A8580; }
        .note-download { font-size: 12px; font-weight: 700; color: #E6A817; background: none; border: none; cursor: pointer; padding: 6px 14px; border-radius: 6px; background: rgba(230,168,23,0.1); transition: background 0.2s; }
        .note-download:hover { background: rgba(230,168,23,0.2); }

        /* About tab */
        .about-text { font-size: 15px; line-height: 1.8; color: #4A4540; }
        .about-text p { margin-bottom: 16px; }

        /* Right side spacer on main */
        .right-spacer { display: none; }

        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; }
          .sticky-card { position: static; }
          .main { grid-template-columns: 1fr; padding: 24px 20px; }
          .hero { padding: 32px 20px; }
          .nav { padding: 0 20px; }
        }
      `}</style>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo pf" onClick={() => navigate('/')}>Aqoon<span>.so</span></div>
        <button className="nav-back" onClick={() => navigate('/courses')}>
          ← Back to Courses
        </button>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hero-inner">
          {/* Left */}
          <div>
            <div className="hero-badge">
              <span className="hero-thumb">{course.thumb}</span>
              {course.subject}
            </div>
            <h1 className="hero-title pf">{course.title}</h1>
            <p className="hero-desc">{course.about}</p>

            <div className="hero-meta">
              <div className="meta-item">📹 <strong>{totalLessons}</strong> lessons</div>
              <div className="meta-item">⏱ <strong>{course.duration}</strong></div>
              <div className="meta-item">👥 <strong>{course.students}</strong> students</div>
              <div className="meta-item">📶 <strong>{course.level}</strong></div>
              <div className="meta-item">🆓 <strong>{freeLessons}</strong> free previews</div>
            </div>

            <div className="rating-row">
              <span className="stars">{"★".repeat(Math.floor(course.rating))}{"☆".repeat(5 - Math.floor(course.rating))}</span>
              <span className="rating-num">{course.rating}</span>
              <span className="rating-count">({course.students} students enrolled)</span>
            </div>

            <div className="instructor-row">
              <div className="instructor-avatar">{course.instructor[0]}</div>
              <div className="instructor-info">
                <strong>{course.instructor}</strong>
                Course Instructor
              </div>
            </div>
          </div>

          {/* Sticky Card */}
          <div className="sticky-card">
            <div className="card-price-box">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="card-price pf">${course.price}</span>
                <span style={{ marginLeft: 4, fontSize: 15, color: "#8A8580" }}> / course</span>
                <span className="card-free-tag">One-time</span>
              </div>
              <button className="enroll-btn" onClick={() => navigate('/login')}>
                Enroll Now →
              </button>
            </div>
            <div className="card-includes">
              <div className="card-includes-title">This course includes</div>
              {[
                { icon: "🎬", text: `${totalLessons} video lessons` },
                { icon: "📄", text: `${course.notes.length} downloadable notes` },
                { icon: "📱", text: "Access on mobile & desktop" },
                { icon: "♾️", text: "Lifetime access" },
                { icon: "🆓", text: `${freeLessons} free preview lessons` },
              ].map((item) => (
                <div className="include-row" key={item.text}>
                  <span className="include-icon">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="content-area">

          {/* Tabs */}
          <div className="tabs">
            {["lessons", "notes", "about"].map(tab => (
              <button
                key={tab}
                className={`tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "lessons" ? "📹 Lessons" : tab === "notes" ? "📄 Notes" : "ℹ️ About"}
              </button>
            ))}
          </div>

          {/* Lessons Tab */}
          {activeTab === "lessons" && (
            <div>
              {course.sections.map((section, si) => (
                <div className="section-block" key={si}>
                  <div className="section-header" onClick={() => setOpenSection(openSection === si ? -1 : si)}>
                    <div>
                      <div className="section-title-text">{section.title}</div>
                      <div className="section-meta">{section.lessons.length} lessons</div>
                    </div>
                    <span className={`section-chevron${openSection === si ? " open" : ""}`}>▼</span>
                  </div>
                  {openSection === si && (
                    <div className="lesson-list">
                      {section.lessons.map((lesson) => (
                        <div className="lesson-row" key={lesson.id} onClick={() => !lesson.free && navigate('/login')}>
                          <div className={`lesson-icon ${lesson.free ? "free" : "locked"}`}>
                            {lesson.free ? "▶️" : "🔒"}
                          </div>
                          <span className="lesson-title">{lesson.title}</span>
                          {lesson.free && <span className="lesson-badge">Free</span>}
                          <span className="lesson-duration">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <div className="notes-grid">
              {course.notes.map((note) => (
                <div className="note-card" key={note.id}>
                  <div className="note-icon">📄</div>
                  <div className="note-info">
                    <div className="note-title">{note.title}</div>
                    <div className="note-size">{note.size} · PDF</div>
                  </div>
                  <button className="note-download" onClick={() => navigate('/login')}>
                    Download
                  </button>
                </div>
              ))}
              <p style={{ fontSize: 13, color: "#8A8580", marginTop: 8 }}>
                🔒 Login and enroll to download all notes
              </p>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="about-text">
              <p>{course.about}</p>
              <p>This course is designed for Somali students who want to build strong foundational knowledge. All lessons are recorded in clear, easy-to-follow video format and optimized for slow internet connections.</p>
              <p>Upon completing the course you will receive a certificate of completion from Aqoon.so.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}