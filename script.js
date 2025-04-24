function addEvent() {
  const event = {
    user: document.getElementById('user').value,
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    location: document.getElementById('location').value,
    link: document.getElementById('link').value,
    contact: document.getElementById('contact').value,
    description: document.getElementById('description').value
  };

  if (!event.title || !event.date) {
    alert("Please enter at least a title and date.");
    return;
  }

  const events = JSON.parse(localStorage.getItem('events') || '[]');
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));

  document.querySelectorAll('input, textarea').forEach(el => el.value = '');
  alert("Event added successfully!");
}
