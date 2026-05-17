import React from "react";
import "./AssignmentTracker.css";

const statusClasses = {
  Submitted: "submitted",
  "In Progress": "progress",
  "Not Started": "not-started",
};

function AssignmentCard({ assignment, onStatusChange }) {
  const { id, title, course, deadline, priority, status } = assignment;
  const priorityClass = priority.toLowerCase();
  const statusClass = statusClasses[status] || "not-started";

  return (
    <div className="assignment-card">
      <div className="card-top">
        <div>
          <h2>{title}</h2>
          <p>{course}</p>
        </div>
        <span className={`priority ${priorityClass}`}>{priority}</span>
      </div>

      <p>
        <strong>Deadline:</strong> {deadline}
      </p>

      <div className="status-container">
        <span className={`status-badge ${statusClass}`}>{status}</span>
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Submitted">Submitted</option>
        </select>
      </div>
    </div>
  );
}

export default AssignmentCard;
