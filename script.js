const screens = {
  landing: document.getElementById("landing"),
  world: document.getElementById("world"),
  letter: document.getElementById("letter"),
  final: document.getElementById("final")
};

function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({top: 0, behavior: "smooth"});
}

document.getElementById("enterBtn").addEventListener("click", () => show("world"));

const audio = document.getElementById("audio");
const player = document.getElementById("player");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const letterBtn = document.getElementById("letterBtn");

document.getElementById("artButton").addEventListener("click", async () => {
  player.classList.remove("hidden");
  try {
    await audio.play();
    playBtn.textContent = "Ⅱ";
  } catch (e) {
    playBtn.textContent = "▶";
  }
});

playBtn.addEventListener("click", async () => {
  if (audio.paused) {
    await audio.play();
    playBtn.textContent = "Ⅱ";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = fmt(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressBar.style.width = pct + "%";
  currentTime.textContent = fmt(audio.currentTime);

  if (audio.currentTime > 3) letterBtn.classList.remove("hidden");
});

audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  letterBtn.classList.remove("hidden");
});

document.querySelector(".progress").addEventListener("click", e => {
  const rect = e.currentTarget.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

letterBtn.addEventListener("click", () => show("letter"));
document.getElementById("finalBtn").addEventListener("click", () => show("final"));

function fmt(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
