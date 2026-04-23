document.addEventListener("DOMContentLoaded", () => {

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const toast = document.getElementById('tease-toast')

if (!yesBtn || !noBtn || !catGif) return

// =========================
// DATA
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
  "Still not YES 👀",
  "I’m watching you 😏"
]

// =========================
// STATE
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
// NO CLICK（穩定版核心）
// =========================
noBtn.addEventListener("click", () => {

  // 👉 防呆 index
  const index = Math.min(step, gifs.length - 1)

  // 💬 文字
  show(noText[Math.min(step, noText.length - 1)])

  // 🖼️ 圖片（強制刷新避免卡圖）
  catGif.src = gifs[index] + "?v=" + Date.now()

  step++

  // ⭐ 最後一張 NO 才啟動 runaway
  if (step >= gifs.length && !runawayOn) {
    show("Catch me if you can 😏")
    enableRunaway()
    runawayOn = true
  }
})

// =========================
// YES CLICK（穩定版）
// =========================
yesBtn.addEventListener("click", () => {

  // 👉 還沒到最後 → teasing
  if (step < gifs.length) {
    show(yesTease[step % yesTease.length])
    return
  }

  // 👉 最後才允許結局
  show("Okay… 💖")

  setTimeout(() => {
    window.location.href = "yes.html"
  }, 800)
})

// =========================
// RUNAWAY（只最後才出現）
// =========================
function enableRunaway(){

  noBtn.addEventListener("mouseenter", move)
  noBtn.addEventListener("touchstart", move, {passive:true})
}

function move(){

  const rect = noBtn.getBoundingClientRect()

  const x = Math.random() * (window.innerWidth - rect.width - 20)
  const y = Math.random() * (window.innerHeight - rect.height - 20)

  noBtn.style.position = "fixed"
  noBtn.style.left = x + "px"
  noBtn.style.top = y + "px"
  noBtn.style.zIndex = "999"
  noBtn.style.transition = "0.15s ease"
}

})
