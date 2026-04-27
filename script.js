const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const catGif = document.getElementById("cat-gif");
const teaseToast = document.getElementById("tease-toast");
const buttonsWrap = document.getElementById("buttons-wrap");
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

function moveNoButton(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  noCount++;

  const wrap = buttonsWrap;
  const wrapWidth = wrap.clientWidth;
  const wrapHeight = wrap.clientHeight;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  // 👉 關鍵：限制在右邊，避免碰到 Yes
  const minX = wrapWidth * 0.55;
  const maxX = wrapWidth - btnWidth;
  const maxY = wrapHeight - btnHeight;

  const x = minX + Math.random() * (maxX - minX);
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.style.right = "auto";

  // 👉 Yes 小幅變大
  const scale = 1 + Math.min(noCount * 0.04, 0.15);
  yesBtn.style.transform = `scale(${scale})`;

  const msg = teaseMessages[Math.min(noCount - 1, teaseMessages.length - 1)];
  showToast(msg);

  const gifIndex = Math.min(noCount, gifStates.length - 1);
  catGif.src = gifStates[gifIndex];

  if (noCount >= 5) {
    noBtn.textContent = "Fine 😳";
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
  }).catch(err => {
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

// 👉 Yes 跳頁
yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});

// 👉 No 逃跑（維持原本玩法）
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton, { passive: false });

// 👉 音樂需要互動才能播
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });

// 👉 初始位置（右邊）
window.addEventListener("load", () => {
  noBtn.style.left = `${buttonsWrap.clientWidth - noBtn.offsetWidth}px`;
  noBtn.style.top = "40px";
  noBtn.style.right = "auto";
});
