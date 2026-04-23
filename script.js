document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')

// ⚠️ runaway text（安全）
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
// YES
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

        // 💖 變大
        const size = parseFloat(getComputedStyle(yesBtn).fontSize)
        yesBtn.style.fontSize = Math.min(size * 1.15, 80) + "px"

        return
    }

    showToast("Okay… 💖")

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 800)
})

// =========================
// NO（主線）
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    const stage = Math.min(noIndex, gifStages.length - 1)

    catGif.src = gifStages[stage] + "?v=" + Date.now()

    showToast(noMessages[stage])

    // 💖 YES 也變大
    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.12, 80) + "px"

    // 🏃 最後 NO 才開 runaway
    if (stage === gifStages.length - 1 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
})

// =========================
// RUNAWAY（穩定版）
// =========================
function enableRunaway() {

    showToast("Catch me no way 😏")

    // 電腦
    noBtn.addEventListener("mouseenter", moveNo)

    // 手機（touch + pointer）
    noBtn.addEventListener("pointerdown", moveNo)
}

// =========================
// MOVE BUTTON（防重疊 + 手機穩定）
// =========================
function moveNo() {

    const rect = noBtn.getBoundingClientRect()

    const maxX = window.innerWidth - rect.width - 20
    const maxY = window.innerHeight - rect.height - 20

    const x = Math.max(10, Math.random() * maxX)
    const y = Math.max(10, Math.random() * maxY)

    noBtn.style.position = "fixed"
    noBtn.style.left = x + "px"
    noBtn.style.top = y + "px"
    noBtn.style.zIndex = "999"
    noBtn.style.transition = "0.15s ease"

    // 💬 runaway text（不會重疊）
    if (runawayText) {

        runawayText.textContent = "Catch me no way 😏"

        runawayText.style.position = "fixed"
        runawayText.style.zIndex = "1000"
        runawayText.style.pointerEvents = "none"

        let tx = x + rect.width + 15
        let ty = y - 25

        if (tx > window.innerWidth - 120) tx = x - 120
        if (ty < 10) ty = y + rect.height + 15

        runawayText.style.left = tx + "px"
        runawayText.style.top = ty + "px"
    }
}

})