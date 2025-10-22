// === LICZNIK DO 22.10.2025 10:50 CZASU LOKALNEGO ===

// Tworzymy datę docelową lokalnie (nie UTC)
const targetDate = new Date();
targetDate.setFullYear(2025);
targetDate.setMonth(9); // 9 = październik
targetDate.setDate(22);
targetDate.setHours(10);
targetDate.setMinutes(50);
targetDate.setSeconds(0);
targetDate.setMilliseconds(0);

// Elementy licznika
const cards = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const celebration = document.getElementById("celebration");
const content = document.querySelector(".content");
const testButton = document.getElementById("testButton");

// Funkcja aktualizująca zegar
function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  // jeśli czas nie minął, licz dalej
  if (diff > 0) {
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    updateCard(cards.days, d);
    updateCard(cards.hours, h);
    updateCard(cards.minutes, m);
    updateCard(cards.seconds, s);
  } else {
    showCelebration();
  }
}

// Funkcja do animacji flip
function updateCard(card, newValue) {
  const currentValue = card.textContent || "00";
  const formatted = newValue.toString().padStart(2, "0");
  if (currentValue !== formatted) {
    card.classList.add("flip");
    setTimeout(() => {
      card.textContent = formatted;
      card.classList.remove("flip");
    }, 350);
  }
}

// Pokazanie animacji po zakończeniu
function showCelebration() {
  content.style.display = "none";
  celebration.classList.remove("hidden");
}

// Przycisk testowy
testButton.addEventListener("click", showCelebration);

// Uruchom licznik
updateTimer();
setInterval(updateTimer, 1000);
