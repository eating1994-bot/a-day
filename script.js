document.addEventListener("DOMContentLoaded", () => {
  const catGif = document.getElementById("cat-gif");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const music = document.getElementById("bg-music");
  const toast = document.getElementById("tease-toast");
  const buttonsWrap = document.getElementById("buttons-wrap");
  const musicToggle = document.getElementById("music-toggle");

  if (!yesBtn || !noBtn || !catGif || !buttonsWrap) return;

  const gifStages = [
    "https://media.tenor.com/r_2wMCBMnesAAAAi/bubu-bubu-dudu-love.gif",
    "https://media.tenor.com/sogH3VkgFVEAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/jK5dZwjdK6kAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/QOztKKB0fSEAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/Q9VuGIKQqEMAAAAi/love-bear.gif",
    "https://media.tenor.com/U_C0g0kIAMIAAAAi/bubu-bubu-dudu.gif",
    "https://media.tenor.com/sWXhCC4A2woAAAAi/bubu-bubu-dudu.gif",
    "https://media.tenor.com/2gyJjtOUFMcAAAAi/sseeyall-bubu-dudu.gif"
  ];

  const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This actually hurts… 🥀",
    "Okay… I’m scared 😭",
    "I think I’ll run away… 😶‍🌫️"
  ];

  const yesTease = [
    "Wait… too fast 😳",
    "Not so easy~ 😌",
    "You’re impatient huh 😏",
    "I like your effort 💕",
    "Almost there… 💖",
    "But not yet 😌"
  ];

  let noIndex = 0;
  let yesIndex = 0;
  let runawayEnabled = false;

  function startMusic() {
    if (!music) return;
    music.volume = 0.3;
    music.play().catch(() => {});
  }

  function toggleMusic() {
    if (!music) return;

    if (music.paused) {
      music.play().then(() => {
        music.volume = 0.3;
        if (musicToggle) musicToggle.textContent = "🔊";
      }).catch(() => {});
    } else {
      music.pause();
      if (musicToggle) musicToggle.textContent = "🔇";
    }
  }

  window.toggleMusic = toggleMusic;
  document.addEventListener("click", startMusic, { once: true });

  function showToast(msg) {
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add("show");

    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  }

  function keepNoAwayFromYes() {
    const wrapRect = buttonsWrap.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;

    const yesRightInsideWrap = yesRect.right - wrapRect.left;
    const gap = 16;

    let left = yesRightInsideWrap + gap;
    const maxLeft = wrapRect.width - btnWidth;

    if (left > maxLeft) left = maxLeft;

    noBtn.style.position = "absolute";
    noBtn.style.left = `${left}px`;
    noBtn.style.top = "50%";
    noBtn.style.transform = "translateY(-50%)";
    noBtn.style.right = "auto";
  }

  function moveNo(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    noBtn.textContent = "Catch me no way 😏";

    const wrapWidth = buttonsWrap.clientWidth;
    const wrapHeight = buttonsWrap.clientHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const padding = 6;
    const maxLeft = Math.max(1, wrapWidth - btnWidth - padding);
    const maxTop = Math.max(1, wrapHeight - btnHeight - padding);

    const left = padding + Math.random() * maxLeft;
    const top = padding + Math.random() * maxTop;

    noBtn.style.position = "absolute";
    noBtn.style.left = `${left}px`;
    noBtn.style.top = `${top}px`;
    noBtn.style.transform = "none";
    noBtn.style.right = "auto";
  }

  function enableRunaway() {
    showToast("No way 🤓");

    noBtn.addEventListener("mouseenter", moveNo);
    noBtn.addEventListener("pointerdown", moveNo);
    noBtn.addEventListener("touchstart", moveNo, { passive: false });

    moveNo();
  }

  yesBtn.addEventListener("click", () => {
    startMusic();

    if (!runawayEnabled) {
      yesIndex++;

      if (yesIndex >= yesTease.length) {
        showToast("Try clicking NO 👀");
        yesIndex = yesTease.length - 1;
        return;
      }

      showToast(yesTease[yesIndex]);
      return;
    }

    showToast("Okay… 💖");

    setTimeout(() => {
      window.location.href = "yes.html";
    }, 800);
  });

  noBtn.addEventListener("click", () => {
    startMusic();

    noIndex++;

    const lastStage = gifStages.length - 1;
    const stage = Math.min(noIndex, lastStage);

    catGif.src = gifStages[stage] + "?v=" + Date.now();
    showToast(noMessages[stage]);

    const baseSize = 24;
    const maxSize = 68;
    const progress = noIndex / lastStage;
    const eased = Math.pow(progress, 1.4);
    const newSize = baseSize + (maxSize - baseSize) * eased;

    yesBtn.style.fontSize = `${newSize}px`;

    if (!runawayEnabled) {
      requestAnimationFrame(() => {
        keepNoAwayFromYes();
      });
    }

    if (stage === lastStage && !runawayEnabled) {
      runawayEnabled = true;
      enableRunaway();
    }
  });

  window.addEventListener("load", () => {
    keepNoAwayFromYes();
  });
});
