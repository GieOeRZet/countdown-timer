// === CEL: 22.10.2025 10:50 CZAS LOKALNY ===
const targetDate = new Date(2025, 9, 22, 10, 50, 0);

const cards = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const analogClock = document.getElementById("analogClock");
const celebration = document.getElementById("celebration");

// ========== FLIP CLOCK ==========
function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

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

// ========== ZEGAR ANALOGOWY ==========
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

function updateAnalogClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
}

// ========== ZMIANA NA ANIMACJĘ ==========
function showCelebration() {
  analogClock.style.display = "none";
  celebration.classList.remove("hidden");
}

// Uruchomienie
setInterval(updateAnalogClock, 1000);
setInterval(updateTimer, 1000);
updateAnalogClock();
updateTimer();
