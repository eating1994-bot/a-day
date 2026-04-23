document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const toast = document.getElementById('tease-toast')

if (!yesBtn || !noBtn || !catGif) return

// =========================
// DATA（你原本的）
// =========================
const gifs = [
  "https://media.tenor.com/r_2wMCBMnesAAAAi/bubu-bubu-dudu-love.gif",
  "https://media.tenor.com/sogH3VkgFVEAAAAi/bubu-bubu-dudu.gif",
  "https://media.tenor.com/jK5dZwjdK6kAAAAi/bubu-bubu-dudu.gif",
  "https://media.tenor.com/QOztKKB0fSEAAAAi/bubu-bubu-dudu.gif",
  "https://media.tenor.com/Q9VuGIKQqEMAAAAi/love-bear.gif",
  "https://media.tenor.com/U_C0g0kIAMIAAAAi/bubu-bubu-dudu.gif",
  "https://media.tenor.com/sWXhCC4A2woAAAAi/bubu-bubu-dudu.gif",
  "https://media.tenor.com/2gyJjtOUFMcAAAAi/sseeyall-bubu-dudu.gif"
]

const noText = [
  "No… really? 🥺",
  "You’re breaking my heart 💔",
  "Please don’t do this 😢",
  "I thought you liked me 🥀",
  "This hurts…",
  "..."
]

const yesTease = [
  "Too fast 😳",
  "Not so easy 😌",
  "I like teasing you 💕",
  "You’re impatient huh 😏",
  "Almost… but not yet 💖",
  "You’re cute when you try 😳",
  "I’m watching you 👀",
  "Still not YES 😌"
]

// =========================
// STATE（修正關鍵）
// =========================
let step = 0
let runawayOn = false

// =========================
// TOAST
// =========================
function show(msg){
  if (!toast) return

  toast.textContent = msg
  toast.classList.add("show")

  clearTimeout(toast._t)
  toast._t = setTimeout(() => {
    toast.classList.remove("show")
  }, 2000)
}

// =========================
// NO（修正核心）
// =========================
noBtn.addEventListener("click", () => {

  // ❗第一次就要變圖（修正點）
  catGif.src = gifs[Math.min(step, gifs.length - 1)]

  show(noText[Math.min(step, noText.length - 1)])

  step++

  // ⭐ 最後一張才開 runaway
  if (step >= gifs.length && !runawayOn) {
    show("Catch me if you can 😏")
    enableRunaway()
    runawayOn = true
  }
})

// =========================
// YES
// =========================
yesBtn.addEventListener("click", () => {

  // 還沒到最後 → teasing
  if (step < gifs.length) {
    show(yesTease[step % yesTease.length])
    return
  }

  // 最後才跳頁
  show("Okay… 💖")

  setTimeout(() => {
    window.location.href = "yes.html"
  }, 800)
})

// =========================
// RUNAWAY（只最後）
// =========================
function enableRunaway(){

  noBtn.addEventListener("mouseenter", move)
  noBtn.addEventListener("touchstart", move, {passive:true})
}

function move(){

  const r = noBtn.getBoundingClientRect()

  noBtn.style.position = "fixed"
  noBtn.style.left = Math.random() * (window.innerWidth - r.width) + "px"
  noBtn.style.top = Math.random() * (window.innerHeight - r.height) + "px"
  noBtn.style.transition = "0.15s ease"
}

})
