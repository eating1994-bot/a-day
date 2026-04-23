document.addEventListener("DOMContentLoaded", () => {

// =========================
// GIF / STORY
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

const yesTeasePokes = [
    "Wait… you’re going too fast 😳",
    "Hmm? You really want YES that badly? 😏",
    "Not so easy~ 😌",
    "You didn’t even play with me yet 👀",
    "Slow down… I like being chased 😏",
    "You’re cute when you rush 😳",
    "Almost there… but not yet 💖"
]

const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This actually hurts… 🥀",
    "Catch me if you can 😜"
]

// =========================
// ELEMENTS
// =========================
const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const runawayText = document.getElementById("runaway-text")

let yesIndex = 0
let noIndex = 0
let runawayEnabled = false

// =========================
// MUSIC FIX
// =========================
function startMusic() {
    if (!music) return
    music.volume = 0.3
    music.play().catch(() => {})
}

document.addEventListener("click", startMusic, { once: true })

// =========================
// YES
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    if (!runawayEnabled) {
        showToast(yesTeasePokes[Math.min(yesIndex++, yesTeasePokes.length - 1)])
        return
    }

    showToast("Okay… 💖")
    setTimeout(() => window.location.href = "yes.html", 800)
})

// =========================
// NO
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    noBtn.textContent = "No"

    const msg =
        noMessages[Math.min(noIndex, noMessages.length - 1)] + " " +
        storyLines[Math.min(noIndex, storyLines.length - 1)]

    showToast(msg)

    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.08, 52) + "px"

    if (catGif) {
        catGif.src = gifStages[Math.min(noIndex, gifStages.length - 1)]
    }

    if (noIndex >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
})

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
    }, 2200)
}

// =========================
// RUNAWAY (平滑版🔥)
// =========================
function enableRunaway() {
    showToast("Catch me if you can 😏")

    noBtn.addEventListener("mouseenter", runAway)
    noBtn.addEventListener("touchstart", runAway, { passive: true })
}

// 🔥 變成「滑走」不是瞬移
function runAway() {

    const rect = noBtn.getBoundingClientRect()

    const vw = window.innerWidth
    const vh = window.innerHeight

    const x = Math.random() * (vw - rect.width - 40)
    const y = Math.random() * (vh - rect.height - 40)

    noBtn.style.position = "fixed"
    noBtn.style.transition = "0.4s ease"
    noBtn.style.left = x + "px"
    noBtn.style.top = y + "px"
    noBtn.style.zIndex = "999"

    // 💬 文字慢慢跟著（不爆衝）
    if (runawayText) {
        runawayText.style.position = "fixed"
        runawayText.style.transition = "0.5s ease"
        runawayText.style.left = (x + rect.width + 10) + "px"
        runawayText.style.top = (y + rect.height / 2) + "px"
        runawayText.style.zIndex = "1000"
    }
}

})
