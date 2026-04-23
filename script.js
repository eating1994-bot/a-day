document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById("cat-gif")
const yesBtn = document.getElementById("yes-btn")
const noBtn = document.getElementById("no-btn")
const music = document.getElementById("bg-music")
const toast = document.getElementById("tease-toast")
const musicToggle = document.getElementById("music-toggle")

if (!yesBtn || !noBtn || !catGif) return

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
// 💖 YES TEASE (8+)
// =========================
const yesTeasePokes = [
    "Wait… you’re going too fast 😳",
    "Hmm? You really want YES that badly? 😏",
    "Not so easy~ 😌",
    "You didn’t even play with me yet 👀",
    "Almost there… but not yet 💖",
    "You’re getting impatient huh? 😏",
    "I like how determined you are 💕",
    "But I still wanna tease you a bit more 😌",
    "If I say yes too early… it’s boring 😳",
    "You need to work a little harder 😏"
]

// =========================
// 💔 NO MESSAGES
// =========================
const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This actually hurts… 🥀",
    "I feel like I’m disappearing… 😭",
    "Okay… I’m starting to run away 💨",
    "Last chance… 😔"
]

// =========================
// STATE
// =========================
let yesIndex = 0
let noIndex = 0
let musicStarted = false
let runawayEnabled = false

const maxIndex = gifStages.length - 1

// =========================
// MUSIC
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
// 💖 YES BUTTON
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    // ❗ 前期：一直 tease，不讓你太早贏
    if (noIndex < maxIndex) {
        showToast(yesTeasePokes[yesIndex % yesTeasePokes.length])
        yesIndex++
        return
    }

    // ❗ 最後才可以結局
    showToast("…okay 💖 I waited long enough")

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 900)
})

// =========================
// 💔 NO BUTTON
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    // ❗ 每次 NO 都會變圖（修你 bug）
    if (noIndex < maxIndex) {

        showToast(noMessages[noIndex])

        catGif.src = gifStages[noIndex] + "?v=" + Date.now()

        noIndex++

        // YES 變大（壓力感）
        const size = parseFloat(getComputedStyle(yesBtn).fontSize)
        yesBtn.style.fontSize = Math.min(size * 1.08, 52) + "px"

        return
    }

    // =========================
    // 🏃 最後 NO 才 runaway
    // =========================
    if (!runawayEnabled) {

        showToast("Catch me if you can 😏")

        enableRunaway()
        runawayEnabled = true
    }
})

// =========================
// 🏃 RUNAWAY (only last stage)
// =========================
function enableRunaway() {

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
