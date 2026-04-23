document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const runawayText = document.getElementById('runaway-text')

if (!yesBtn || !noBtn || !catGif) return

// =========================
// 🎬 GIF
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
// 💬 文案
// =========================
const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This actually hurts… 🥀",
    "Okay… I’m scared 😭",
    "I think I’ll run away… 😢"
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

// =========================
// 🎵 音樂
// =========================
function startMusic() {
    if (!music) return
    music.volume = 0.3
    music.play().catch(() => {})
}

document.addEventListener("click", startMusic, { once: true })

// =========================
// 💬 TOAST
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
// 💖 YES（不再變大）
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    if (!runawayEnabled) {

        yesIndex++

        if (yesIndex >= yesTease.length) {
            showToast("Try clicking NO 😏")
            yesIndex = yesTease.length - 1
            return
        }

        showToast(yesTease[yesIndex])
        return
    }

    // ⭐ 最後才進結局
    showToast("Okay… 💖")

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 800)
})

// =========================
// 💔 NO（推進主線 + YES變大）
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    const stage = Math.min(noIndex, gifStages.length - 1)

    // 🎬 換圖（防 cache）
    catGif.src = gifStages[stage] + "?v=" + Date.now()

    // 💬 對話
    showToast(noMessages[stage])

    // ⭐ 只有 NO 才讓 YES 變大
    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.15, 80) + "px"
    yesBtn.style.transition = "0.2s ease"

    // ⭐ 最後才開 runaway
    if (stage === gifStages.length - 1 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
})

// =========================
// 🏃 RUNAWAY（不破版版本）
// =========================
function enableRunaway() {

    showToast("Catch me no way 😏")

    noBtn.addEventListener("mouseenter", moveNo)
    noBtn.addEventListener("pointerdown", moveNo)
}

// =========================
// MOVE（用 % 不會破版）
// =========================
function moveNo() {

    const x = Math.random() * 80 + 10
    const y = Math.random() * 80 + 10

    noBtn.style.position = "absolute"
    noBtn.style.left = x + "%"
    noBtn.style.top = y + "%"
    noBtn.style.transform = "translate(-50%, -50%)"

    // 💬 文字（避免重疊）
    if (runawayText) {
        runawayText.textContent = "Catch me no way 😏"
        runawayText.style.position = "absolute"
        runawayText.style.left = (x + 5) + "%"
        runawayText.style.top = (y - 5) + "%"
    }
}

})