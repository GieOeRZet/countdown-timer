// === LICZNIK DO 22.10.2025 10:50 ===
const targetDate = new Date(2025, 9, 22, 10, 50, 0);

const cards = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const celebration = document.getElementById("celebration");
const content = document.querySelector(".content");
const testButton = document.getElementById("testButton");

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

function showCelebration() {
  content.style.display = "none";
  celebration.classList.remove("hidden");
}

testButton.addEventListener("click", showCelebration);

updateTimer();
setInterval(updateTimer, 1000);
