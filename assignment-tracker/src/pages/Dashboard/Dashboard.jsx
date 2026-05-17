import React from "react";
import AssignmentTracker from "../Assignments/AssignmentTracker";
import "./Dashboard.css";

function Dashboard({ user, page, assignments, onNavigate, onLogout, onStatusChange }) {
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
          <div className="panel-header">
            <div>
              <h2>Assignment tracker</h2>
              <p>Search, sort, and update your assignments without leaving the dashboard.</p>
            </div>
          </div>
          <AssignmentTracker assignments={assignments} onStatusChange={onStatusChange} />
        </section>
      );
    }

    return (
      <section className="page-panel overview-panel">
        <div className="panel-header">
          <div>
            <h2>Performance snapshot</h2>
            <p>All metrics are drawn from your current assignments in real time.</p>
          </div>
        </div>

        <div className="stat-grid">
          <article className="stat-card">
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

        <div className="activity-card">
          <div className="activity-card__header">
            <h3>Upcoming deadlines</h3>
          </div>
          <ul>
            {recentActivity.map((assignment) => (
              <li key={assignment.id}>
                <strong>{assignment.title}</strong>
                <span>{assignment.course}</span>
                <small>{assignment.deadline}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  const navItems = [
    { id: "overview", label: "📊 Overview", page: "overview" },
    { id: "assignments", label: "📋 Assignments", page: "assignments" },
  ];

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
              <span className="nav-icon">{item.label.split(" ")[0]}</span>
              {sidebarOpen && <span className="nav-label">{item.label.split(" ").slice(1).join(" ")}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-panel">
            {sidebarOpen && (
              <>
                <span className="user-title">Signed in as</span>
                <strong>{user.email}</strong>
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
            <h2>Welcome back{user?.email ? `, ${user.email}` : ""}</h2>
            <p>Your dashboard contains the latest assignment insights and controls.</p>
          </div>
          <div className="main-actions">
            <button onClick={() => onNavigate("assignments")}>View assignments</button>
          </div>
        </header>

        <div className="summary-grid">
          <article className="summary-card summary-card--brand">
            <span>Total</span>
            <strong>{totalAssignments}</strong>
          </article>
          <article className="summary-card">
            <span>Due this week</span>
            <strong>{dueThisWeek}</strong>
          </article>
          <article className="summary-card">
            <span>In progress</span>
            <strong>{statusSummary["In Progress"] || 0}</strong>
          </article>
          <article className="summary-card">
            <span>Submitted</span>
            <strong>{statusSummary.Submitted || 0}</strong>
          </article>
        </div>

        <div className="app-content">{renderContent()}</div>
      </main>
    </div>
  );
}

export default Dashboard;
