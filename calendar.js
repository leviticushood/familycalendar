function loadEvents() {
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  const tbody = document.querySelector('#eventTable tbody');
  tbody.innerHTML = '';
  events.forEach((event, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${event.title}</td>
      <td>${event.date}</td>
      <td>${event.time}</td>
      <td>${event.location}</td>
      <td><a href='${event.link}' target='_blank'>Link</a></td>
      <td>${event.contact}</td>
      <td>${event.description}</td>
      <td class='user-name'>${event.user}</td>
      <td><button onclick='deleteEvent(${index})'>🗑️</button></td>
    `;
    tbody.appendChild(row);
  });
}

function deleteEvent(index) {
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  events.splice(index, 1);
  localStorage.setItem('events', JSON.stringify(events));
  loadEvents();
}

document.addEventListener('DOMContentLoaded', loadEvents);