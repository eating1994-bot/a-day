document.addEventListener("DOMContentLoaded", () => {

// =========================
// 🎬 GIF STORY MODE
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
// 💔 STORY LINES
// =========================
const storyLines = [
    "Hi… I’m happy to see you 💕",
    "Hmm? you’re clicking me?",
    "Wait… what are you doing? 👀",
    "Hey stop that 😤",
    "I’m getting a bit sad… 💔",
    "It actually hurts now 🥺",
    "I don’t like this feeling… 🥀",
    "I think I’m running away… 😭"
]

// =========================
// 💬 YES TEASE
// =========================
const yesTeasePokes = [
    "Wait… you’re going too fast 😳",
    "Hmm? You really want YES that badly? 😏",
    "Not so easy~ try teasing me first 😌",
    "You didn’t even play with me yet 👀",
    "I think you skipped a step… 😳",
    "Slow down… I like being chased 😏",
    "You’re acting too confident right now 😌",
    "I might say yes… if you behave 😌💖",
    "Try clicking No just once… I’m curious 👀",
    "You’re not getting YES that easily 😈",
    "I think you like me more than you admit 😏",
    "Hmm… you’re making me shy 🥺",
    "You really want the ending that fast? 💞",
    "You’re cute when you rush 😳",
    "I like watching you try 😏",
    "Almost there… but not yet 💖"
]

// =========================
// 💔 NO MESSAGES
// =========================
const noMessages = [
    "No",
    "Are you sure? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t… 💔",
    "I thought you liked me 😢",
    "Okay… I’ll run away 😭"
]

// =========================
// ELEMENTS
// =========================
const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')

if (!yesBtn || !noBtn) return

let yesIndex = 0
let noIndex = 0
let runawayEnabled = false

// =========================
// 🎵 MUSIC SAFE
// =========================
if (music) {
    music.volume = 0.3
    music.play().catch(() => {
        document.addEventListener('click', () => {
            music.play().catch(() => {})
        }, { once: true })
    })
}

// =========================
// 💖 YES CLICK
// =========================
yesBtn.addEventListener("click", () => {

    if (!runawayEnabled) {
        showToast(yesTeasePokes[Math.min(yesIndex, yesTeasePokes.length - 1)])
        yesIndex++
        return
    }

    showToast("Okay… 💖")

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 800)
})

// =========================
// 💔 NO CLICK
// =========================
noBtn.addEventListener("click", () => {

    noIndex++

    noBtn.textContent = noMessages[Math.min(noIndex, noMessages.length - 1)]

    const size = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.1, 52) + "px"

    if (catGif) {
        catGif.src = gifStages[Math.min(noIndex, gifStages.length - 1)]
    }

    showToast(storyLines[Math.min(noIndex, storyLines.length - 1)])

    if (noIndex >= 6 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
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

// =========================
// 🏃 RUNAWAY
// =========================
function enableRunaway() {

    showToast("Catch me if you can 😏")

    noBtn.addEventListener("mouseover", runAway)
    noBtn.addEventListener("touchstart", runAway, { passive: true })
}

function runAway() {

    const rect = noBtn.getBoundingClientRect()

    const vw = window.innerWidth
    const vh = window.innerHeight

    const x = Math.random() * (vw - rect.width - 20)
    const y = Math.random() * (vh - rect.height - 20)

    noBtn.style.position = "fixed"
    noBtn.style.left = x + "px"
    noBtn.style.top = y + "px"
    noBtn.style.zIndex = "999"

    noBtn.style.transition = "0.15s ease"
}

})
