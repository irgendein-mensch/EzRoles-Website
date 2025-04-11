document.addEventListener("DOMContentLoaded", () => {
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (viewportMeta) {
      viewportMeta.content = "width=device-width, initial-scale=1.0, viewport-fit=cover"
    }
  
    const particlesContainer = document.getElementById("particles")
    const colors = ["#5a5a5a", "#3a7ca5", "#2d6a4f", "#40916c", "#5865f2"]
  
    for (let i = 0; i < 50; i++) {
      createParticle(particlesContainer, colors)
    }
  
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach((button) => {
      button.addEventListener("mouseover", function () {
        this.style.transform = "translateY(-3px)"
      })
  
      button.addEventListener("mouseout", function () {
        this.style.transform = "translateY(0)"
      })
    })
  
    const heroDescriptionContainer = document.querySelector(".hero-description-container")
    if (heroDescriptionContainer && window.innerWidth > 768) {
      heroDescriptionContainer.addEventListener("mousemove", (e) => {
        const rect = heroDescriptionContainer.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const xPercent = x / rect.width - 0.5
        const yPercent = y / rect.height - 0.5
  
        const maxRotate = 2
        const rotateX = -yPercent * maxRotate
        const rotateY = xPercent * maxRotate
  
        heroDescriptionContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })
  
      heroDescriptionContainer.addEventListener("mouseleave", () => {
        heroDescriptionContainer.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
      })
    }
  
    const heroTitle = document.querySelector(".hero-title")
    if (heroTitle) {
      const text = heroTitle.textContent
      heroTitle.textContent = ""
  
      if (window.innerWidth <= 768) {
        heroTitle.textContent = text
      } else {
        let i = 0
        const typeWriter = () => {
          if (i < text.length) {
            heroTitle.textContent += text.charAt(i)
            i++
            setTimeout(typeWriter, 100)
          }
        }
  
        heroTitle.textContent = text
      }
    }
  
    window.addEventListener("mousemove", (e) => {
      if (window.innerWidth > 768) {
        const particles = document.querySelectorAll(".particle")
        const orbs = document.querySelectorAll(".orb")
        const mouseX = e.clientX / window.innerWidth
        const mouseY = e.clientY / window.innerHeight
  
        particles.forEach((particle) => {
          const speed = Number.parseFloat(particle.getAttribute("data-speed") || 0.05)
          const offsetX = (mouseX - 0.5) * speed * 100
          const offsetY = (mouseY - 0.5) * speed * 100
  
          particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`
        })
  
        orbs.forEach((orb, index) => {
          const speed = 0.03 + index * 0.01
          const offsetX = (mouseX - 0.5) * speed * 200
          const offsetY = (mouseY - 0.5) * speed * 200
  
          orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`
        })
      }
    })
  
    const revealElements = document.querySelectorAll(".hero-description, .buttons, .support-button-container")
  
    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight - 100) {
          element.classList.add("revealed")
        }
      })
    }
  
    revealOnScroll()
  
    window.addEventListener("scroll", revealOnScroll)
  
    createStars()
  
    setInterval(() => {
      const logo = document.querySelector(".logo-img")
      if (logo && Math.random() > 0.7) {
        logo.style.filter = "drop-shadow(0 0 15px rgba(58, 124, 165, 0.8)) hue-rotate(10deg)"
        setTimeout(() => {
          logo.style.filter = "drop-shadow(0 0 15px rgba(58, 124, 165, 0.5))"
        }, 150)
      }
    }, 3000)
  })
  
  function createParticle(container, colors) {
    const particle = document.createElement("div")
    particle.classList.add("particle")
  
    const size = Math.random() * 15 + 5
    const color = colors[Math.floor(Math.random() * colors.length)]
    const left = Math.random() * 100
    const duration = Math.random() * 20 + 10
    const delay = Math.random() * 10
    const speed = Math.random() * 0.1 + 0.02
  
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.backgroundColor = color
    particle.style.left = `${left}%`
    particle.style.bottom = `-${size}px`
    particle.style.animationDuration = `${duration}s`
    particle.style.animationDelay = `${delay}s`
  
    particle.setAttribute("data-speed", speed.toString())
  
    container.appendChild(particle)
  }
  
  function createStars() {
    const starsContainer = document.createElement("div")
    starsContainer.classList.add("stars-container")
    starsContainer.style.position = "fixed"
    starsContainer.style.top = "0"
    starsContainer.style.left = "0"
    starsContainer.style.width = "100%"
    starsContainer.style.height = "100%"
    starsContainer.style.overflow = "hidden"
    starsContainer.style.zIndex = "-3"
    starsContainer.style.pointerEvents = "none"
  
    document.body.appendChild(starsContainer)
  
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div")
      const size = Math.random() * 2 + 1
  
      star.style.position = "absolute"
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
      star.style.borderRadius = "50%"
      star.style.top = `${Math.random() * 100}%`
      star.style.left = `${Math.random() * 100}%`
      star.style.boxShadow = "0 0 3px rgba(255, 255, 255, 0.3)"
  
      const duration = Math.random() * 3 + 2
      star.style.animation = `twinkle ${duration}s ease-in-out infinite alternate`
      star.style.animationDelay = `${Math.random() * 5}s`
  
      starsContainer.appendChild(star)
    }
  
    const style = document.createElement("style")
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
      }
    `
    document.head.appendChild(style)
  }
  