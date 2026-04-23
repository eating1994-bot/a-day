document.addEventListener("DOMContentLoaded", () => {

console.log("script loaded")

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const toast = document.getElementById('tease-toast')

if (!catGif || !yesBtn || !noBtn) {
  console.error("missing elements")
  return
}

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
  "Still not YES 👀",
  "I’m watching you 😏",
  "You really think it’s that easy? 😌"
]

// =========================
// STATE
// =========================
let step = 0
let runaway = false

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
// NO CLICK (FIXED)
// =========================
noBtn.addEventListener("click", () => {

  console.log("NO clicked:", step)

  const index = Math.min(step, gifs.length - 1)

  show(noText[index])

  // 🔥 強制 reload（關鍵修正）
  const newUrl = gifs[index] + "?t=" + Date.now()

  catGif.onload = () => {
    console.log("image loaded:", newUrl)
  }

  catGif.src = newUrl

  step++

  // ⭐ 最後才 runaway
  if (step >= gifs.length && !runaway) {
    show("Catch me if you can 😏")
    enableRunaway()
    runaway = true
  }
})

// =========================
// YES CLICK
// =========================
yesBtn.addEventListener("click", () => {

  if (step < gifs.length) {
    show(yesTease[step % yesTease.length])
    return
  }

  show("Okay… 💖")

  setTimeout(() => {
    window.location.href = "yes.html"
  }, 800)
})

// =========================
// RUNAWAY
// =========================
function enableRunaway(){
  console.log("runaway enabled")

  noBtn.addEventListener("mouseenter", move)
  noBtn.addEventListener("touchstart", move, {passive:true})
}

function move(){
  const r = noBtn.getBoundingClientRect()

  const x = Math.random() * (window.innerWidth - r.width)
  const y = Math.random() * (window.innerHeight - r.height)

  noBtn.style.position = "fixed"
  noBtn.style.left = x + "px"
  noBtn.style.top = y + "px"
  noBtn.style.zIndex = "999"
  noBtn.style.transition = "0.15s ease"
}

})
