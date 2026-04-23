document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const toast = document.getElementById('tease-toast')
const runawayText = document.getElementById("runaway-text")

let noIndex = 0
let runawayEnabled = false
let moveCooldown = false

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
// YES (修正：一定可成功)
// =========================
yesBtn.addEventListener("click", () => {
    startMusic()
    window.location.href = "yes.html"
})

// =========================
// NO
// =========================
noBtn.addEventListener("click", () => {

    startMusic()

    noIndex++

    showToast("No...? 🥺")

    if (catGif) {
        catGif.src =
            "https://media.tenor.com/Q9VuGIKQqEMAAAAi/love-bear.gif"
    }

    // ⚠️ 不要太早開 runaway（避免卡 UI）
    if (noIndex >= 4 && !runawayEnabled) {
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
    }, 2000)
}

// =========================
// RUNAWAY
// =========================
function enableRunaway() {
    showToast("Catch me if you can 😏")

    // 用 click 比 hover 穩定（手機+桌機都穩）
    noBtn.addEventListener("mouseenter", runAway)
    noBtn.addEventListener("click", runAway)
}

// =========================
// MOVE (加防抖避免狂跳)
// =========================
function runAway() {

    if (moveCooldown) return
    moveCooldown = true

    setTimeout(() => moveCooldown = false, 250)

    const rect = noBtn.getBoundingClientRect()

    const x = Math.random() * (window.innerWidth - rect.width - 20)
    const y = Math.random() * (window.innerHeight - rect.height - 20)

    noBtn.style.position = "fixed"
    noBtn.style.left = x + "px"
    noBtn.style.top = y + "px"
    noBtn.style.transition = "0.25s ease"
    noBtn.style.zIndex = "999"

    if (runawayText) {
        runawayText.style.position = "fixed"
        runawayText.style.left = (x + 40) + "px"
        runawayText.style.top = (y + 40) + "px"
        runawayText.style.transition = "0.3s ease"
        runawayText.style.zIndex = "1000"
    }
}

})
