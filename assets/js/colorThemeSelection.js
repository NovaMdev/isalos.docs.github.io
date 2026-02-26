document.addEventListener('DOMContentLoaded', (event) => {
  const storedTheme = localStorage.getItem('theme');
  const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

  // Restore saved theme on page load
  if (storedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleDarkMode.textContent = '🌞';
      toggleDarkMode.setAttribute('aria-label', 'Switch to light mode');
  } else {
      toggleDarkMode.textContent = '🌜';
      toggleDarkMode.setAttribute('aria-label', 'Switch to dark mode');
  }

  toggleDarkMode.style.fontSize = '1.5em';

  toggleDarkMode.addEventListener('click', function() {
      if (document.body.classList.contains('dark-mode')) {
          document.body.classList.remove('dark-mode');
          toggleDarkMode.textContent = '🌜';
          toggleDarkMode.setAttribute('aria-label', 'Switch to dark mode');
          localStorage.setItem('theme', 'light');
      } else {
          document.body.classList.add('dark-mode');
          toggleDarkMode.textContent = '🌞';
          toggleDarkMode.setAttribute('aria-label', 'Switch to light mode');
          localStorage.setItem('theme', 'dark');
      }
  });
});


