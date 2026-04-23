document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const musicToggle = document.getElementById('music-toggle')

if (!yesBtn || !noBtn) return

// =========================
// 🎬 GIF（修正：穩定更新）
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
// 💬 YES（8+句）
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
    "If you keep clicking YES I might just run 😳",
    "Be patient… I like slow love 💛"
]

// =========================
// 💔 NO（每次都會變）
// =========================
const noMessages = [
    "No… really? 🥺",
    "You’re breaking my heart 😤",
    "Please don’t do this 💔",
    "I thought you liked me 😢",
    "This actually hurts… 🥀",
    "Okay… I’m running away 😭",
    "Catch me if you can 😏"
]

// =========================
// STATE
// =========================
let yesIndex = 0
let noIndex = 0

// 👉 最後一階才允許結局
const FINAL_STAGE = gifStages.length - 1

// =========================
// MUSIC
// =========================
function startMusic() {
    if (!music) return
    music.volume = 0.3
    music.play().catch(() => {})
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
// YES（只有最後一關才能結局）
// =========================
yesBtn.addEventListener("click", () => {

    startMusic()

    // ❗還沒到最後 → 只 teasing
    if (noIndex < FINAL_STAGE) {
        showToast(yesTeasePokes[yesIndex % yesTeasePokes.length])
        yesIndex++
        return
    }

    // ❤️ 最後才允許結局
    showToast("Okay… I choose you 💖")

    setTimeout(() => {
        window.location.href = "yes.html"
    }, 900)
})

// =========================
// NO（核心修正版）
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    // ✅ 修正 GIF 更新（避免 cache）
    const stage = Math.min(noIndex, FINAL_STAGE)

    if (catGif) {
        catGif.src = gifStages[stage] + "?v=" + Date.now()
    }

    // 💬 對話
    const msg = noMessages[stage] + " 💔"
    showToast(msg)

    // 💖 YES 變大
    const size = parseFloat(getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = Math.min(size * 1.08, 52) + "px"
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
    }, 2000)
}

})
