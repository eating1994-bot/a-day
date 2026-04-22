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

const yesTeasePokes = [
    "try saying no first… don’t be boring 😏",
    "go on, hit no… I know you want to 👀",
    "you’re too curious to stop now 😈",
    "click no… I dare you 😏"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

/* =========================
   🎵 MUSIC
========================= */
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

/* =========================
   💖 YES BUTTON
========================= */
function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

/* =========================
   💬 TOAST MESSAGE
========================= */
function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

/* =========================
   💔 NO CLICK CORE
========================= */
function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // 💖 Yes 變大
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.3}px`

    const padY = Math.min(18 + noClickCount * 5, 70)
    const padX = Math.min(45 + noClickCount * 10, 140)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // 💔 No 變小
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // 🐻 GIF 變化
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // 🏃 啟動 runaway
   if (noClickCount >= gifStages.length - 1 && !runawayEnabled) {
    enableRunaway()
    runawayEnabled = true
    showTeaseMessage("Okay... I can't take it anymore 😭")
}

/* =========================
   🐻 GIF SWAP
========================= */
function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

/* =========================
   🏃 RUNAWAY UPGRADED
========================= */
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

    // 💖 越後面越難抓
    const intensity = Math.min(noClickCount / 8, 1)

    const rangeX = maxX * (0.4 + intensity * 0.6)
    const rangeY = maxY * (0.4 + intensity * 0.6)

    const randomX = Math.random() * rangeX + margin
    const randomY = Math.random() * rangeY + margin

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'

    // 💫 更順滑動畫
    noBtn.style.transition =
        'left 0.35s cubic-bezier(.2,.8,.2,1), top 0.35s cubic-bezier(.2,.8,.2,1)'

    // 💬 偶爾說話
    if (Math.random() < 0.6) {
        const msgs = [
            "Nooo 😳",
            "Stop ittt 😭",
            "Too close!! 🥺",
            "I’m shy!! 😳",
            "Not today 😏"
        ]
        showTeaseMessage(msgs[Math.floor(Math.random() * msgs.length)])
    }

    // 🥺 偶爾假裝停下
    if (Math.random() < 0.15) {
        setTimeout(() => {
            showTeaseMessage("...okay that was close 😳")
        }, 400)
    }
}
