import React, { useState, useMemo } from "react";
import "./Timetable.css";

const schedule = {
  monday: [
    { time: "08:00 - 10:00", subject: "Human Computer Interaction", venue: "Room 101", type: "Lecture" },
    { time: "10:00 - 12:00", subject: "Database Systems", venue: "Lab 3", type: "Lab" },
    { time: "14:00 - 16:00", subject: "Software Engineering", venue: "Room 205", type: "Tutorial" }
  ],
  tuesday: [
    { time: "09:00 - 11:00", subject: "Object Oriented Programming", venue: "Lab 1", type: "Lab" },
    { time: "13:00 - 15:00", subject: "Calculus", venue: "Room 310", type: "Lecture" }
  ],
  wednesday: [
    { time: "08:00 - 10:00", subject: "Computer Networks", venue: "Room 102", type: "Lecture" },
    { time: "10:00 - 12:00", subject: "Human Computer Interaction", venue: "Room 101", type: "Tutorial" },
    { time: "15:00 - 17:00", subject: "Database Systems", venue: "Room 201", type: "Lecture" }
  ],
  thursday: [
    { time: "11:00 - 13:00", subject: "Software Engineering", venue: "Room 205", type: "Lecture" },
    { time: "14:00 - 16:00", subject: "Object Oriented Programming", venue: "Room 210", type: "Lecture" }
  ],
  friday: [
    { time: "09:00 - 11:00", subject: "Calculus", venue: "Room 311", type: "Tutorial" },
    { time: "13:00 - 15:00", subject: "Computer Networks", venue: "Lab 2", type: "Lab" }
  ]
};

const hours = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];

function Timetable() {
  const [view, setView] = useState("daily");
  const [activeDay, setActiveDay] = useState("monday");

  const days = ["monday","tuesday","wednesday","thursday","friday"];

  const classesForDay = useMemo(() => schedule[activeDay] || [], [activeDay]);

  return (
    <section className="page-panel timetable-panel">
      <div className="panel-header">
        <div>
          <h2>Timetable</h2>
          <p>Daily and weekly views of your class schedule.</p>
        </div>
      </div>

      <div className="timetable-tabs">
        <button className={`tab ${view === 'daily' ? 'active' : ''}`} onClick={() => setView('daily')}>Daily</button>
        <button className={`tab ${view === 'weekly' ? 'active' : ''}`} onClick={() => setView('weekly')}>Weekly</button>
      </div>

      {view === 'daily' ? (
        <div className="daily-view">
          <div className="days">
            {days.map((d) => (
              <button key={d} className={`day-btn ${activeDay === d ? 'active' : ''}`} onClick={() => setActiveDay(d)}>
                {d[0].toUpperCase() + d.slice(1,3)}
              </button>
            ))}
          </div>

          <div id="day-content" className="day-content">
            {classesForDay.length === 0 ? (
              <p>No classes today.</p>
            ) : (
              classesForDay.map((c, i) => (
                <div key={i} className="class-card">
                  <div className="time">{c.time}</div>
                  <div className="subject">{c.subject}</div>
                  <div className="venue">📍 {c.venue}</div>
                  <span className="type">{c.type}</span>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="weekly-view">
          <table className="weekly-table">
            <thead>
              <tr>
                <th>Time</th>
                {days.map((d) => <th key={d}>{d[0].toUpperCase() + d.slice(1)}</th>)}
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => (
                <tr key={h}>
                  <td className="time-col">{h}</td>
                  {days.map((d) => {
                    const found = schedule[d].find(s => parseInt(s.time.split(':')[0],10) === parseInt(h,10));
                    return (
                      <td key={d} className={found ? 'has-class' : ''}>
                        {found ? (
                          <>
                            <strong>{found.subject}</strong><br />
                            <em>{found.venue}</em><br />
                            <small>{found.type}</small>
                          </>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Timetable;
