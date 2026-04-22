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
// 💔 STORY LINES (同步 GIF)
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
    "Are you sure? I'm really cute🥺",
    "You’re getting punished for that 😤",
    "Careful… I might fall for you even more 😏.",
    "Hey… now that actually hurts 💔",
    "Please don’t do this to me… 🥺",
    "I thought you liked me… 😢",
    "Okay… I’ll stop asking… 🥀",
    "You can't catch me anyway 😜"
]

// =========================
// STATE
// =========================
let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// =========================
// 🎵 MUSIC
// =========================
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

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

    showTeaseMessage("Wait... are you really sure? 🥺💞")

    setTimeout(() => {
        showTeaseMessage("Okay… I’ll take that as a YES 💖")

        setTimeout(() => {
            window.location.href = 'yes.html'
        }, 1200)

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
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

// =========================
// 💔 NO CLICK
// =========================
function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // 💖 YES grows
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.3}px`

    const padY = Math.min(18 + noClickCount * 5, 70)
    const padX = Math.min(45 + noClickCount * 10, 140)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // 💔 NO shrinks
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // 🎬 GIF + STORY
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    showTeaseMessage(storyLines[gifIndex])

    // 🏃 runaway last stage
    if (noClickCount >= gifStages.length - 1 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
        showTeaseMessage("I’m really running away now… 😭")
    }
}

// =========================
// 🎬 GIF SWAP
// =========================
function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

// =========================
// 🏃 RUNAWAY
// =========================
function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })

    showTeaseMessage("Catch me if you can 😏")
}

function runAway() {
    const margin = 40
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight

    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const intensity = Math.min(noClickCount / 8, 1)

    const rangeX = maxX * (0.4 + intensity * 0.6)
    const rangeY = maxY * (0.4 + intensity * 0.6)

    const randomX = Math.random() * rangeX + margin
    const randomY = Math.random() * rangeY + margin

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'

    noBtn.style.transition =
        'left 0.35s cubic-bezier(.2,.8,.2,1), top 0.35s cubic-bezier(.2,.8,.2,1)'
}
