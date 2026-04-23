// =========================
// 🎵 MUSIC AUTO START (FIXED VERSION)
// =========================
let musicPlaying = false
let music = null  // ❗ 不要一開始抓

// =========================
// 🎬 FADE-IN MUSIC FUNCTION
// =========================
function fadeInMusic() {

    if (!music) {
        music = document.getElementById('bg-music')
    }

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
        console.log("❌ autoplay blocked (waiting interaction)", err)
    })
}

// =========================
// 🚀 LOAD EVENT（關鍵修正）
// =========================
window.addEventListener('load', () => {

    // ⭐ DOM ready 後再抓
    music = document.getElementById('bg-music')

    console.log("music element:", music)

    fadeInMusic()

    launchConfetti()
    setInterval(launchConfetti, 4000)
    setInterval(createPetal, 300)
})

// =========================
// 🧠 FALLBACK：任何互動自動播放（fade-in）
// =========================
function unlockAudio() {

    if (!music) {
        music = document.getElementById('bg-music')
    }

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

    }).catch(err => {
        console.log("unlock failed:", err)
    })
}

document.addEventListener('click', unlockAudio, { once: true })
document.addEventListener('touchstart', unlockAudio, { once: true })
document.addEventListener('keydown', unlockAudio, { once: true })
document.addEventListener('scroll', unlockAudio, { once: true })

// =========================
// 🔇 TOGGLE（可選）
// =========================
function toggleMusic() {

    if (!music) {
        music = document.getElementById('bg-music')
    }

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