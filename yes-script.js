// =========================
// 🎵 MUSIC AUTO START (BEST POSSIBLE)
// =========================
let musicPlaying = false

const music = document.getElementById('bg-music')

if (music) {
    music.volume = 0.3
    music.preload = "auto"
}

// =========================
// 🚀 TRY PLAY ON LOAD
// =========================
function tryPlayMusic() {
    if (!music || musicPlaying) return

    music.play().then(() => {
        musicPlaying = true
        console.log("🎵 music started on load")
    }).catch(err => {
        console.log("❌ autoplay blocked, waiting interaction")
    })
}

// 👉 一進畫面就試一次
window.addEventListener('load', () => {
    tryPlayMusic()

    launchConfetti()
    setInterval(launchConfetti, 4000)
    setInterval(createPetal, 300)
})

// =========================
// 🧠 fallback：任何互動自動補播
// =========================
function unlockAudio() {
    if (!music || musicPlaying) return

    music.play().then(() => {
        musicPlaying = true
        console.log("🎵 music unlocked by interaction")
    }).catch(() => {})
}

['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
    document.addEventListener(evt, unlockAudio, { once: true })
})

// =========================
// 🔇 TOGGLE（可選）
// =========================
function toggleMusic() {
    if (!music) return

    if (music.paused) {
        music.play()
        musicPlaying = true
    } else {
        music.pause()
        musicPlaying = false
    }
}

// =========================
// 🎆 CONFETTI
// =========================
function launchConfetti() {
    if (typeof confetti !== "function") return

    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.3 }
    })
}

// =========================
// 🌼 PETALS
// =========================
function createPetal() {
    const petal = document.createElement("div")
    petal.classList.add("petal")

    petal.innerText = ["🌼","💛","✨"][Math.floor(Math.random()*3)]
    petal.style.left = Math.random() * 100 + "vw"
    petal.style.animationDuration = (Math.random()*3 + 3) + "s"

    document.body.appendChild(petal)

    setTimeout(() => petal.remove(), 7000)
}
