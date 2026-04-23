document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const runawayText = document.getElementById('runaway-text')

if (!yesBtn || !noBtn || !catGif) {
    console.error("Missing core elements")
    return
}

// =========================
// 🎵 音樂（獨立安全版）
// =========================
function startMusic() {
    if (!music) return
    music.volume = 0.3
    music.play().catch(() => {})
}

// 👉 保證任何 click 都能觸發（不依賴其他 JS）
document.addEventListener("click", () => {
    startMusic()
}, { once: true })

// =========================
// TOAST（安全）
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
// DATA
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

const noMessages = [
    "No… 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This hurts… 🥀",
    "I’m scared 😭",
    "I think I’ll run away… 😢"
]

const yesTease = [
    "Wait… 😳",
    "Not so easy~ 😌",
    "You’re impatient 😏",
    "I like your effort 💕",
    "Almost there 💖",
    "But not yet 😌"
]

// =========================
// STATE
// =========================
let noIndex = 0
let yesIndex = 0
let runawayEnabled = false

// =========================
// YES
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    if (!runawayEnabled) {

        yesIndex++

        if (yesIndex >= yesTease.length) {
            showToast("Try NO 😏")
            yesIndex = yesTease.length - 1
            return
        }

        showToast(yesTease[yesIndex])

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
// NO
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    const stage = Math.min(noIndex, gifStages.length - 1)

    catGif.src = gifStages[stage] + "?v=" + Date.now()

    showToast(noMessages[stage])

    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.12, 80) + "px"

    if (stage === gifStages.length - 1 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
})

// =========================
// RUNAWAY（安全版）
// =========================
function enableRunaway() {

    showToast("Catch me 😏")

    noBtn.addEventListener("mouseenter", moveNo)
    noBtn.addEventListener("pointerdown", moveNo)
}

// =========================
// MOVE SAFE
// =========================
function moveNo() {

    if (!noBtn) return

    const rect = noBtn.getBoundingClientRect()

    const x = Math.random() * (window.innerWidth - rect.width - 20)
    const y = Math.random() * (window.innerHeight - rect.height - 20)

    noBtn.style.position = "fixed"
    noBtn.style.left = x + "px"
    noBtn.style.top = y + "px"
    noBtn.style.zIndex = "999"

    if (runawayText) {
        runawayText.textContent = "Catch me 😏"
        runawayText.style.position = "fixed"
        runawayText.style.zIndex = "1000"
        runawayText.style.left = (x + 40) + "px"
        runawayText.style.top = (y - 20) + "px"
    }
}

})