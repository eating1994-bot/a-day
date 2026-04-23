document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')

if (!yesBtn || !noBtn) return

// =========================
// 🎬 GIF（全部都會輪到）
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
// 💖 YES（變成撩人 + 不會太快結束）
// =========================
const yesTeasePokes = [
    "Wait… that was too easy 😳",
    "Hmm? No hesitation at all? 😏",
    "You didn’t even think about it 👀",
    "Are you sure? I might tease you more 😌",
    "Okay… but I’m watching you 💕",
    "You really like me huh 😳",
    "Careful… I might fall for you too fast 💖"
]

// =========================
// 💔 NO（變成假哭 + 好玩，不是虐）
// =========================
const noMessages = [
    "Oh no… I’m hurt 😢 (just kidding)",
    "You said NO… I’ll pretend I’m crying 🥺",
    "That was mean… or was it? 😏",
    "I’m going to be dramatic now 💔✨",
    "Why are you doing this to me 😤 (I’m fine)",
    "Okay… I’m slowly walking away 👀"
]

// =========================
// 🏃 最後 NO 才會出現
// =========================
const lastNoMessage = "Okay… this time I’m really leaving 😳 catch me if you can haha 😏"

// =========================
// STATE
// =========================
let yesIndex = 0
let noIndex = 0
let runawayEnabled = false
let musicStarted = false

// =========================
// 🎵 音樂
// =========================
function startMusic() {
    if (!music || musicStarted) return
    music.volume = 0.3
    music.play().then(() => {
        musicStarted = true
    }).catch(() => {})
}

document.addEventListener("click", startMusic, { once: true })

// =========================
// 🔊 toggle
// =========================
window.toggleMusic = function () {
    if (!music) return
    if (music.paused) {
        music.play()
        document.getElementById('music-toggle').textContent = "🔊"
    } else {
        music.pause()
        document.getElementById('music-toggle').textContent = "🔇"
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
// 💔 NO CLICK
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    const lastIndex = noMessages.length - 1

    // 🧠 最後 NO 特別處理
    if (noIndex > lastIndex) {
        showToast(lastNoMessage)

        if (!runawayEnabled) {
            enableRunaway()
            runawayEnabled = true
        }
        return
    }

    // 💬 一般 NO
    const msg1 = noMessages[noIndex - 1]
    const msg2 = "😏"
    showToast(msg1 + " " + msg2)

    // 🎬 GIF 永遠輪
    if (catGif) {
        catGif.src = gifStages[noIndex % gifStages.length]
    }

    // 💖 YES 變大（輕微成長感）
    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.08, 52) + "px"
})

// =========================
// 🏃 RUNAWAY（最後才啟動）
// =========================
function enableRunaway() {

    noBtn.addEventListener("mouseenter", runAway)
    noBtn.addEventListener("touchstart", runAway, { passive: true })

    showToast("You’re really chasing me now 😳")
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
