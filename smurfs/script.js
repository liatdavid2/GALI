const gameArea = document.getElementById("gameArea");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const timerBar = document.getElementById("timerBar");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreEl = document.getElementById("finalScore");

let score = 0;
let lives = 3;
let level = 1;

let currentCharacter = null;
let timer = null;

/* ---------- GAME ---------- */

function updateUI() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = level;
}

function getTime() {
  return Math.max(2000 - level * 150, 800);
}

function spawn() {
  clear();

  if (lives <= 0) return endGame();

  const img = document.createElement("img");
  img.src = "images/kondson.png";
  img.className = "character";

  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 200);

  img.style.left = x + "px";
  img.style.top = y + "px";

  img.onclick = () => {
    score++;
    level = Math.floor(score / 5) + 1;
    updateUI();

    boom(x, y);

    spawn();
  };

  currentCharacter = img;
  gameArea.appendChild(img);

  startTimer();

  timer = setTimeout(() => {
    lives--;
    updateUI();
    spawn();
  }, getTime());
}

/* ---------- EFFECTS ---------- */

function boom(x, y) {
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = x + "px";
    particle.style.top = y + "px";

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80;

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.setProperty("--dx", dx + "px");
    particle.style.setProperty("--dy", dy + "px");

    gameArea.appendChild(particle);

    setTimeout(() => particle.remove(), 600);
  }
}

function startTimer() {
  timerBar.style.transition = "none";
  timerBar.style.transform = "scaleX(1)";

  setTimeout(() => {
    timerBar.style.transition = `transform ${getTime()}ms linear`;
    timerBar.style.transform = "scaleX(0)";
  }, 10);
}

/* ---------- CONTROL ---------- */

function clear() {
  if (currentCharacter) currentCharacter.remove();
  if (timer) clearTimeout(timer);
}

function startGame() {
  score = 0;
  lives = 3;
  level = 1;

  updateUI();

  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");

  spawn();
}

function endGame() {
  clear();
  finalScoreEl.textContent = score;
  gameOverScreen.classList.remove("hidden");
}

/* ---------- BUTTONS ---------- */

document.getElementById("startBtn").onclick = startGame;
document.getElementById("restartBtn").onclick = startGame;