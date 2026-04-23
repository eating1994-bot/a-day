document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const musicToggle = document.getElementById('music-toggle')

if (!yesBtn || !noBtn) return

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
// 💖 YES 台詞（每次點）
// =========================
const yesTease = [
    "Wait… too fast 😳",
    "Hmm? You like me that much? 😏",
    "Not so easy~ 😌",
    "You’re getting impatient huh 💕",
    "I like teasing you 😏"
]

// =========================
// 💔 NO 台詞
// =========================
const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 💔",
    "Please don’t 😢",
    "It hurts a little… 🥀",
    "I’m getting sad… 😭"
]

// =========================
// STATE
// =========================
let yesIndex = 0
let noIndex = 0
let musicStarted = false

// =========================
// MUSIC
// =========================
function startMusic() {
    if (!music || musicStarted) return
    music.volume = 0.3
    music.play().then(() => musicStarted = true).catch(() => {})
}

document.addEventListener("click", startMusic, { once: true })

// =========================
// TOAST
// =========================
function showToast(msg) {
    toast.textContent = msg
    toast.classList.add("show")

    clearTimeout(toast._t)
    toast._t = setTimeout(() => {
        toast.classList.remove("show")
    }, 2000)
}

// =========================
// 💖 YES（只對話，不跳頁）
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    showToast(yesTease[yesIndex % yesTease.length])
    yesIndex++
})

// =========================
// 💔 NO（推進劇情）
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    // ⭐ 最後一張
    if (noIndex >= noMessages.length - 1) {

        showToast("Catch me if you can 😏")

        setTimeout(() => {
            window.location.href = "yes.html"
        }, 900)

        return
    }

    // 💬 一般 NO
    showToast(noMessages[noIndex])

    // 🎬 換圖
    catGif.src = gifStages[noIndex] + "?t=" + Date.now()

    noIndex++

})

})
