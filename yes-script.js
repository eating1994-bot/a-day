// =========================
// 🎵 MUSIC AUTO START (FADE-IN VERSION)
// =========================
let musicPlaying = false

const music = document.getElementById('bg-music')

// 🎧 預設設定
if (music) {
    music.volume = 0
    music.preload = "auto"
}

// =========================
// 🎬 FADE-IN MUSIC FUNCTION
// =========================
function fadeInMusic() {
    if (!music || musicPlaying) return

    music.volume = 0

    music.play().then(() => {
        musicPlaying = true
        console.log("🎬 music started (fade-in)")

        let vol = 0
        const fade = setInterval(() => {
            vol += 0.03
            if (vol >= 0.3) {
                vol = 0.3
                clearInterval(fade)
            }
            music.volume = vol
        }, 80)

    }).catch(err => {
        console.log("❌ autoplay blocked (will wait interaction)", err)
    })
}

// =========================
// 🚀 LOAD EVENT
// =========================
window.addEventListener('load', () => {

    // ❗ 嘗試「像自動播放」
    fadeInMusic()

    launchConfetti()
    setInterval(launchConfetti, 4000)
    setInterval(createPetal, 300)
})

// =========================
// 🧠 FALLBACK：任何互動自動播放（fade-in）
// =========================
function unlockAudio() {
    if (!music || musicPlaying) return

    music.volume = 0

    music.play().then(() => {
        musicPlaying = true
        console.log("🎵 music unlocked by interaction")

        let vol = 0
        const fade = setInterval(() => {
            vol += 0.05
            if (vol >= 0.3) {
                vol = 0.3
                clearInterval(fade)
            }
            music.volume = vol
        }, 60)

    }).catch(() => {})
}

document.addEventListener('click', unlockAudio, { once: true })
document.addEventListener('touchstart', unlockAudio, { once: true })
document.addEventListener('keydown', unlockAudio, { once: true })
document.addEventListener('scroll', unlockAudio, { once: true })

// =========================
// 🔇 TOGGLE (optional but safe)
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
