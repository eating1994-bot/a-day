document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const musicToggle = document.getElementById('music-toggle')

if (!yesBtn || !noBtn) return

// =========================
// 🎬 GIF STAGES
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
// 💖 YES TEASE (8+句)
// =========================
const yesTeasePokes = [
    "Wait… you’re being too fast 😳",
    "Hmm? Already YES? I didn’t even tease you 😏",
    "Not so easy~ I like being chased 😌",
    "You really want me that much? 💕",
    "I’m still thinking… 👀",
    "You’re cute when you’re impatient 😳",
    "Convince me a bit more~ 💖",
    "I might say yes… maybe 😏",
    "You think it's that easy? 😌",
    "You’re making me shy 🥺"
]

// =========================
// 💔 NO MESSAGES
// =========================
const noMessages = [
    "No… really? 🥺",
    "That hurts a little 😢",
    "Why would you do that 💔",
    "I thought you liked me… 😭",
    "I’m getting sad now 🥀",
    "Okay… I feel like running away 😭"
]

// =========================
// STATE
// =========================
let yesIndex = 0
let noIndex = 0
let musicStarted = false
let runawayEnabled = false

// =========================
// 🎵 MUSIC
// =========================
function startMusic() {
    if (!music || musicStarted) return
    music.volume = 0.3
    music.play().then(() => musicStarted = true).catch(() => {})
}

document.addEventListener("click", startMusic, { once: true })

window.toggleMusic = function () {
    if (!music) return
    if (music.paused) {
        music.play()
        musicToggle.textContent = "🔊"
    } else {
        music.pause()
        musicToggle.textContent = "🔇"
    }
}

// =========================
// 💖 YES CLICK
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    showToast(yesTeasePokes[yesIndex % yesTeasePokes.length])
    yesIndex++
})

// =========================
// 💔 NO CLICK (完全修正版)
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    const stage = noIndex

    // ⭐ 還沒到最後
    if (stage < gifStages.length - 1) {

        showToast(noMessages[Math.min(stage, noMessages.length - 1)])

        if (catGif) {
            catGif.src = gifStages[stage]
        }

        // YES 變大
        const size = parseFloat(getComputedStyle(yesBtn).fontSize)
        yesBtn.style.fontSize = Math.min(size * 1.08, 52) + "px"

        noIndex++

        // 最後前一階開 runaway
        if (stage === gifStages.length - 2 && !runawayEnabled) {
            enableRunaway()
            runawayEnabled = true
        }

        return
    }

    // ⭐ 最後 NO
    showToast("You’ve reached the end… 😏")

    enableRunaway()
})

// =========================
// 🏃 RUNAWAY
// =========================
function enableRunaway() {

    showToast("Catch me if you can 😏")

    noBtn.addEventListener("mouseenter", runAway)
    noBtn.addEventListener("touchstart", runAway, { passive: true })
}

function runAway() {

    const rect = noBtn.getBoundingClientRect()

    const x = Math.random() * (window.innerWidth - rect.width - 20)
    const y = Math.random() * (window.innerHeight - rect.height - 20)

    noBtn.style.position = "fixed"
    noBtn.style.left = x + "px"
    noBtn.style.top = y + "px"
    noBtn.style.zIndex = "999"
    noBtn.style.transition = "0.15s ease"
}

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

})
