import React from "react";
import AssignmentTracker from "../Assignments/AssignmentTracker";
import "./Dashboard.css";

function Dashboard({ user, page, assignments, onNavigate, onLogout, onStatusChange, onAddAssignment }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const totalAssignments = assignments.length;
  const today = new Date();
  const weekFromNow = new Date(today);
  weekFromNow.setDate(today.getDate() + 7);

  const dueThisWeek = assignments.filter((assignment) => {
    const deadline = new Date(assignment.deadline);
    return deadline >= today && deadline <= weekFromNow;
  }).length;

  const statusSummary = assignments.reduce((summary, assignment) => {
    summary[assignment.status] = (summary[assignment.status] || 0) + 1;
    return summary;
  }, {});

  const recentActivity = [...assignments]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const renderContent = () => {
    if (page === "assignments") {
      return (
        <section className="page-panel assignments-panel">
          <AssignmentTracker
            assignments={assignments}
            onStatusChange={onStatusChange}
            onCreateAssignment={onAddAssignment}
          />
        </section>
      );
    }

    if (page === "overview") {
      return (
        <>
          <section className="page-panel overview-panel">
            <div className="panel-header">
              <div>
                <h2>Performance snapshot</h2>
                <p>All metrics are drawn from your current assignments in real time.</p>
              </div>
            </div>

            <div className="stat-grid">
              <article className="stat-card summary-card--brand">
                <span>Total assignments</span>
                <strong>{totalAssignments}</strong>
              </article>

              <article className="stat-card">
                <span>Due this week</span>
                <strong>{dueThisWeek}</strong>
              </article>

              <article className="stat-card">
                <span>Submitted</span>
                <strong>{statusSummary.Submitted || 0}</strong>
              </article>

              <article className="stat-card">
                <span>In progress</span>
                <strong>{statusSummary["In Progress"] || 0}</strong>
              </article>
            </div>
          </section>

          <section className="page-panel activity-panel">
            <div className="activity-card__header">
              <h3>Upcoming deadlines</h3>
            </div>
            <ul className="activity-list">
              {recentActivity.map((assignment) => (
                <li key={assignment.id}>
                  <strong>{assignment.title}</strong>
                  <span>{assignment.course}</span>
                  <small>{assignment.deadline}</small>
                </li>
              ))}
            </ul>
          </section>
        </>
      );
    }

    if (["timetable", "results", "notifications", "onboarding"].includes(page)) {
      const item = navItems.find((n) => n.page === page) || { label: page };
      return (
        <section className="page-panel placeholder-panel">
          <div className="panel-header">
            <div>
              <h2>{item.label}</h2>
              <p>This page opens when the navigation link is clicked.</p>
            </div>
          </div>
          <div className="placeholder-body">
            <p>{item.label} content is ready to be built here.</p>
          </div>
        </section>
      );
    }

    return null;
  };

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      page: "overview",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="11" width="4" height="8" fill="currentColor" />
          <rect x="9" y="7" width="4" height="12" fill="currentColor" />
          <rect x="15" y="3" width="4" height="16" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "assignments",
      label: "Assignments",
      page: "assignments",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="4" width="14" height="16" rx="2" stroke="currentColor" fill="none" />
          <path d="M7 8h6M7 12h6M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "timetable",
      label: "Timetable",
      page: "timetable",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" fill="none" />
          <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "results",
      label: "Results",
      page: "results",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6L4 8h6z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      page: "notifications",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M15 17H9a3 3 0 006 0z" fill="currentColor" />
          <path d="M18 8a6 6 0 10-12 0v5l-2 2v1h18v-1l-2-2V8z" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      ),
    },
    {
      id: "onboarding",
      label: "Onboarding",
      page: "onboarding",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M5 12l4-4 4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M12 22V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
  ];

  const currentPage = navItems.find((n) => n.page === page) || navItems[0];

  return (
    <div className="app-shell">
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`app-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-brand">
          <span className="brand-mark">AT</span>
          {sidebarOpen && (
            <div>
              <h1>Assignment Tracker</h1>
              <p>Work smarter with a single app shell.</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${page === item.page ? "active" : ""}`}
              onClick={() => onNavigate(item.page)}
              title={item.label}
            >
              <span className="nav-icon" aria-hidden>{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-panel">
            {sidebarOpen && (
              <>
                <span className="user-title">Signed in as</span>
                <strong>{user.username || user.email}</strong>
              </>
            )}
          </div>
          <button className="logout-button" onClick={onLogout}>
            {sidebarOpen ? "Log out" : "🚪"}
          </button>
        </div>
      </aside>

      <main className="app-main">
        <header className="main-header">
          <div>
            <h2>{currentPage.label === "Overview" ? `Welcome back${user?.username ? `, ${user.username}` : user?.email ? `, ${user.email}` : ""}` : currentPage.label}</h2>
            <p>
              {currentPage.page === "overview"
                ? "Your dashboard contains the latest assignment insights and controls."
                : `Navigate the ${currentPage.label} page with the sidebar links.`}
            </p>
          </div>
          <div className="main-actions">
            {currentPage.page === "overview" ? (
              <button onClick={() => onNavigate("assignments")}>View assignments</button>
            ) : (
              <button onClick={() => onNavigate("overview")}>Back to overview</button>
            )}
          </div>
        </header>

        <div className="app-content">{renderContent()}</div>
      </main>
    </div>
  );
}

export default Dashboard;
