document.addEventListener('DOMContentLoaded', (event) => {
  const storedTheme = localStorage.getItem('theme');
  const toggleButtons = document.querySelectorAll('.js-toggle-dark-mode');

  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      toggleButtons.forEach(btn => {
        btn.setAttribute('aria-label', 'Switch to light mode');
      });
    } else {
      document.body.classList.remove('dark-mode');
      toggleButtons.forEach(btn => {
        btn.setAttribute('aria-label', 'Switch to dark mode');
      });
    }
  }


  // Restore saved theme on page load
  if (storedTheme === 'dark') {
    setTheme(true);
  } else {
    setTheme(false);
  }

  toggleButtons.forEach(btn => {
    btn.style.fontSize = '1.5em';
    btn.addEventListener('click', function() {
      const isDark = document.body.classList.contains('dark-mode');
      setTheme(!isDark);
      localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    });
  });
});

