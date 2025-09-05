// Projects Data with AI-generated placeholder images
const projects = [
  {
    id: "volume-gesture",
    title: "Volume Controller Using Hand Gesture",
    short: "Control system volume with real-time hand gestures using your webcam.",
    long: "A computer-vision project using OpenCV to detect hand gestures and Pycaw to control system volume in real-time. Features gesture calibration, smooth volume transitions, and keyboard fallback controls for accessibility.",
    tech: ["Python", "OpenCV", "Pycaw"],
    github: "https://github.com/IsmailGaur/Volume-Controller-Using-Hand-Gesture",
    tags: ["Python", "CV", "Utility"],
    icon: "🎵",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=200&fit=crop&crop=center",
    features: [
      "Real-time hand gesture recognition",
      "Smooth volume control transitions",
      "Webcam integration with OpenCV",
      "Cross-platform compatibility",
      "Gesture calibration system",
    ],
  },
  {
    id: "typing-master",
    title: "Typing Speed Master (Pygame)",
    short: "Dark-themed, audio-backed typing speed test with WPM/accuracy and score tracking.",
    long: "Interactive typing game built with Pygame featuring multiple paragraphs, audio feedback, dark mode interface, and persistent high/low score tracking. Includes detailed performance analytics and customizable difficulty levels.",
    tech: ["Python", "Pygame"],
    github: "https://github.com/IsmailGaur/Typing-Speed-Master",
    tags: ["Python", "Game", "Utility"],
    icon: "⌨️",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=200&fit=crop&crop=center",
    features: [
      "Multiple paragraph selection",
      "Real-time WPM calculation",
      "Accuracy tracking and analytics",
      "Audio feedback system",
      "Score persistence and leaderboards",
    ],
  },
  {
    id: "hotel-reservation",
    title: "Hotel Reservation System",
    short: "Console-based Hotel Reservation system with CRUD and MySQL storage (JDBC).",
    long: "Java console application demonstrating JDBC-based CRUD operations on reservations, customer records and room assignment. Features intuitive CLI menus, robust error handling, and comprehensive booking management.",
    tech: ["Java", "MySQL", "JDBC"],
    github: "https://github.com/IsmailGaur/Hotel-Reservation-System",
    tags: ["Java", "Database"],
    icon: "🏨",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop&crop=center",
    features: [
      "Complete CRUD operations",
      "MySQL database integration",
      "Room availability management",
      "Customer record keeping",
      "Booking history tracking",
    ],
  },
  {
    id: "employee-payroll",
    title: "Employee Payroll System",
    short: "Java-based payroll app demonstrating OOP, salary calculations, and record keeping.",
    long: "A comprehensive console payroll manager implemented with core Java OOP principles. Supports employee lifecycle management, complex salary calculations with deductions, and detailed payroll history with reporting capabilities.",
    tech: ["Java", "OOP"],
    github: "https://github.com/IsmailGaur/Employee-Payroll-System",
    tags: ["Java", "OOP"],
    icon: "💰",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop&crop=center",
    features: [
      "Employee lifecycle management",
      "Salary calculation engine",
      "Deduction and bonus handling",
      "Payroll history reports",
      "Object-oriented design patterns",
    ],
  },
]

// DOM Elements
const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.getElementById("themeIcon")
const header = document.getElementById("header")
const projectsGrid = document.getElementById("projectsGrid")
const filterBtns = document.querySelectorAll(".filter-btn")
const modal = document.getElementById("projectModal")
const modalClose = document.getElementById("modalClose")
const modalBody = document.getElementById("modalBody")
const contactForm = document.getElementById("contactForm")

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const theme = savedTheme || (prefersDark ? "dark" : "light")

  document.documentElement.setAttribute("data-theme", theme)
  updateThemeIcon(theme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
}

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙"
}

// Header Scroll Effect
function handleScroll() {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}

// Smooth Scrolling
function smoothScroll(target) {
  const element = document.querySelector(target)
  if (element) {
    const headerHeight = header.offsetHeight
    const targetPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

// Projects Rendering
function renderProjects(projectsToShow = projects) {
  projectsGrid.innerHTML = projectsToShow
    .map(
      (project) => `
        <div class="project-card" data-tags="${project.tags.join(",")}" onclick="openProjectModal('${project.id}')">
            <div class="project-image" style="background-image: url('${project.image}')">
                <span style="background: rgba(0,0,0,0.7); padding: 0.5rem; border-radius: 50%;">${project.icon}</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.short}</p>
                <div class="project-tech">
                    ${project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
                </div>
                <div class="project-actions">
                    <a href="${project.github}" class="btn-small btn-outline" target="_blank" rel="noopener" onclick="event.stopPropagation()">
                        View Code
                    </a>
                    <button class="btn-small btn-primary" onclick="event.stopPropagation(); openProjectModal('${project.id}')">
                        Details
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Project Filtering
function filterProjects(filter) {
  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.tags.includes(filter))

  renderProjects(filteredProjects)

  // Update active filter button
  filterBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter)
  })
}

// Project Modal
function openProjectModal(projectId) {
  const project = projects.find((p) => p.id === projectId)
  if (!project) return

  modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${project.icon}</div>
            <h2 style="color: var(--text-primary); margin-bottom: 1rem;">${project.title}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 2rem;">
                ${project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--accent); margin-bottom: 1rem;">Description</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">${project.long}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--accent); margin-bottom: 1rem;">Key Features</h3>
            <ul style="color: var(--text-secondary); padding-left: 1.5rem;">
                ${project.features.map((feature) => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join("")}
            </ul>
        </div>
        
        <div style="text-align: center;">
            <a href="${project.github}" class="btn btn-primary" target="_blank" rel="noopener">
                View on GitHub
            </a>
        </div>
    `

  modal.classList.add("active")
  document.body.style.overflow = "hidden"

  // Focus management
  modalClose.focus()
}

function closeProjectModal() {
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

// Contact Form
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject") || "Contact from Portfolio"
  const message = formData.get("message")

  // Basic validation
  if (!name || !email || !message) {
    alert("Please fill in all required fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Create mailto link
  const mailtoLink = `mailto:ismailazeem03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`

  // Open email client
  window.location.href = mailtoLink

  // Show success message
  alert(
    "Thank you for your message! Your email client should open now. If not, please email me directly at ismailazeem03@gmail.com",
  )

  // Reset form
  contactForm.reset()
}

// Intersection Observer for animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe sections
  document.querySelectorAll(".section, .timeline-item, .skill-category").forEach((el) => {
    observer.observe(el)
  })
}

// Event Listeners
themeToggle.addEventListener("click", toggleTheme)
window.addEventListener("scroll", handleScroll)
contactForm.addEventListener("submit", handleContactForm)

// Filter buttons
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterProjects(btn.dataset.filter)
  })
})

// Modal events
modalClose.addEventListener("click", closeProjectModal)
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeProjectModal()
})

// Keyboard events
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeProjectModal()
  }
})

// Navigation links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const target = link.getAttribute("href")
    smoothScroll(target)
  })
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  renderProjects()
  initAnimations()

  // Animate skill bars
  setTimeout(() => {
    document.querySelectorAll(".skill-progress").forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0%"
      setTimeout(() => {
        bar.style.width = width
      }, 100)
    })
  }, 500)
})

// Prefers reduced motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.setProperty("--animation-duration", "0.01ms")
}
