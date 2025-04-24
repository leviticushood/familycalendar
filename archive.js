function loadArchivedEvents() {
  const events = JSON.parse(localStorage.getItem('events') || '[]');
  const today = new Date().toISOString().split('T')[0];
  const tbody = document.querySelector('#archiveTable tbody');
  tbody.innerHTML = '';
  events.filter(event => event.date < today).forEach(event => {
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
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', loadArchivedEvents);