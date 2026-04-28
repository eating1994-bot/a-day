document.addEventListener("DOMContentLoaded", () => {
    const catGif = document.getElementById("cat-gif");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const music = document.getElementById("bg-music");
    const toast = document.getElementById("tease-toast");
    const buttonsWrap = document.getElementById("buttons-wrap");
    const musicToggle = document.getElementById("music-toggle");

    if (!yesBtn || !noBtn || !catGif || !buttonsWrap || !music || !toast) return;

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
    let toastTimer = null;
    let musicStarted = false;

    function startMusic() {
        if (musicStarted) return;
        music.volume = 0.3;
        music.play().then(() => {
            musicStarted = true;
            if (musicToggle) musicToggle.textContent = "🔊";
        }).catch(() => {});
    }

    function toggleMusic() {
        if (music.paused) {
            music.play().then(() => {
                music.volume = 0.3;
                musicStarted = true;
                if (musicToggle) musicToggle.textContent = "🔊";
            }).catch(() => {});
        } else {
            music.pause();
            if (musicToggle) musicToggle.textContent = "🔇";
        }
    }

    window.toggleMusic = toggleMusic;

    document.addEventListener("click", startMusic, { once: true });

    if (musicToggle) {
        musicToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMusic();
        });
    }

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add("show");

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 1800);
    }

    function setButtonSizes(stageProgress) {
        const yesFont = 1.1 + stageProgress * 0.38;   // rem
        const noFont = 1.1 - stageProgress * 0.3;     // rem

        const yesPadY = 13 + stageProgress * 4;       // px
        const yesPadX = 28 + stageProgress * 8;

        const noPadY = Math.max(8, 13 - stageProgress * 5);
        const noPadX = Math.max(14, 28 - stageProgress * 10);

        yesBtn.style.fontSize = `${yesFont}rem`;
        yesBtn.style.padding = `${yesPadY}px ${yesPadX}px`;

        noBtn.style.fontSize = `${noFont}rem`;
        noBtn.style.padding = `${noPadY}px ${noPadX}px`;
    }

    function keepNoAwayFromYes() {
        const wrapRect = buttonsWrap.getBoundingClientRect();
        const yesRect = yesBtn.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth;
        const gap = 12;

        const yesRightInsideWrap = yesRect.right - wrapRect.left;
        let left = yesRightInsideWrap + gap;
        const maxLeft = wrapRect.width - btnWidth - 4;

        if (left > maxLeft) left = maxLeft;
        if (left < 0) left = 0;

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

        const padding = 8;
        const maxLeft = Math.max(1, wrapWidth - btnWidth - padding * 2);
        const maxTop = Math.max(1, wrapHeight - btnHeight - padding * 2);

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
        const progress = stage / lastStage;

        catGif.src = `${gifStages[stage]}?v=${Date.now()}`;
        showToast(noMessages[stage]);

        setButtonSizes(progress);

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
        setButtonSizes(0);
        keepNoAwayFromYes();
    });
});
