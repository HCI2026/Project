/* Timetable data */
var schedule = {
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

/* Hours for the weekly table */
var hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

/* Switch between daily and weekly tab */
function showTab(tab) {
  document.getElementById('daily').classList.remove('active');
  document.getElementById('weekly').classList.remove('active');
  document.getElementById(tab).classList.add('active');

  /* Update tab button styles */
  var tabs = document.querySelectorAll('.tab');
  tabs[0].classList.toggle('active', tab === 'daily');
  tabs[1].classList.toggle('active', tab === 'weekly');
}

/* Show classes for a selected day */
function showDay(day) {
  var content = document.getElementById('day-content');
  content.innerHTML = '';

  var classes = schedule[day];

  if (classes.length === 0) {
    content.innerHTML = '<p>No classes today.</p>';
    return;
  }

  /* Loop through classes and build a card for each */
  for (var i = 0; i < classes.length; i++) {
    var c = classes[i];
    var card = document.createElement('div');
    card.className = 'class-card';
    card.innerHTML =
      '<div class="time">' + c.time + '</div>' +
      '<div class="subject">' + c.subject + '</div>' +
      '<div class="venue">📍 ' + c.venue + '</div>' +
      '<span class="type">' + c.type + '</span>';
    content.appendChild(card);
  }

  /* Update active button */
  var buttons = document.querySelectorAll('.day-btn');
  var days = ['monday','tuesday','wednesday','thursday','friday'];
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].classList.toggle('active', days[j] === day);
  }
}

/* Build the weekly table rows */
function buildWeekly() {
  var tbody = document.getElementById('weekly-body');
  var days = ['monday','tuesday','wednesday','thursday','friday'];

  for (var i = 0; i < hours.length; i++) {
    var row = document.createElement('tr');
    var hour = parseInt(hours[i]);

    /* Time cell */
    var timeCell = document.createElement('td');
    timeCell.textContent = hours[i];
    row.appendChild(timeCell);

    /* One cell per day */
    for (var j = 0; j < days.length; j++) {
      var cell = document.createElement('td');
      var found = null;

      /* Check if any class starts at this hour */
      for (var k = 0; k < schedule[days[j]].length; k++) {
        var startHour = parseInt(schedule[days[j]][k].time.split(':')[0]);
        if (startHour === hour) {
          found = schedule[days[j]][k];
          break;
        }
      }

      if (found) {
        cell.className = 'has-class';
        cell.innerHTML = '<strong>' + found.subject + '</strong><br>' + found.venue + '<br><em>' + found.type + '</em>';
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }
}

/* Run on page load */
showDay('monday');
buildWeekly();