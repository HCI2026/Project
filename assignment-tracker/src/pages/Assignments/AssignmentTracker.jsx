import React, { useMemo, useState } from "react";
import "./AssignmentTracker.css";
import AssignmentCard from "./AssignmentCard";

function AssignmentTracker({ assignments: propAssignments, onStatusChange }) {
  const initialAssignments = [
    {
      id: 1,
      title: "HCI Group Report",
      course: "Human Computer Interaction",
      deadline: "2026-05-20",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Database Assignment",
      course: "Database Systems",
      deadline: "2026-05-24",
      priority: "Medium",
      status: "Not Started",
    },
    {
      id: 3,
      title: "React Project",
      course: "Web Development",
      deadline: "2026-05-28",
      priority: "Low",
      status: "Submitted",
    },
  ];

  const [internalAssignments, setInternalAssignments] = useState(initialAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  const assignments = propAssignments ?? internalAssignments;

  const handleStatus = (id, newStatus) => {
    if (onStatusChange) {
      onStatusChange(id, newStatus);
      return;
    }

    setInternalAssignments((current) =>
      current.map((assignment) =>
        assignment.id === id ? { ...assignment, status: newStatus } : assignment
      )
    );
  };

  const filteredAssignments = useMemo(
    () =>
      assignments.filter((assignment) =>
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [assignments, searchTerm]
  );

  const sortedAssignments = useMemo(() => {
    const list = [...filteredAssignments];

    if (sortType === "deadline") {
      return list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    if (sortType === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return list.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    if (sortType === "status") {
      return list.sort((a, b) => a.status.localeCompare(b.status));
    }

    return list;
  }, [filteredAssignments, sortType]);

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <div>
          <h1>Assignment Tracker</h1>
          <p>Search, filter, and update assignments directly inside the dashboard.</p>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="deadline">Deadline</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>

      {sortedAssignments.length === 0 ? (
        <div className="empty-state">
          <h2>No Assignments Found</h2>
          <p>Try searching another assignment.</p>
        </div>
      ) : (
        <div className="assignment-list">
          {sortedAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onStatusChange={handleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignmentTracker;