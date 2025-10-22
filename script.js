// === LICZNIK DO 22.10.2025 10:50 CZASU LOKALNEGO ===

// Tworzymy datę lokalną w sposób gwarantowany dla wszystkich przeglądarek:
const targetDate = new Date();
targetDate.setFullYear(2025);
targetDate.setMonth(9); // październik (0 = styczeń)
targetDate.setDate(22);
targetDate.setHours(10);
targetDate.setMinutes(50);
targetDate.setSeconds(0);
targetDate.setMilliseconds(0);

// Elementy zegara
const cards = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const celebration = document.getElementById("celebration");
const content = document.querySelector(".content");
const testButton = document.getElementById("testButton");

// Aktualizacja licznika
function updateTimer() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    showCelebration();
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  updateCard(cards.days, d);
  updateCard(cards.hours, h);
  updateCard(cards.minutes, m);
  updateCard(cards.seconds, s);
}

// Efekt "flip" — przewracanie kart
function updateCard(card, newValue) {
  const currentValue = card.textContent || "0";
  if (currentValue !== newValue.toString()) {
    card.classList.add("flip");
    setTimeout(() => {
      card.textContent = newValue.toString().padStart(2, "0");
      card.classList.remove("flip");
    }, 350);
  }
}

// Pokaż animację świętowania
function showCelebration() {
  content.style.display = "none";
  celebration.classList.remove("hidden");
}

// Obsługa przycisku testowego
testButton.addEventListener("click", showCelebration);

// Start
updateTimer();
setInterval(updateTimer, 1000);
