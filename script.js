document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const runawayText = document.getElementById('runaway-text')
const buttonsWrap = document.getElementById('buttons-wrap')

if (!yesBtn || !noBtn || !catGif || !buttonsWrap) return

// =========================
// GIF
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
// TEXT
// =========================
const noMessages = [
"No… really? 🥺",
"You’re breaking my heart 😤",
"Please don’t do this 💔",
"I thought you liked me 😢",
"This actually hurts… 🥀",
"Okay… I’m scared 😭",
"I think I’ll run away… 😶‍🌫️"
]

const yesTease = [
"Wait… too fast 😳",
"Not so easy~ 😌",
"You’re impatient huh 😏",
"I like your effort 💕",
"Almost there… 💖",
"But not yet 😌"
]

// =========================
// STATE
// =========================
let noIndex = 0
let yesIndex = 0
let runawayEnabled = false

// =========================
// MUSIC
// =========================
function startMusic() {
    if (!music) return
    music.volume = 0.3
    music.play().catch(() => {})
}

document.addEventListener("click", startMusic, { once: true })

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
    }, 2000)
}

// =========================
// YES（保留你的原本邏輯）
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    if (!runawayEnabled) {

        yesIndex++

        if (yesIndex >= yesTease.length) {
            showToast("Try clicking NO 👀")
            yesIndex = yesTease.length - 1
            return
        }

        showToast(yesTease[yesIndex])
        return
    }

    showToast("Okay… 💖")

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 800)
})

// =========================
// NO
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    const lastStage = gifStages.length - 1
    const stage = Math.min(noIndex, lastStage)

    catGif.src = gifStages[stage] + "?v=" + Date.now()
    showToast(noMessages[stage])

    const baseSize = 24
    const maxSize = 80
    const progress = noIndex / lastStage
    const eased = Math.pow(progress, 1.5)
    const newSize = baseSize + (maxSize - baseSize) * eased

    yesBtn.style.fontSize = newSize + "px"
    yesBtn.style.transition = "0.3s ease"

    if (stage === lastStage && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
})

// =========================
// RUNAWAY
// =========================
function enableRunaway() {
    showToast("No way 🤓")

    noBtn.addEventListener("mouseenter", moveNo)
    noBtn.addEventListener("pointerdown", moveNo)
    noBtn.addEventListener("touchstart", moveNo, { passive: false })
}

// =========================
// MOVE
// =========================
function moveNo(e) {

    if (e) {
        e.preventDefault()
        e.stopPropagation()
    }

    const wrapRect = buttonsWrap.getBoundingClientRect()
    const btnWidth = noBtn.offsetWidth
    const btnHeight = noBtn.offsetHeight

    // 只在右邊活動
    const minLeft = wrapRect.width * 0.58
    const maxLeft = wrapRect.width - btnWidth
    const maxTop = wrapRect.height - btnHeight

    let left = minLeft + Math.random() * Math.max(1, (maxLeft - minLeft))
    let top = Math.random() * Math.max(1, maxTop)

    noBtn.style.position = "absolute"
    noBtn.style.left = left + "px"
    noBtn.style.top = top + "px"
    noBtn.style.transform = "none"
    noBtn.style.right = "auto"

    // 讓文字跟在 No 下面
    if (runawayText) {
        runawayText.textContent = "Catch me no way 😏"
        runawayText.style.left = left + "px"
        runawayText.style.top = (top + btnHeight + 6) + "px"
        runawayText.style.width = btnWidth + "px"
        runawayText.style.textAlign = "center"
        runawayText.style.transform = "none"
        runawayText.style.opacity = "1"
    }
}

})
