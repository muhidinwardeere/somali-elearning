import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Mock Data ──
const STATS = [
  { icon: "👥", label: "Total Students", value: "1,284", change: "+48 this month", up: true },
  { icon: "📚", label: "Total Courses", value: "9", change: "+2 this month", up: true },
  { icon: "💰", label: "Total Revenue", value: "$4,820", change: "+$620 this month", up: true },
  { icon: "🟡", label: "Active Subscriptions", value: "847", change: "+31 this week", up: true },
];

const STUDENTS = [
  { id: 1, name: "Faadumo Cali", email: "faadumo@gmail.com", plan: "Monthly", joined: "Oct 28, 2024", status: "active", courses: 2 },
  { id: 2, name: "Cabdi Warsame", email: "cabdi@gmail.com", plan: "Yearly", joined: "Oct 25, 2024", status: "active", courses: 4 },
  { id: 3, name: "Hodan Maxamed", email: "hodan@gmail.com", plan: "Per Course", joined: "Oct 22, 2024", status: "active", courses: 1 },
  { id: 4, name: "Xasan Nuur", email: "xasan@gmail.com", plan: "Monthly", joined: "Oct 20, 2024", status: "inactive", courses: 0 },
  { id: 5, name: "Sahra Ahmed", email: "sahra@gmail.com", plan: "Yearly", joined: "Oct 18, 2024", status: "active", courses: 3 },
  { id: 6, name: "Bile Osman", email: "bile@gmail.com", plan: "Monthly", joined: "Oct 15, 2024", status: "active", courses: 2 },
];

const COURSES = [
  { id: 1, emoji: "📐", title: "Xisaabta Asaasiga", subject: "Mathematics", lessons: 12, students: 142, published: true },
  { id: 2, emoji: "🔬", title: "Sayniska Dabiiciga", subject: "Science", lessons: 9, students: 98, published: true },
  { id: 3, emoji: "📖", title: "Luuqadda Ingiriisiga", subject: "English", lessons: 15, students: 210, published: true },
  { id: 4, emoji: "🏛️", title: "Taariikhda Soomaaliya", subject: "History", lessons: 10, students: 87, published: true },
  { id: 5, emoji: "💻", title: "Teknolojiyadda", subject: "Technology", lessons: 11, students: 176, published: true },
  { id: 6, emoji: "🌍", title: "Juqraafiyada Adduunka", subject: "Geography", lessons: 8, students: 63, published: false },
];

const PAYMENTS = [
  { id: 1, student: "Faadumo Cali", method: "EVC Plus", plan: "Monthly", amount: 9, date: "Oct 28, 2024", status: "success" },
  { id: 2, student: "Cabdi Warsame", method: "E-Dahab", plan: "Yearly", amount: 48, date: "Oct 25, 2024", status: "success" },
  { id: 3, student: "Hodan Maxamed", method: "Waafi", plan: "Per Course", amount: 8, date: "Oct 22, 2024", status: "success" },
  { id: 4, student: "Xasan Nuur", method: "EVC Plus", plan: "Monthly", amount: 9, date: "Oct 20, 2024", status: "failed" },
  { id: 5, student: "Sahra Ahmed", method: "E-Dahab", plan: "Yearly", amount: 48, date: "Oct 18, 2024", status: "success" },
  { id: 6, student: "Bile Osman", method: "EVC Plus", plan: "Monthly", amount: 9, date: "Oct 15, 2024", status: "success" },
];

const METHOD_COLOR = { "EVC Plus": "#E63946", "E-Dahab": "#F4A261", "Waafi": "#2EC4B6" };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [studentSearch, setStudentSearch] = useState("");
  const [students, setStudents] = useState(STUDENTS);
  const [courses, setCourses] = useState(COURSES);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ emoji: "📚", title: "", subject: "" });
  const [notification, setNotification] = useState(null);

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleStudent = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s));
    showNotif("Student status updated");
  };

  const toggleCourse = (id) => {
    setCourses(courses.map(c => c.id === id ? { ...c, published: !c.published } : c));
    showNotif("Course status updated");
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    showNotif("Course deleted", "danger");
  };

  const addCourse = () => {
    if (!newCourse.title || !newCourse.subject) return;
    setCourses([...courses, { id: Date.now(), ...newCourse, lessons: 0, students: 0, published: false }]);
    setNewCourse({ emoji: "📚", title: "", subject: "" });
    setShowAddCourse(false);
    showNotif("Course added successfully");
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", background: "#0A0D12", minHeight: "100vh", color: "#E8E2D9", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ins { font-family: 'Instrument Serif', serif; }

        /* Sidebar */
        .sidebar { width: 240px; min-height: 100vh; background: #0F1318; border-right: 1px solid rgba(232,226,217,0.06); display: flex; flex-direction: column; position: fixed; left: 0; top: 0; bottom: 0; z-index: 50; }
        .sidebar-logo { padding: 24px 20px; border-bottom: 1px solid rgba(232,226,217,0.06); }
        .logo { font-family: 'Instrument Serif', serif; font-size: 22px; color: #E8E2D9; cursor: pointer; }
        .logo span { color: #C8963C; font-style: italic; }
        .logo-badge { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #C8963C; background: rgba(200,150,60,0.12); border: 1px solid rgba(200,150,60,0.2); padding: 3px 8px; border-radius: 6px; margin-top: 6px; display: inline-block; }

        .sidebar-nav { flex: 1; padding: 12px 10px; }
        .nav-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,226,217,0.25); padding: 0 10px; margin: 14px 0 6px; }
        .nav-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 10px; border-radius: 8px; border: none; background: none; cursor: pointer; font-family: 'Bricolage Grotesque', sans-serif; font-size: 13px; font-weight: 500; color: rgba(232,226,217,0.45); transition: all 0.2s; text-align: left; }
        .nav-btn:hover { background: rgba(232,226,217,0.05); color: #E8E2D9; }
        .nav-btn.active { background: rgba(200,150,60,0.1); color: #C8963C; }
        .nav-btn-icon { font-size: 15px; width: 18px; text-align: center; }
        .nav-badge { margin-left: auto; font-size: 10px; font-weight: 800; background: #C8963C; color: #0A0D12; padding: 1px 6px; border-radius: 8px; }

        .sidebar-footer { padding: 12px 10px; border-top: 1px solid rgba(232,226,217,0.06); }
        .logout-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 10px; border-radius: 8px; border: none; background: none; cursor: pointer; font-family: 'Bricolage Grotesque', sans-serif; font-size: 13px; font-weight: 500; color: rgba(232,226,217,0.35); transition: all 0.2s; }
        .logout-btn:hover { background: rgba(230,57,70,0.08); color: #E63946; }

        /* Main */
        .main { margin-left: 240px; flex: 1; min-height: 100vh; }

        /* Topbar */
        .topbar { height: 58px; background: #0F1318; border-bottom: 1px solid rgba(232,226,217,0.06); padding: 0 36px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 40; }
        .topbar-title { font-family: 'Instrument Serif', serif; font-size: 20px; color: #E8E2D9; }
        .topbar-title em { color: #C8963C; font-style: italic; }
        .topbar-right { display: flex; align-items: center; gap: 10px; }
        .topbar-admin { font-size: 12px; font-weight: 600; color: rgba(232,226,217,0.4); background: rgba(232,226,217,0.05); border: 1px solid rgba(232,226,217,0.08); padding: 6px 14px; border-radius: 8px; }
        .add-btn { font-size: 13px; font-weight: 700; background: #C8963C; color: #0A0D12; border: none; padding: 8px 18px; border-radius: 8px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
        .add-btn:hover { background: #DBA84E; }

        /* Content */
        .content { padding: 32px 36px; }

        /* Notification */
        .notif { position: fixed; top: 20px; right: 20px; z-index: 200; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; animation: slideIn 0.3s ease; }
        .notif.success { background: #2EC4B6; color: #0A0D12; }
        .notif.danger { background: #E63946; color: #fff; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

        /* Tabs */
        .tabs { display: flex; gap: 4px; background: rgba(232,226,217,0.04); border-radius: 10px; padding: 5px; width: fit-content; margin-bottom: 28px; }
        .tab { font-size: 13px; font-weight: 600; padding: 8px 18px; border-radius: 7px; border: none; cursor: pointer; transition: all 0.2s; color: rgba(232,226,217,0.4); background: none; }
        .tab.active { background: #0F1318; color: #E8E2D9; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
        .tab:hover:not(.active) { color: rgba(232,226,217,0.7); }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
        .stat { background: #0F1318; border: 1px solid rgba(232,226,217,0.06); border-radius: 12px; padding: 20px; transition: border-color 0.2s; position: relative; overflow: hidden; }
        .stat::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(200,150,60,0.6), transparent); opacity: 0; transition: opacity 0.3s; }
        .stat:hover { border-color: rgba(200,150,60,0.2); }
        .stat:hover::after { opacity: 1; }
        .stat-icon { font-size: 22px; margin-bottom: 10px; }
        .stat-val { font-family: 'Instrument Serif', serif; font-size: 32px; color: #E8E2D9; letter-spacing: -1px; margin-bottom: 4px; }
        .stat-label { font-size: 12px; color: rgba(232,226,217,0.35); font-weight: 500; margin-bottom: 8px; }
        .stat-change { font-size: 11px; font-weight: 700; color: #2EC4B6; }

        /* Grid layouts */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }

        /* Cards */
        .card { background: #0F1318; border: 1px solid rgba(232,226,217,0.06); border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
        .card-head { padding: 16px 22px; border-bottom: 1px solid rgba(232,226,217,0.05); display: flex; align-items: center; justify-content: space-between; }
        .card-title { font-size: 14px; font-weight: 700; color: #E8E2D9; }
        .card-action { font-size: 12px; font-weight: 600; color: #C8963C; background: none; border: none; cursor: pointer; }
        .card-action:hover { opacity: 0.7; }

        /* Table */
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(232,226,217,0.3); padding: 12px 20px; text-align: left; border-bottom: 1px solid rgba(232,226,217,0.05); }
        td { font-size: 13px; color: rgba(232,226,217,0.75); padding: 14px 20px; border-bottom: 1px solid rgba(232,226,217,0.03); vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(232,226,217,0.02); }

        .avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #C8963C, #A87830); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #0A0D12; flex-shrink: 0; }
        .student-cell { display: flex; align-items: center; gap: 10px; }
        .student-name { font-size: 13px; font-weight: 600; color: #E8E2D9; }
        .student-email { font-size: 11px; color: rgba(232,226,217,0.3); }

        .status-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 20px; }
        .status-active { background: rgba(46,196,182,0.12); color: #2EC4B6; border: 1px solid rgba(46,196,182,0.2); }
        .status-inactive { background: rgba(232,226,217,0.06); color: rgba(232,226,217,0.35); border: 1px solid rgba(232,226,217,0.08); }
        .status-success { background: rgba(46,196,182,0.12); color: #2EC4B6; border: 1px solid rgba(46,196,182,0.2); }
        .status-failed { background: rgba(230,57,70,0.1); color: #E63946; border: 1px solid rgba(230,57,70,0.2); }
        .status-published { background: rgba(46,196,182,0.12); color: #2EC4B6; border: 1px solid rgba(46,196,182,0.2); }
        .status-draft { background: rgba(232,226,217,0.06); color: rgba(232,226,217,0.35); border: 1px solid rgba(232,226,217,0.08); }

        .plan-tag { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; background: rgba(200,150,60,0.1); color: #C8963C; border: 1px solid rgba(200,150,60,0.15); }
        .method-tag { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }

        .action-btn { font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 6px; border: none; cursor: pointer; transition: all 0.2s; }
        .action-toggle { background: rgba(232,226,217,0.06); color: rgba(232,226,217,0.6); }
        .action-toggle:hover { background: rgba(232,226,217,0.1); color: #E8E2D9; }
        .action-delete { background: rgba(230,57,70,0.08); color: #E63946; }
        .action-delete:hover { background: rgba(230,57,70,0.15); }
        .action-edit { background: rgba(200,150,60,0.1); color: #C8963C; }
        .action-edit:hover { background: rgba(200,150,60,0.2); }

        /* Search */
        .search-bar { width: 100%; padding: 10px 16px; background: rgba(232,226,217,0.05); border: 1.5px solid rgba(232,226,217,0.08); border-radius: 8px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 13px; color: #E8E2D9; outline: none; margin-bottom: 16px; transition: border-color 0.2s; }
        .search-bar:focus { border-color: #C8963C; }
        .search-bar::placeholder { color: rgba(232,226,217,0.2); }

        /* Course emoji grid */
        .emoji-grid { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
        .emoji-opt { font-size: 22px; width: 40px; height: 40px; border-radius: 8px; border: 1.5px solid rgba(232,226,217,0.08); background: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .emoji-opt.selected { border-color: #C8963C; background: rgba(200,150,60,0.1); }
        .emoji-opt:hover { border-color: rgba(232,226,217,0.2); }

        /* Add course modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(10,13,18,0.85); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: #0F1318; border: 1px solid rgba(232,226,217,0.1); border-radius: 16px; padding: 32px; width: 100%; max-width: 440px; animation: fadeUp 0.3s ease; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .modal-title { font-family: 'Instrument Serif', serif; font-size: 22px; color: #E8E2D9; margin-bottom: 24px; }
        .modal-field { margin-bottom: 16px; }
        .modal-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: rgba(232,226,217,0.35); margin-bottom: 8px; display: block; }
        .modal-input { width: 100%; padding: 12px 14px; background: rgba(232,226,217,0.05); border: 1.5px solid rgba(232,226,217,0.08); border-radius: 8px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 14px; color: #E8E2D9; outline: none; transition: border-color 0.2s; }
        .modal-input:focus { border-color: #C8963C; }
        .modal-input::placeholder { color: rgba(232,226,217,0.2); }
        .modal-btns { display: flex; gap: 10px; margin-top: 24px; }
        .modal-save { flex: 1; padding: 13px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 14px; font-weight: 700; background: #C8963C; color: #0A0D12; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .modal-save:hover { background: #DBA84E; }
        .modal-cancel { flex: 1; padding: 13px; font-family: 'Bricolage Grotesque', sans-serif; font-size: 14px; font-weight: 600; background: rgba(232,226,217,0.05); color: rgba(232,226,217,0.5); border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .modal-cancel:hover { background: rgba(232,226,217,0.08); color: #E8E2D9; }

        /* Revenue breakdown */
        .rev-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(232,226,217,0.04); }
        .rev-row:last-child { border-bottom: none; }
        .rev-bar-wrap { flex: 1; height: 6px; background: rgba(232,226,217,0.06); border-radius: 3px; overflow: hidden; }
        .rev-bar { height: 100%; border-radius: 3px; transition: width 1s ease; }
        .rev-label { font-size: 13px; font-weight: 600; color: rgba(232,226,217,0.7); width: 80px; }
        .rev-amount { font-size: 13px; font-weight: 700; color: #E8E2D9; width: 60px; text-align: right; }

        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .grid-2 { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .sidebar { display: none; } .main { margin-left: 0; } .content { padding: 20px; } .topbar { padding: 0 20px; } }
      `}</style>

      {/* Notification */}
      {notification && (
        <div className={`notif ${notification.type}`}>{notification.msg}</div>
      )}

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title ins">Add New Course</div>
            <div className="modal-field">
              <label className="modal-label">Choose Icon</label>
              <div className="emoji-grid">
                {["📐", "🔬", "📖", "🏛️", "💻", "🌍", "📊", "🤝", "🖥️", "🎨", "🧮", "🌱"].map(e => (
                  <button key={e} className={`emoji-opt${newCourse.emoji === e ? " selected" : ""}`} onClick={() => setNewCourse({ ...newCourse, emoji: e })}>{e}</button>
                ))}
              </div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Course Title</label>
              <input className="modal-input" placeholder="e.g. Xisaabta Asaasiga" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} />
            </div>
            <div className="modal-field">
              <label className="modal-label">Subject</label>
              <input className="modal-input" placeholder="e.g. Mathematics" value={newCourse.subject} onChange={e => setNewCourse({ ...newCourse, subject: e.target.value })} />
            </div>
            <div className="modal-btns">
              <button className="modal-save" onClick={addCourse}>Add Course</button>
              <button className="modal-cancel" onClick={() => setShowAddCourse(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo ins" onClick={() => navigate('/')}>Aqoon<span>.so</span></div>
          <div className="logo-badge">Admin Panel</div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-label">Dashboard</div>
          {[
            { icon: "🏠", label: "Overview", tab: "overview" },
            { icon: "👥", label: "Students", tab: "students", badge: students.length },
            { icon: "📚", label: "Courses", tab: "courses", badge: courses.length },
            { icon: "💳", label: "Payments", tab: "payments" },
            { icon: "📊", label: "Reports", tab: "reports" },
          ].map(item => (
            <button key={item.tab} className={`nav-btn${activeTab === item.tab ? " active" : ""}`} onClick={() => setActiveTab(item.tab)}>
              <span className="nav-btn-icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate('/')}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        <div className="topbar">
          <div className="topbar-title ins">
            {activeTab === "overview" && <>Admin <em>Overview</em></>}
            {activeTab === "students" && <>Manage <em>Students</em></>}
            {activeTab === "courses" && <>Manage <em>Courses</em></>}
            {activeTab === "payments" && <>Payment <em>Reports</em></>}
            {activeTab === "reports" && <>Revenue <em>Reports</em></>}
          </div>
          <div className="topbar-right">
            <span className="topbar-admin">admin@aqoon.so</span>
            {activeTab === "courses" && (
              <button className="add-btn" onClick={() => setShowAddCourse(true)}>+ Add Course</button>
            )}
          </div>
        </div>

        <div className="content">
          {/* Tabs */}
          <div className="tabs">
            {["overview", "students", "courses", "payments", "reports"].map(t => (
              <button key={t} className={`tab${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <>
              <div className="stats-grid">
                {STATS.map(s => (
                  <div className="stat" key={s.label}>
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-val ins">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-change">{s.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid-2">
                {/* Recent students */}
                <div className="card">
                  <div className="card-head">
                    <div className="card-title">Recent Students</div>
                    <button className="card-action" onClick={() => setActiveTab("students")}>View all →</button>
                  </div>
                  <div className="table-wrap">
                    <table>
                      <thead><tr><th>Student</th><th>Plan</th><th>Status</th></tr></thead>
                      <tbody>
                        {STUDENTS.slice(0, 4).map(s => (
                          <tr key={s.id}>
                            <td>
                              <div className="student-cell">
                                <div className="avatar">{s.name[0]}</div>
                                <div>
                                  <div className="student-name">{s.name}</div>
                                  <div className="student-email">{s.email}</div>
                                </div>
                              </div>
                            </td>
                            <td><span className="plan-tag">{s.plan}</span></td>
                            <td><span className={`status-badge status-${s.status}`}>{s.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent payments */}
                <div className="card">
                  <div className="card-head">
                    <div className="card-title">Recent Payments</div>
                    <button className="card-action" onClick={() => setActiveTab("payments")}>View all →</button>
                  </div>
                  <div className="table-wrap">
                    <table>
                      <thead><tr><th>Student</th><th>Amount</th><th>Status</th></tr></thead>
                      <tbody>
                        {PAYMENTS.slice(0, 4).map(p => (
                          <tr key={p.id}>
                            <td>
                              <div className="student-name">{p.student}</div>
                              <div className="student-email">{p.method}</div>
                            </td>
                            <td><span style={{ fontWeight: 700, color: "#C8963C" }}>${p.amount}</span></td>
                            <td><span className={`status-badge status-${p.status}`}>{p.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Revenue by method */}
              <div className="card">
                <div className="card-head"><div className="card-title">Revenue by Payment Method</div></div>
                <div style={{ padding: "16px 22px" }}>
                  {[
                    { method: "EVC Plus", amount: 2340, color: "#E63946", pct: 49 },
                    { method: "E-Dahab", amount: 1560, color: "#F4A261", pct: 32 },
                    { method: "Waafi", amount: 920, color: "#2EC4B6", pct: 19 },
                  ].map(r => (
                    <div className="rev-row" key={r.method}>
                      <span className="rev-label">{r.method}</span>
                      <div className="rev-bar-wrap">
                        <div className="rev-bar" style={{ width: `${r.pct}%`, background: r.color }} />
                      </div>
                      <span className="rev-amount">${r.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── STUDENTS ── */}
          {activeTab === "students" && (
            <div className="card">
              <div className="card-head">
                <div className="card-title">All Students ({filteredStudents.length})</div>
              </div>
              <div style={{ padding: "16px 22px 0" }}>
                <input className="search-bar" placeholder="🔍  Search by name or email..." value={studentSearch} onChange={e => setStudentSearch(e.target.value)} />
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Student</th><th>Plan</th><th>Courses</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {filteredStudents.map(s => (
                      <tr key={s.id}>
                        <td>
                          <div className="student-cell">
                            <div className="avatar">{s.name[0]}</div>
                            <div>
                              <div className="student-name">{s.name}</div>
                              <div className="student-email">{s.email}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="plan-tag">{s.plan}</span></td>
                        <td>{s.courses}</td>
                        <td style={{ color: "rgba(232,226,217,0.4)" }}>{s.joined}</td>
                        <td><span className={`status-badge status-${s.status}`}>{s.status}</span></td>
                        <td>
                          <button className="action-btn action-toggle" onClick={() => toggleStudent(s.id)}>
                            {s.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── COURSES ── */}
          {activeTab === "courses" && (
            <div className="card">
              <div className="card-head">
                <div className="card-title">All Courses ({courses.length})</div>
                <button className="add-btn" onClick={() => setShowAddCourse(true)}>+ Add Course</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Course</th><th>Subject</th><th>Lessons</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {courses.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div className="student-cell">
                            <span style={{ fontSize: 24 }}>{c.emoji}</span>
                            <div className="student-name">{c.title}</div>
                          </div>
                        </td>
                        <td style={{ color: "rgba(232,226,217,0.5)" }}>{c.subject}</td>
                        <td>{c.lessons}</td>
                        <td>{c.students}</td>
                        <td><span className={`status-badge status-${c.published ? "published" : "draft"}`}>{c.published ? "Published" : "Draft"}</span></td>
                        <td>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="action-btn action-edit">Edit</button>
                            <button className="action-btn action-toggle" onClick={() => toggleCourse(c.id)}>
                              {c.published ? "Unpublish" : "Publish"}
                            </button>
                            <button className="action-btn action-delete" onClick={() => deleteCourse(c.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PAYMENTS ── */}
          {activeTab === "payments" && (
            <div className="card">
              <div className="card-head">
                <div className="card-title">All Transactions ({PAYMENTS.length})</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#C8963C" }}>
                  Total: ${PAYMENTS.filter(p => p.status === "success").reduce((a, p) => a + p.amount, 0)}
                </div>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Student</th><th>Method</th><th>Plan</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {PAYMENTS.map(p => (
                      <tr key={p.id}>
                        <td><div className="student-name">{p.student}</div></td>
                        <td>
                          <span className="method-tag" style={{ background: `${METHOD_COLOR[p.method]}18`, color: METHOD_COLOR[p.method], border: `1px solid ${METHOD_COLOR[p.method]}30` }}>
                            {p.method}
                          </span>
                        </td>
                        <td><span className="plan-tag">{p.plan}</span></td>
                        <td style={{ fontWeight: 700, color: "#C8963C" }}>${p.amount}</td>
                        <td style={{ color: "rgba(232,226,217,0.4)" }}>{p.date}</td>
                        <td><span className={`status-badge status-${p.status}`}>{p.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── REPORTS ── */}
          {activeTab === "reports" && (
            <>
              <div className="stats-grid">
                {[
                  { icon: "💰", label: "Total Revenue", value: "$4,820" },
                  { icon: "✅", label: "Successful Payments", value: PAYMENTS.filter(p => p.status === "success").length },
                  { icon: "❌", label: "Failed Payments", value: PAYMENTS.filter(p => p.status === "failed").length },
                  { icon: "📈", label: "Avg. per Student", value: "$3.75" },
                ].map(s => (
                  <div className="stat" key={s.label}>
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-val ins">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="card-head"><div className="card-title">Revenue Breakdown by Method</div></div>
                <div style={{ padding: "20px 22px" }}>
                  {[
                    { method: "EVC Plus", amount: 2340, color: "#E63946", pct: 49, count: 260 },
                    { method: "E-Dahab", amount: 1560, color: "#F4A261", pct: 32, count: 174 },
                    { method: "Waafi", amount: 920, color: "#2EC4B6", pct: 19, count: 102 },
                  ].map(r => (
                    <div key={r.method} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#E8E2D9" }}>{r.method}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: r.color }}>${r.amount} · {r.count} payments</span>
                      </div>
                      <div className="rev-bar-wrap" style={{ height: 10, borderRadius: 5 }}>
                        <div className="rev-bar" style={{ width: `${r.pct}%`, background: r.color, height: 10, borderRadius: 5 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-head"><div className="card-title">Revenue by Plan</div></div>
                <div style={{ padding: "20px 22px" }}>
                  {[
                    { plan: "Yearly", amount: 2400, color: "#C8963C", pct: 50, count: 50 },
                    { plan: "Monthly", amount: 1980, color: "#9B72CF", pct: 41, count: 220 },
                    { plan: "Per Course", amount: 440, color: "#2EC4B6", pct: 9, count: 55 },
                  ].map(r => (
                    <div key={r.plan} style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#E8E2D9" }}>{r.plan}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: r.color }}>${r.amount} · {r.count} sales</span>
                      </div>
                      <div className="rev-bar-wrap" style={{ height: 10, borderRadius: 5 }}>
                        <div className="rev-bar" style={{ width: `${r.pct}%`, background: r.color, height: 10, borderRadius: 5 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}