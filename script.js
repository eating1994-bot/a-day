document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const musicToggle = document.getElementById('music-toggle')

if (!yesBtn || !noBtn) return

// =========================
// 🎬 GIF（每次 NO 都會換）
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
// 💖 YES teasing（8+句，合理戀愛互動）
// =========================
const yesTeasePokes = [
    "Wait… you’re being a little too eager 😳",
    "Hmm? Already YES? I didn’t even tease you yet 😏",
    "Not so fast~ I like to be courted properly 😌",
    "You really like me that much huh? 💕",
    "I’m still deciding… don’t rush me 👀",
    "You’re cute when you’re impatient 😳",
    "Convince me a little more~ 💖",
    "I might say yes… if you behave 😏",
    "You think it’s that easy? 😌",
    "You’re making my heart flutter… but wait 😳"
]

// =========================
// 💔 NO messages（每次遞進）
// =========================
const noMessages = [
    "No… really? 🥺",
    "Ouch… that hurts 😢",
    "Why would you do that 💔",
    "I thought you liked me… 😭",
    "I’m starting to feel sad 🥀",
    "Okay… I’m really hurt now 💔"
]

// =========================
// STATE
// =========================
let yesIndex = 0
let noIndex = 0
let musicStarted = false
let runawayEnabled = false

const maxStage = gifStages.length - 1

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
// 💖 YES CLICK（永遠只是 tease）
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    showToast(yesTeasePokes[yesIndex % yesTeasePokes.length])
    yesIndex++
})

// =========================
// 💔 NO CLICK（推進劇情）
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    // 如果還沒到最後階段
    if (noIndex < maxStage) {

        showToast(noMessages[Math.min(noIndex, noMessages.length - 1)])

        if (catGif) {
            catGif.src = gifStages[noIndex]
        }

        noIndex++

        // YES 變大（心理壓力😏）
        const size = parseFloat(getComputedStyle(yesBtn).fontSize)
        yesBtn.style.fontSize = Math.min(size * 1.08, 52) + "px"

        // 到最後一階才開 runaway
        if (noIndex === maxStage && !runawayEnabled) {
            enableRunaway()
            runawayEnabled = true
        }

        return
    }

    // =========================
    // ⭐ 最後階段：不再進劇情
    // =========================
    showToast("You’ve pushed me to the edge… 😏")

    enableRunaway()
})

// =========================
// 🏃 RUNAWAY（只最後一張才開）
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
