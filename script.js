const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const catGif = document.getElementById("cat-gif");
const teaseToast = document.getElementById("tease-toast");
const buttonsWrap = document.getElementById("buttons-wrap");
const runawayText = document.getElementById("runaway-text");
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

let noCount = 0;
let musicStarted = false;

const teaseMessages = [
  "really? 🥺",
  "are you sure? 🐥",
  "think again 💭",
  "ehhh press yes 😌",
  "okay okay... just say yes 💛"
];

const gifStates = [
  "https://media.tenor.com/r_2wMCBMnesAAAAi/bubu-bubu-dudu-love.gif",
  "https://media.tenor.com/3xQH3dTJ4J8AAAAi/bubu-dudu-sseeyall.gif",
  "https://media.tenor.com/XR9rX3S0UX0AAAAi/bubu-dudu.gif",
  "https://media.tenor.com/0cNM_9li440AAAAi/dudu-giving-flowers-bubu-flowers.gif"
];

function showToast(message) {
  teaseToast.textContent = message;
  teaseToast.classList.add("show");

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    teaseToast.classList.remove("show");
  }, 1400);
}

function getCenterPositionFromStyles(button, wrapRect) {
  const left = parseFloat(button.style.left || 0);
  const top = parseFloat(button.style.top || 0);
  const width = button.offsetWidth;
  const height = button.offsetHeight;

  return {
    x: wrapRect.left + left + width / 2,
    y: wrapRect.top + top + height / 2
  };
}

function getDistance(pos1, pos2) {
  return Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y);
}

function placeNoButtonSafely() {
  const wrapRect = buttonsWrap.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const minX = wrapRect.width * 0.58;
  const maxX = wrapRect.width - btnWidth;
  const maxY = wrapRect.height - btnHeight;

  const yesCenter = {
    x: yesRect.left + yesRect.width / 2,
    y: yesRect.top + yesRect.height / 2
  };

  let tries = 0;
  let placed = false;

  while (tries < 50 && !placed) {
    const randomX = minX + Math.random() * Math.max(1, (maxX - minX));
    const randomY = Math.random() * Math.max(1, maxY);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.right = "auto";

    const noCenter = getCenterPositionFromStyles(noBtn, wrapRect);
    const distance = getDistance(yesCenter, noCenter);

    if (distance > 140) {
      placed = true;
    }

    tries++;
  }
}

function moveNoButton(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  noCount++;

  placeNoButtonSafely();

  const scale = 1 + Math.min(noCount * 0.05, 0.2);
  yesBtn.style.transform = `scale(${scale})`;

  const msg = teaseMessages[Math.min(noCount - 1, teaseMessages.length - 1)];
  showToast(msg);

  const gifIndex = Math.min(noCount, gifStates.length - 1);
  catGif.src = gifStates[gifIndex];

  if (noCount >= 5) {
    noBtn.textContent = "Fine 😳";
  }

  if (noCount >= 7) {
    noBtn.style.opacity = "0.75";
  }
}

function pushNoAwayIfTooClose() {
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const yesCenter = {
    x: yesRect.left + yesRect.width / 2,
    y: yesRect.top + yesRect.height / 2
  };

  const noCenter = {
    x: noRect.left + noRect.width / 2,
    y: noRect.top + noRect.height / 2
  };

  const distance = getDistance(yesCenter, noCenter);

  if (distance < 130) {
    placeNoButtonSafely();
  }
}

function startMusic() {
  if (!music || musicStarted) return;

  music.volume = 0;

  music.play().then(() => {
    musicStarted = true;
    let vol = 0;

    const fade = setInterval(() => {
      vol += 0.03;
      if (vol >= 0.3) {
        vol = 0.3;
        clearInterval(fade);
      }
      music.volume = vol;
    }, 80);
  }).catch((err) => {
    console.log("play blocked:", err);
  });
}

function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    music.play();
    musicToggle.textContent = "🔊";
  } else {
    music.pause();
    musicToggle.textContent = "🔇";
  }
}

yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});

noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton, { passive: false });

document.addEventListener("mousemove", pushNoAwayIfTooClose);
document.addEventListener("touchmove", pushNoAwayIfTooClose);

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });

window.addEventListener("load", () => {
  noBtn.style.left = `${buttonsWrap.clientWidth - noBtn.offsetWidth}px`;
  noBtn.style.top = "40px";
  noBtn.style.right = "auto";
});
