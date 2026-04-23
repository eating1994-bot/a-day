let musicPlaying = false

window.addEventListener('load', () => {

    launchConfetti()

    const music = document.getElementById('bg-music')
    const toggleBtn = document.getElementById('music-toggle')

    if (music) {
        music.volume = 0.3
        music.play().then(() => {
            musicPlaying = true
            if (toggleBtn) toggleBtn.textContent = '🔊'
        }).catch(() => {})
    }
})

// =========================
// 🎆 CONFETTI SAFE
// =========================
function launchConfetti() {

    if (typeof confetti !== "function") {
        console.warn("Confetti library not loaded")
        return
    }

    const colors = [
        '#ff69b4', '#ff1493', '#ff85a2',
        '#ffb3c1', '#ff0000', '#ff6347',
        '#fff', '#ffdf00'
    ]

    const duration = 5000
    const end = Date.now() + duration

    // initial burst
    confetti({
        particleCount: 120,
        spread: 90,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    const interval = setInterval(() => {

        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 30,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 30,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })

    }, 300)
}

// =========================
// 🔊 TOGGLE MUSIC SAFE
// =========================
function toggleMusic() {

    const music = document.getElementById('bg-music')
    const btn = document.getElementById('music-toggle')

    if (!music) return

    if (music.paused) {
        music.play()
        musicPlaying = true
        if (btn) btn.textContent = '🔊'
    } else {
        music.pause()
        musicPlaying = false
        if (btn) btn.textContent = '🔇'
    }
}
