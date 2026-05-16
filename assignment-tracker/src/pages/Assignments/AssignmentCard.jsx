import React, { useState } from "react";
import "./AssignmentTracker.css";
import AssignmentCard from "./AssignmentCard";

function AssignmentTracker() {

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

  const [assignments, setAssignments] = useState(initialAssignments);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortType, setSortType] = useState("");

  const handleStatusChange = (id, newStatus) => {

    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id
        ? { ...assignment, status: newStatus }
        : assignment
    );

    setAssignments(updatedAssignments);
  };

  const handleSort = (type) => {

    setSortType(type);

    let sortedAssignments = [...assignments];

    if (type === "deadline") {
      sortedAssignments.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
    }

    if (type === "priority") {

      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      sortedAssignments.sort(
        (a, b) =>
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
      );
    }

    if (type === "status") {
      sortedAssignments.sort((a, b) =>
        a.status.localeCompare(b.status)
      );
    }

    setAssignments(sortedAssignments);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (

    <div className="tracker-container">

      <div className="tracker-header">

        <div>
          <h1>Assignment Tracker</h1>
          <p>Manage your assignments efficiently</p>
        </div>

      </div>

      <div className="controls">

        <input
          type="text"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={sortType}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="deadline">Deadline</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>

      </div>

      {filteredAssignments.length === 0 ? (

        <div className="empty-state">

          <h2>No Assignments Found</h2>
          <p>Try searching another assignment.</p>

        </div>

      ) : (

        <div className="assignment-list">

          {filteredAssignments.map((assignment) => (

            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onStatusChange={handleStatusChange}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default AssignmentTracker;