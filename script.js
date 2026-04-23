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
// TEXT
// =========================
const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This actually hurts… 🥀",
    "Okay… I’m running away 😭",
    "Catch me no way 😏"
]

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
let musicStarted = false

// =========================
// MUSIC
// =========================
function startMusic() {
    if (!music || musicStarted) return
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
// YES
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    if (!runawayEnabled) {
        showToast(yesTease[yesIndex % yesTease.length])
        yesIndex++
        return
    }

    showToast("Okay… 💖")

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 800)
})

// =========================
// NO
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    const stage = Math.min(noIndex, gifStages.length - 1)

    // ⭐ 強制刷新 GIF（修電腦不更新）
    catGif.src = gifStages[stage] + "?v=" + Date.now()

    showToast(noMessages[stage])

    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.08, 52) + "px"

    // ⭐ 最後一階段才開 runaway
    if (stage === gifStages.length - 1 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
})

// =========================
// RUNAWAY
// =========================
function enableRunaway() {

    showToast("Catch me no way 😏")

    // 💻 電腦
    noBtn.addEventListener("mouseenter", runAway)

    // 📱 手機（穩定版）
    noBtn.addEventListener("pointerdown", runAway)
}

// =========================
// MOVE BUTTON + TEXT (修正版)
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

    // 💬 避免重疊 + 自動避開畫面
    if (runawayText) {

        runawayText.textContent = "Catch me no way 😏"

        runawayText.style.position = "fixed"
        runawayText.style.zIndex = "1000"
        runawayText.style.transition = "0.2s ease"

        let tx = x + rect.width + 20
        let ty = y - 30

        // 防止出界
        if (tx > window.innerWidth - 120) tx = x - 120
        if (ty < 10) ty = y + rect.height + 20

        runawayText.style.left = tx + "px"
        runawayText.style.top = ty + "px"
    }
}

})
