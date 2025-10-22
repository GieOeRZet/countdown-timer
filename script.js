// === LICZNIK DO 22.10.2025 10:50 CZASU LOKALNEGO ===

// miesiące liczone od zera: 0=styczeń, 9=październik
const targetDate = new Date(2025, 9, 22, 10, 50, 0);

// Elementy licznika
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const celebration = document.getElementById("celebration");
const content = document.querySelector(".content");
const testButton = document.getElementById("testButton");

// Aktualizacja licznika
function updateTimer() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  // Po osiągnięciu daty docelowej
  if (diff <= 0) {
    showCelebration();
    return;
  }

  // Oblicz pozostały czas
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Aktualizacja wartości w HTML
  daysEl.textContent = days;
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

// Funkcja pokazująca animację świętowania
function showCelebration() {
  content.style.display = "none";
  celebration.classList.remove("hidden");
}

// Obsługa przycisku testowego
testButton.addEventListener("click", showCelebration);

// Uruchomienie licznika
updateTimer();
setInterval(updateTimer, 1000);
