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
        "Are you sure? 😳",
        "That hurts a little 😢",
        "You don’t like me anymore? 🥹",
        "Okay… now I’m sad 😭",
        "Wait… don’t do this 😣",
        "Fine 😤 I’m running away!"
    ];

    const yesTease = [
        "Wait… too fast 😳",
        "You need to try harder 😏",
        "I need a bit more time 💭",
        "You’re rushing me 😝",
        "Not convinced yet 😌",
        "Keep going~ you’re close 💕"
    ];

    let noIndex = 0;
    let yesIndex = 0;
    let runawayEnabled = false;
    let toastTimer = null;
    let musicStarted = false;
    let runawayTimer = null;
    let stickyToastActive = false;

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

    function showToast(msg) {
        stickyToastActive = false;
        toast.textContent = msg;
        toast.classList.add("show");

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            if (!stickyToastActive) {
                toast.classList.remove("show");
            }
        }, 17000);
    }

    function showStickyToast(msg) {
        stickyToastActive = true;
        clearTimeout(toastTimer);
        toast.textContent = msg;
        toast.classList.add("show");
    }

    function clearStickyToast() {
        stickyToastActive = false;
        clearTimeout(toastTimer);
        toast.classList.remove("show");
    }

    function setButtonSizes(stageProgress) {
        const yesFont = 1.02 + stageProgress * 0.42;
        const noFont = 1.02 - stageProgress * 0.20;

        const yesPadY = 13 + stageProgress * 5;
        const yesPadX = 26 + stageProgress * 10;

        const noPadY = Math.max(8, 13 - stageProgress * 3);
        const noPadX = Math.max(16, 26 - stageProgress * 6);

        const yesMinWidth = 128 + stageProgress * 24;
        const noMinWidth = Math.max(90, 128 - stageProgress * 26);

        const yesMinHeight = 54 + stageProgress * 4;
        const noMinHeight = Math.max(40, 54 - stageProgress * 8);

        const yesRadius = 16 + stageProgress * 2;
        const noRadius = Math.max(10, 16 - stageProgress * 3);

        yesBtn.style.fontSize = `${yesFont}rem`;
        yesBtn.style.padding = `${yesPadY}px ${yesPadX}px`;
        yesBtn.style.minWidth = `${yesMinWidth}px`;
        yesBtn.style.minHeight = `${yesMinHeight}px`;
        yesBtn.style.borderRadius = `${yesRadius}px`;

        noBtn.style.fontSize = `${noFont}rem`;
        noBtn.style.padding = `${noPadY}px ${noPadX}px`;
        noBtn.style.minWidth = `${noMinWidth}px`;
        noBtn.style.minHeight = `${noMinHeight}px`;
        noBtn.style.borderRadius = `${noRadius}px`;
    }

    function placeNoNeatly() {
        const wrapRect = buttonsWrap.getBoundingClientRect();
        const yesRect = yesBtn.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth;
        const gap = 8;

        const yesRightInsideWrap = yesRect.right - wrapRect.left;
        let left = yesRightInsideWrap + gap;
        const maxLeft = wrapRect.width - btnWidth - 4;

        if (left > maxLeft) left = maxLeft;
        if (left < 0) left = 0;

        noBtn.style.position = "absolute";
        noBtn.style.left = `${left}px`;
        noBtn.style.top = "50%";
        noBtn.style.transform = "translateY(-50%)";
    }

    function moveNo(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        noBtn.textContent = "No 😏 Catch me!";

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        const paddingX = 16;
        const paddingTop = 90;
        const paddingBottom = 80;

        const areaWidth = window.innerWidth - paddingX * 2;
        const areaHeight = window.innerHeight - paddingTop - paddingBottom;

        const maxLeft = Math.max(1, areaWidth - btnWidth);
        const maxTop = Math.max(1, areaHeight - btnHeight);

        const left = paddingX + Math.random() * maxLeft;
        const top = paddingTop + Math.random() * maxTop;

        noBtn.style.position = "fixed";
        noBtn.style.left = `${left}px`;
        noBtn.style.top = `${top}px`;
        noBtn.style.transform = "none";
    }

    function enableRunaway() {
        showStickyToast("Now only Yes works 😌");

        noBtn.addEventListener("mouseover", moveNo);
        noBtn.addEventListener("pointerdown", moveNo);
        noBtn.addEventListener("touchstart", moveNo, { passive: false });

        runawayTimer = setInterval(moveNo, 200);

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

        clearStickyToast();
        showToast("💖");

        if (runawayTimer) clearInterval(runawayTimer);

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
                placeNoNeatly();
            });
        }

        if (stage === lastStage && !runawayEnabled) {
            runawayEnabled = true;
            enableRunaway();
        }
    });

    window.addEventListener("load", () => {
        setButtonSizes(0);
    });
});
