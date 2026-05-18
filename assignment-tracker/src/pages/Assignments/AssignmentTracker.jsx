import React, { useMemo, useState, useRef } from "react";
import "./AssignmentTracker.css";
import AssignmentCard from "./AssignmentCard";

function AssignmentTracker({ assignments: propAssignments, onStatusChange, onCreateAssignment }) {
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
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [feedback, setFeedback] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const toastTimer = useRef(null);

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

  const getNextId = () => Math.max(0, ...assignments.map((assignment) => assignment.id)) + 1;

  const handleCreateAssignment = (event) => {
    event.preventDefault();

    if (!title.trim() || !course.trim() || !deadline) {
      setFeedback("Please complete all fields before creating an assignment.");
      return;
    }

    const newAssignment = {
      id: getNextId(),
      title: title.trim(),
      course: course.trim(),
      deadline,
      priority,
      status: "Not Started",
    };

    if (onCreateAssignment) {
      onCreateAssignment(newAssignment);
    } else {
      setInternalAssignments((current) => [newAssignment, ...current]);
    }

    setTitle("");
    setCourse("");
    setDeadline("");
    setPriority("Medium");
    // show toast notification for max 7 seconds
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast({ visible: true, message: "Assignment created successfully.", type: "success" });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
      toastTimer.current = null;
    }, 7000);
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
          <h1>Create new assignment</h1>
          <p>Build a task before moving it through the available status steps.</p>
        </div>
      </div>

      <form className="create-form" onSubmit={handleCreateAssignment}>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High priority</option>
            <option value="Medium">Medium priority</option>
            <option value="Low">Low priority</option>
          </select>
        </div>

        <div className="form-footer">
          <button type="submit">Add assignment</button>
          {feedback && <p className="form-feedback">{feedback}</p>}
        </div>

      {toast.visible && (
        <div className={`toast toast--${toast.type} ${toast.visible ? "show" : ""}`} role="status" aria-live="polite">
          <div className="toast-inner">
            <strong>{toast.message}</strong>
            <button className="toast-close" onClick={() => setToast((t) => ({ ...t, visible: false }))} aria-label="Close">×</button>
          </div>
        </div>
      )}
      </form>

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