function enableRunaway() {

// =========================
// 🎬 GIF STORY MODE
// =========================
const gifStages = [
    "https://media.tenor.com/r_2wMCBMnesAAAAi/bubu-bubu-dudu-love.gif",
    "https://media.tenor.com/sogH3VkgFVEAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/jK5dZwjdK6kAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/QOztKKB0fSEAAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/Q9VuGIKQqEMAAAAi/love-bear.gif",
    "https://media.tenor.com/U_C0g0kIAMIAAAAi/bubu-dudu-bubu.gif",
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
    "Slow down… I like being chased 😌",
    "You didn’t even play with me yet 👀",
    "I might say yes… if you behave 💖"
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
// STATE
// =========================
let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// =========================
// 🎵 MUSIC SAFE
// =========================
music.volume = 0.3
music.play().catch(() => {
    document.addEventListener('click', () => {
        music.play().catch(() => {})
    }, { once: true })
})

// =========================
// 💖 YES
// =========================
function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }

    showTeaseMessage("Okay… 💖")

    setTimeout(() => {
        window.location.href = 'yes.html'
    }, 1200)
}

// =========================
// 💬 MESSAGE
// =========================
function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')

    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => {
        toast.classList.remove('show')
    }, 2000)
}

// =========================
// 💔 NO CLICK
// =========================
function handleNoClick() {
    noClickCount++

    noBtn.textContent = noMessages[Math.min(noClickCount, noMessages.length - 1)]

    // YES grows slightly (mobile-safe)
    const size = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${Math.min(size * 1.1, 48)}px`

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    catGif.src = gifStages[gifIndex]

    showTeaseMessage(storyLines[gifIndex])

    if (noClickCount >= 6 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

// =========================
// 📱 MOBILE SAFE RUNAWAY
// =========================
function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })

    showTeaseMessage("Catch me if you can 😏")
}

function runAway() {
    const margin = 16

    const rect = noBtn.getBoundingClientRect()

    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight

    const maxX = vw - rect.width - margin
    const maxY = vh - rect.height - margin

    const x = Math.max(margin, Math.random() * maxX)
    const y = Math.max(margin, Math.random() * maxY)

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${x}px`
    noBtn.style.top = `${y}px`
    noBtn.style.zIndex = '999'

    noBtn.style.transition = 'left 0.2s ease, top 0.2s ease'
}

// =========================
// 📱 FIX RESIZE BUG
// =========================
window.addEventListener('resize', () => {
    noBtn.style.position = 'fixed'
})

} // end enableRunaway
