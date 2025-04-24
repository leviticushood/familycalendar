function loadEvents() {
  const allEvents = JSON.parse(localStorage.getItem('events') || '[]');
  const today = new Date().toISOString().split('T')[0];
  const events = allEvents.filter(event => event.date >= today);

  const tbody = document.querySelector('#eventTable tbody');
  const grid = document.getElementById('calendarView');
  tbody.innerHTML = '';
  grid.innerHTML = '';

  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  events.forEach((event, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${event.title}</td>
      <td><span class="tooltip">${event.date}<div class="tooltip-text">
        <strong>Location:</strong> ${event.location}<br>
        <strong>Link:</strong> <a href='${event.link}' target='_blank'>Link</a><br>
        <strong>Contact:</strong> ${event.contact}<br>
        <strong>Description:</strong> ${event.description}<br>
        <strong>User:</strong> ${event.user}
      </div></span></td>
      <td>${event.time}</td>
      <td><button onclick='confirmDelete(${index})'>🗑️</button></td>
    `;
    tbody.appendChild(row);

    const div = document.createElement('div');
    div.className = 'calendar-card';
    div.innerHTML = `<strong>${event.title}</strong><br>${event.date} at ${event.time}`;
    grid.appendChild(div);
  });
}

function confirmDelete(index) {
  const allEvents = JSON.parse(localStorage.getItem('events') || '[]');
  const today = new Date().toISOString().split('T')[0];
  const filteredEvents = allEvents.filter(event => event.date >= today);
  if (confirm("Are you sure you want to delete this event?")) {
    const originalIndex = allEvents.findIndex(event => event.date >= today && allEvents.indexOf(event) === index);
    allEvents.splice(originalIndex, 1);
    localStorage.setItem('events', JSON.stringify(allEvents));
    loadEvents();
  }
}

function toggleView(mode) {
  const table = document.getElementById('eventTable');
  const calendar = document.getElementById('calendarView');
  if (mode === 'grid') {
    table.style.display = 'none';
    calendar.style.display = 'grid';
  } else {
    table.style.display = 'table';
    calendar.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadEvents();
  toggleView('list');
});
