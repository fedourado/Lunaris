
const toggleButton = document.getElementById("toggle-dark");
const body = document.body;

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️"; 
  } else {
    body.classList.remove("dark-mode");
    toggleButton.textContent = "🌙"; 
  }
}


window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("darkMode");
  
  if (savedTheme === "enabled") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
});

// Alternar tema ao clicar no botão
toggleButton.addEventListener("click", () => {
  const isDarkMode = body.classList.contains("dark-mode");
  
  if (isDarkMode) {
    // Mudar para light mode
    applyTheme("light");
    localStorage.setItem("darkMode", "disabled");
  } else {
    // Mudar para dark mode
    applyTheme("dark");
    localStorage.setItem("darkMode", "enabled");
  }
  
 
  toggleButton.style.transform = "scale(1.2) rotate(360deg)";
  setTimeout(() => {
    toggleButton.style.transform = "scale(1)";
  }, 300);
});


if (window.matchMedia && !localStorage.getItem("darkMode")) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    applyTheme("dark");
    localStorage.setItem("darkMode", "enabled");
  }
}


window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("darkMode")) {
    applyTheme(e.matches ? "dark" : "light");
  }
});

