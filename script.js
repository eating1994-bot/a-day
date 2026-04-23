document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const runawayText = document.getElementById('runaway-text')

if (!yesBtn || !noBtn || !catGif) return

// =========================
// GIF
// =========================
const gifStages = [
    "https://media.tenor.com/r_2wMCBMnesAAAAi/bubu-bubu-dudu-love.gif",
    "https://media.tenor.com/sogH3VkgFVEAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/jK5dZwjdK6kAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/QOztKKB0fSEAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/Q9VuGIKQqEMAAAAi/love-bear.gif",
    "https://media.tenor.com/U_C0g0kIAMIAAAAi/bubu-bubu-dudu.gif",
    "https://media.tenor.com/sWXhCC4A2woAAAAi/bubu-bubu-dudu.gif",
    "https://media.tenor.com/2gyJjtOUFMcAAAAi/sseeyall-bubu-dudu.gif"
]

// =========================
// NO TEXT
// =========================
const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This actually hurts… 🥀",
    "Okay… I’m getting scared 😭",
    "I think I’m really going to run away… 😢"
]

// =========================
// YES TEASE
// =========================
const yesTease = [
    "Wait… too fast 😳",
    "Not so easy~ 😌",
    "You’re impatient huh 😏",
    "I like your effort 💕",
    "Almost there… 💖",
    "But not yet 😌"
]

// =========================
// STATE
// =========================
let noIndex = 0
let yesIndex = 0
let runawayEnabled = false

// YES 成長控制
let yesBaseSize = 24

// =========================
// MUSIC
// =========================
function startMusic() {
    if (!music) return
    music.volume = 0.3
    music.play().catch(() => {})
}

document.addEventListener("click", startMusic, { once: true })

// =========================
// TOAST
// =========================
function showToast(msg) {
    if (!toast) return

    toast.textContent = msg
    toast.classList.add("show")

    clearTimeout(toast._t)
    toast._t = setTimeout(() => {
        toast.classList.remove("show")
    }, 2000)
}

// =========================
// 💖 YES（升級：變大 + 有終點 + 跳動）
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    // ⭐ runaway 前 YES 循環
    if (!runawayEnabled) {

        yesIndex++

        const last = yesTease.length - 1

        // 👉 終點提示（不再變）
        if (yesIndex > last) {

            showToast("You really like YES huh 😏 but try NO for once 💔")

            yesIndex = last
            return
        }

        showToast(yesTease[yesIndex])

        // ⭐ YES 變大（升級版）
        const size = parseFloat(getComputedStyle(yesBtn).fontSize)
        yesBtn.style.fontSize = Math.min(size * 1.18, 80) + "px"

        // ⭐ 跳動效果
        yesBtn.style.transform = "scale(1.06)"
        setTimeout(() => {
            yesBtn.style.transform = "scale(1)"
        }, 150)

        return
    }

    // ⭐ 結局
    showToast("Okay… 💖")

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 800)
})

// =========================
// 💔 NO（主線）
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    const lastStage = gifStages.length - 1
    const stage = Math.min(noIndex, lastStage)

    // ⭐ GIF 更新
    catGif.src = gifStages[stage] + "?v=" + Date.now()

    // ⭐ 對話
    if (stage < lastStage) {
        showToast(noMessages[stage])
    } else {
        showToast("I think I'm really going to run away… 😭")
    }

    // ⭐ YES 也變大（NO影響）
    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.12, 80) + "px"

    yesBtn.style.transform = "scale(1.05)"
    setTimeout(() => {
        yesBtn.style.transform = "scale(1)"
    }, 150)

    // ⭐ 最後 NO 才開 runaway
    if (stage === lastStage && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
})

// =========================
// RUNAWAY
// =========================
function enableRunaway() {

    showToast("Catch me no way 😏")

    noBtn.addEventListener("mouseenter", runAway)
    noBtn.addEventListener("pointerdown", runAway)
}

// =========================
// MOVE BUTTON + TEXT
// =========================
function runAway() {

    const rect = noBtn.getBoundingClientRect()

    const x = Math.random() * (window.innerWidth - rect.width - 40)
    const y = Math.random() * (window.innerHeight - rect.height - 40)

    noBtn.style.position = "fixed"
    noBtn.style.left = x + "px"
    noBtn.style.top = y + "px"
    noBtn.style.zIndex = "999"
    noBtn.style.transition = "0.15s ease"

    if (runawayText) {

        runawayText.textContent = "Catch me no way 😏"

        runawayText.style.position = "fixed"
        runawayText.style.zIndex = "1000"

        let tx = x + rect.width + 20
        let ty = y - 30

        if (tx > window.innerWidth - 120) tx = x - 120
        if (ty < 10) ty = y + rect.height + 20

        runawayText.style.left = tx + "px"
        runawayText.style.top = ty + "px"
    }
})