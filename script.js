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
// 💬 YES TEASE（已加3句 + 更合理戀愛邏輯）
// =========================
const yesTeasePokes = [
    "Wait… you’re going too fast 😳",
    "Hmm? You really want YES that badly? 😏",
    "Not so easy~ 😌",
    "You didn’t even play with me yet 👀",
    "Almost there… but not yet 💖",

    // ✨ 新增
    "You’re getting impatient huh? 😏",
    "I like how determined you are 💕",
    "But I still wanna tease you a bit more 😌"
]

// =========================
// 💔 NO
// =========================
const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This actually hurts… 🥀",
    "Okay… I might run away 😭"
]

// =========================
// ELEMENTS
// =========================
let yesIndex = 0
let noIndex = 0
let musicStarted = false

// =========================
// 🎵 MUSIC
// =========================
function startMusic() {
    if (!music || musicStarted) return
    music.volume = 0.3
    music.play().then(() => {
        musicStarted = true
    }).catch(() => {})
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
// 💖 YES
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    showToast(yesTeasePokes[yesIndex % yesTeasePokes.length])
    yesIndex++
})

// =========================
// 💔 NO（核心修正版）
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    const lastIndex = noMessages.length

    // ⭐ 最後一次 NO → 跳轉
    if (noIndex >= lastIndex) {

        showToast("Catch me if you can 😏")

        setTimeout(() => {
            window.location.href = "yes.html"
        }, 900)

        return
    }

    // 💬 一般 NO
    showToast(noMessages[noIndex - 1] + " 💔")

    // 🎬 GIF 一定會變（已修 cache 問題）
    if (catGif) {
        catGif.src = gifStages[Math.min(noIndex - 1, gifStages.length - 1)] + "?v=" + Date.now()
    }

    // 💖 YES 變大
    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.08, 52) + "px"
})

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
