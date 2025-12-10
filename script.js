const button = document.getElementById('toggle-mode');

button.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  button.textContent = document.body.classList.contains('dark')
        ? '☀ Light Mode'
        : '🌙 Dark Mode';
});
