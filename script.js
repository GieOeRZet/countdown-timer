// Czas docelowy – lokalny (22 października 2025, 10:50)
const targetDate = new Date(2025, 9, 22, 10, 50, 0);

// Elementy licznika
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const celebration = document.getElementById("celebration");
const content = document.querySelector(".content");

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  // Kiedy odliczanie się skończy
  if (diff <= 0) {
    content.style.display = "none";      // ukryj licznik
    celebration.classList.remove("hidden"); // pokaż animację
    return;
  }

  // Oblicz pozostały czas
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

// Aktualizuj co sekundę
setInterval(updateTimer, 1000);
updateTimer();
