/**
 * Bineesh K S Portfolio - Enhanced JavaScript
 * Modern, animated portfolio with advanced interactions
 */

// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0
let testimonialInterval
let isLoading = true
const particles = []
let mouseX = 0
let mouseY = 0
let currentFilter = "all"
let lucide // Declare the lucide variable

// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById("loading-screen")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navClose = document.getElementById("nav-close")
const navLinks = document.querySelectorAll(".nav__link")
const themeToggle = document.getElementById("theme-toggle")
const portfolioItems = document.querySelectorAll(".portfolio-item")
const portfolioModal = document.getElementById("portfolio-modal")
const modalOverlay = document.getElementById("modal-overlay")
const modalClose = document.getElementById("modal-close")
const modalBody = document.getElementById("modal-body")
const contactForm = document.getElementById("contact-form")
const successToast = document.getElementById("success-toast")
const toastClose = document.getElementById("toast-close")
const testimonialSlides = document.querySelectorAll(".testimonial-slide")
const testimonialDots = document.querySelectorAll(".testimonial-dot")
const testimonialPrev = document.getElementById("testimonial-prev")
const testimonialNext = document.getElementById("testimonial-next")
const backToTop = document.getElementById("back-to-top")
const filterBtns = document.querySelectorAll(".filter-btn")
const statNumbers = document.querySelectorAll(".stat-number")
const particlesContainer = document.getElementById("particles")
const cursorDot = document.querySelector("[data-cursor-dot]")
const cursorOutline = document.querySelector("[data-cursor-outline]")

// ===== UTILITY FUNCTIONS =====

/**
 * Smooth scroll to element
 * @param {string} targetId - ID of target element
 */
function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId.replace("#", ""))
  if (target) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const targetPosition = target.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Type of toast (success/error)
 * @param {number} duration - Display duration in ms
 */
function showToast(message, type = "success", duration = 5000) {
  const toast = document.getElementById("success-toast")
  const messageElement = toast.querySelector(".toast__message span")
  const iconElement = toast.querySelector(".toast__icon i")

  messageElement.textContent = message

  // Update icon based on type
  if (type === "success") {
    iconElement.setAttribute("data-lucide", "check-circle")
    toast.style.background = "#10b981"
  } else if (type === "error") {
    iconElement.setAttribute("data-lucide", "x-circle")
    toast.style.background = "#ef4444"
  }

  // Reinitialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, duration)
}

/**
 * Trap focus within modal
 * @param {HTMLElement} modal - Modal element
 */
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  })

  firstElement?.focus()
}

// ===== NAVIGATION FUNCTIONALITY =====

/**
 * Toggle mobile navigation menu
 */
function toggleNavMenu() {
  navMenu.classList.toggle("show")
  navToggle.classList.toggle("active")
  document.body.style.overflow = navMenu.classList.contains("show") ? "hidden" : ""
}

/**
 * Close mobile navigation menu
 */
function closeNavMenu() {
  navMenu.classList.remove("show")
  navToggle.classList.remove("active")
  document.body.style.overflow = ""
}

// Navigation event listeners
if (navToggle) {
  navToggle.addEventListener("click", toggleNavMenu)
}

if (navClose) {
  navClose.addEventListener("click", closeNavMenu)
}

// Close menu when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    closeNavMenu()

    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      smoothScrollTo(targetId)
    }, 300)
  })
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    closeNavMenu()
  }
})

// ===== THEME TOGGLE FUNCTIONALITY =====

/**
 * Toggle dark/light theme
 */
function toggleTheme() {
  const body = document.body
  const isDark = body.classList.toggle("dark")

  localStorage.setItem("theme", isDark ? "dark" : "light")

  // Add smooth transition effect
  body.style.transition = "background-color 0.3s ease, color 0.3s ease"
  setTimeout(() => {
    body.style.transition = ""
  }, 300)
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark")
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme)
  initializeTheme()
}

// ===== PORTFOLIO MODAL FUNCTIONALITY =====

/**
 * Portfolio project data
 */
const portfolioData = {
  "resort-booking": {
    title: "Resort Booking System",
    category: "Web Development",
    description:
      "A comprehensive booking platform with real-time availability checking, automated PDF generation, and integrated payment processing.",
    challenge:
      "The luxury resort needed an automated booking system that could handle complex reservation logic, generate professional PDF confirmations, and provide a seamless user experience across all devices.",
    solution:
      "Developed a full-stack application using React and Node.js with real-time database synchronization, automated email notifications, and a responsive design that works perfectly on mobile devices.",
    technologies: ["React", "Node.js", "MongoDB", "PDF-lib", "Stripe API", "Socket.io"],
    features: [
      "Real-time availability checking",
      "Automated PDF confirmation generation",
      "Integrated payment processing",
      "Mobile-responsive design",
      "Admin dashboard for management",
      "Email notification system",
    ],
    results: [
      "40% reduction in booking processing time",
      "95% customer satisfaction rate",
      "60% increase in mobile bookings",
      "Zero payment processing errors",
    ],
    images: ["resort-booking-1.jpg", "resort-booking-2.jpg", "resort-booking-3.jpg"],
    liveUrl: "https://resort-booking-demo.com",
    githubUrl: "https://github.com/bineeshks/resort-booking",
  },
  "ecommerce-store": {
    title: "Fashion E-commerce Store",
    category: "E-commerce Development",
    description:
      "A modern online fashion store with advanced filtering, wishlist functionality, and seamless checkout experience.",
    challenge:
      "The fashion startup needed a complete e-commerce solution that could handle inventory management, provide excellent user experience, and integrate with multiple payment gateways.",
    solution:
      "Built a comprehensive e-commerce platform using Next.js with server-side rendering for SEO, integrated Stripe for payments, and implemented advanced search and filtering capabilities.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
    features: [
      "Advanced product filtering and search",
      "Wishlist and favorites functionality",
      "Shopping cart with persistent storage",
      "Multiple payment gateway integration",
      "Order tracking and management",
      "Responsive design for all devices",
    ],
    results: [
      "150% increase in online sales",
      "30% improvement in conversion rate",
      "45% reduction in cart abandonment",
      "99.9% uptime reliability",
    ],
    images: ["ecommerce-1.jpg", "ecommerce-2.jpg", "ecommerce-3.jpg"],
    liveUrl: "https://fashion-store-demo.com",
    githubUrl: "https://github.com/bineeshks/fashion-ecommerce",
  },
  "resort-website": {
    title: "Luxury Resort Website",
    category: "UI/UX Design",
    description: "An immersive website design with stunning visuals, smooth animations, and intuitive user experience.",
    challenge:
      "The luxury resort wanted a website that would capture the essence of their premium experience and convert visitors into bookings through compelling visual storytelling.",
    solution:
      "Created a visually stunning website with immersive galleries, smooth scroll animations, and strategic call-to-action placement to maximize conversions.",
    technologies: ["Figma", "HTML5", "CSS3", "GSAP", "Three.js", "Intersection Observer"],
    features: [
      "Immersive hero section with video background",
      "Interactive image galleries",
      "Smooth scroll animations",
      "Mobile-first responsive design",
      "SEO optimized structure",
      "Fast loading performance",
    ],
    results: [
      "60% increase in user engagement",
      "35% improvement in booking inquiries",
      "50% reduction in bounce rate",
      "Page load speed under 2 seconds",
    ],
    images: ["resort-website-1.jpg", "resort-website-2.jpg", "resort-website-3.jpg"],
    liveUrl: "https://luxury-resort-demo.com",
    githubUrl: "https://github.com/bineeshks/resort-website",
  },
  "fitness-app": {
    title: "Fitness Tracking App",
    category: "Mobile Development",
    description: "A comprehensive fitness app with workout tracking, social features, and personalized training plans.",
    challenge:
      "Users needed a comprehensive fitness solution that could track workouts, provide motivation through social features, and adapt to their fitness level.",
    solution:
      "Developed a cross-platform mobile app using React Native with real-time data synchronization, social features, and AI-powered workout recommendations.",
    technologies: ["React Native", "Firebase", "Redux", "React Navigation", "Expo", "Chart.js"],
    features: [
      "Workout tracking and analytics",
      "Social features and challenges",
      "Personalized training plans",
      "Progress visualization",
      "Offline mode support",
      "Wearable device integration",
    ],
    results: [
      "10,000+ downloads in first month",
      "4.8/5 app store rating",
      "70% daily active user retention",
      "Featured in App Store fitness category",
    ],
    images: ["fitness-app-1.jpg", "fitness-app-2.jpg", "fitness-app-3.jpg"],
    liveUrl: "https://fitness-app-demo.com",
    githubUrl: "https://github.com/bineeshks/fitness-tracker",
  },
  "crypto-dashboard": {
    title: "Crypto Trading Dashboard",
    category: "Web Application",
    description: "A real-time cryptocurrency trading platform with advanced analytics and portfolio management.",
    challenge:
      "Traders needed a comprehensive platform that could provide real-time market data, advanced charting tools, and portfolio management in one seamless interface.",
    solution:
      "Built a sophisticated trading dashboard with real-time WebSocket connections, advanced charting capabilities, and intuitive portfolio management tools.",
    technologies: ["Vue.js", "Vuex", "Chart.js", "WebSocket", "Node.js", "Redis"],
    features: [
      "Real-time market data streaming",
      "Advanced charting and technical analysis",
      "Portfolio tracking and analytics",
      "Price alerts and notifications",
      "Multi-exchange integration",
      "Dark/light theme support",
    ],
    results: [
      "$2M+ daily trading volume",
      "500+ active daily traders",
      "99.9% uptime reliability",
      "Sub-100ms data latency",
    ],
    images: ["crypto-dashboard-1.jpg", "crypto-dashboard-2.jpg", "crypto-dashboard-3.jpg"],
    liveUrl: "https://crypto-dashboard-demo.com",
    githubUrl: "https://github.com/bineeshks/crypto-dashboard",
  },
  "food-delivery": {
    title: "Food Delivery Platform",
    category: "E-commerce Platform",
    description: "A multi-vendor food delivery platform with real-time tracking and seamless ordering experience.",
    challenge:
      "Creating a scalable platform that could handle multiple restaurants, real-time order tracking, and provide excellent user experience for customers, restaurants, and delivery partners.",
    solution:
      "Developed a comprehensive multi-vendor platform with separate interfaces for customers, restaurants, and delivery partners, featuring real-time tracking and automated dispatch.",
    technologies: ["React", "Express.js", "MongoDB", "Socket.io", "Google Maps API", "Stripe"],
    features: [
      "Multi-vendor restaurant management",
      "Real-time order tracking",
      "Automated dispatch system",
      "Multiple payment options",
      "Rating and review system",
      "Analytics dashboard for vendors",
    ],
    results: [
      "500+ orders processed daily",
      "50+ partner restaurants",
      "25% faster delivery times",
      "4.7/5 average customer rating",
    ],
    images: ["food-delivery-1.jpg", "food-delivery-2.jpg", "food-delivery-3.jpg"],
    liveUrl: "https://food-delivery-demo.com",
    githubUrl: "https://github.com/bineeshks/food-delivery",
  },
}

/**
 * Open portfolio modal with project details
 * @param {string} projectId - Project identifier
 */
function openPortfolioModal(projectId) {
  const project = portfolioData[projectId]
  if (!project) return

  const modalContent = `
    <div class="project-detail">
      <div class="project-detail__header">
        <div class="project-detail__images">
          <img src="${project.images[0]}" alt="${project.title}" class="project-detail__main-image" loading="lazy">
          <div class="project-detail__thumbnails">
            ${project.images
              .map(
                (img, index) => `
              <img src="${img}" alt="${project.title} ${index + 1}" class="project-detail__thumbnail ${index === 0 ? "active" : ""}" data-index="${index}">
            `,
              )
              .join("")}
          </div>
        </div>
        <div class="project-detail__info">
          <span class="project-detail__category">${project.category}</span>
          <h2 class="project-detail__title">${project.title}</h2>
          <p class="project-detail__description">${project.description}</p>
          
          <div class="project-detail__links">
            <a href="${project.liveUrl}" target="_blank" class="btn btn--primary">
              <i data-lucide="external-link"></i>
              <span>View Live</span>
            </a>
            <a href="${project.githubUrl}" target="_blank" class="btn btn--secondary">
              <i data-lucide="github"></i>
              <span>View Code</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="project-detail__content">
        <div class="project-detail__section">
          <h3><i data-lucide="target"></i> The Challenge</h3>
          <p>${project.challenge}</p>
        </div>
        
        <div class="project-detail__section">
          <h3><i data-lucide="lightbulb"></i> The Solution</h3>
          <p>${project.solution}</p>
        </div>
        
        <div class="project-detail__section">
          <h3><i data-lucide="code"></i> Technologies Used</h3>
          <div class="project-detail__technologies">
            ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
          </div>
        </div>
        
        <div class="project-detail__section">
          <h3><i data-lucide="check-circle"></i> Key Features</h3>
          <ul class="project-detail__features">
            ${project.features.map((feature) => `<li><i data-lucide="check"></i>${feature}</li>`).join("")}
          </ul>
        </div>
        
        <div class="project-detail__section">
          <h3><i data-lucide="trending-up"></i> Results & Impact</h3>
          <div class="project-detail__results">
            ${project.results
              .map(
                (result) => `
              <div class="result-item">
                <i data-lucide="arrow-up-right"></i>
                <span>${result}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `

  modalBody.innerHTML = modalContent
  portfolioModal.classList.add("show")
  document.body.style.overflow = "hidden"

  // Initialize Lucide icons in modal
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Add image gallery functionality
  const thumbnails = modalBody.querySelectorAll(".project-detail__thumbnail")
  const mainImage = modalBody.querySelector(".project-detail__main-image")

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = thumb.dataset.index
      mainImage.src = project.images[index]

      thumbnails.forEach((t) => t.classList.remove("active"))
      thumb.classList.add("active")
    })
  })

  trapFocus(portfolioModal)
}

/**
 * Close portfolio modal
 */
function closePortfolioModal() {
  portfolioModal.classList.remove("show")
  document.body.style.overflow = ""
}

// Portfolio modal event listeners
portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    const projectId = item.getAttribute("data-project")
    openPortfolioModal(projectId)
  })
})

if (modalClose) {
  modalClose.addEventListener("click", closePortfolioModal)
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", closePortfolioModal)
}

// ===== PORTFOLIO FILTERING =====

/**
 * Filter portfolio items by category
 * @param {string} filter - Category filter
 */
function filterPortfolio(filter) {
  currentFilter = filter

  portfolioItems.forEach((item) => {
    const categories = item.getAttribute("data-category").split(" ")
    const shouldShow = filter === "all" || categories.includes(filter)

    if (shouldShow) {
      item.style.display = "block"
      item.style.animation = "fadeInUp 0.6s ease-out"
    } else {
      item.style.display = "none"
    }
  })

  // Update active filter button
  filterBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === filter)
  })
}

// Filter button event listeners
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter")
    filterPortfolio(filter)
  })
})

// ===== TESTIMONIALS SLIDER =====

/**
 * Show specific testimonial slide
 * @param {number} index - Slide index
 */
function showTestimonial(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index)
  })

  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })

  currentTestimonial = index
}

/**
 * Show next testimonial
 */
function nextTestimonial() {
  const nextIndex = (currentTestimonial + 1) % testimonialSlides.length
  showTestimonial(nextIndex)
}

/**
 * Show previous testimonial
 */
function prevTestimonial() {
  const prevIndex = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length
  showTestimonial(prevIndex)
}

/**
 * Start testimonial auto-play
 */
function startTestimonialSlider() {
  testimonialInterval = setInterval(nextTestimonial, 5000)
}

/**
 * Stop testimonial auto-play
 */
function stopTestimonialSlider() {
  clearInterval(testimonialInterval)
}

// Testimonial navigation event listeners
if (testimonialNext) {
  testimonialNext.addEventListener("click", () => {
    nextTestimonial()
    stopTestimonialSlider()
    startTestimonialSlider()
  })
}

if (testimonialPrev) {
  testimonialPrev.addEventListener("click", () => {
    prevTestimonial()
    stopTestimonialSlider()
    startTestimonialSlider()
  })
}

// Testimonial dot event listeners
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showTestimonial(index)
    stopTestimonialSlider()
    startTestimonialSlider()
  })
})

// Pause slider on hover
const testimonialsSection = document.querySelector(".testimonials__slider")
if (testimonialsSection) {
  testimonialsSection.addEventListener("mouseenter", stopTestimonialSlider)
  testimonialsSection.addEventListener("mouseleave", startTestimonialSlider)
}

// Initialize testimonial slider
if (testimonialSlides.length > 0) {
  startTestimonialSlider()
}

// ===== CONTACT FORM FUNCTIONALITY =====

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Handle contact form submission
 * @param {Event} e - Form submit event
 */
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name").trim()
  const email = formData.get("email").trim()
  const subject = formData.get("subject")
  const budget = formData.get("budget")
  const message = formData.get("message").trim()

  // Basic validation
  if (!name || !email || !subject || !message) {
    showToast("Please fill in all required fields.", "error")
    return
  }

  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address.", "error")
    return
  }

  if (message.length < 20) {
    showToast("Please provide a more detailed message (minimum 20 characters).", "error")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i data-lucide="loader-2"></i><span>Sending...</span>'
  submitBtn.disabled = true

  // Reinitialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  setTimeout(() => {
    showToast("Thank you for your message! I'll get back to you within 24 hours.", "success")
    contactForm.reset()
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false

    // Reinitialize Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons()
    }
  }, 2000)
}

// Contact form event listener
if (contactForm) {
  contactForm.addEventListener("submit", handleContactForm)
}

// Toast close functionality
if (toastClose) {
  toastClose.addEventListener("click", () => {
    successToast.classList.remove("show")
  })
}

// ===== COUNTER ANIMATION =====

/**
 * Animate a counter to a target value
 * @param {HTMLElement} element - Counter element
 * @param {number} target - Target value
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, target, duration = 2000) {
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    element.textContent = Math.floor(current)

    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    }
  }, 16)
}

/**
 * Initialize counters with Intersection Observer
 */
function initializeCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.getAttribute("data-count"))
          animateCounter(entry.target, target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => {
    observer.observe(stat)
  })
}

// ===== SCROLL EFFECTS =====

/**
 * Update header and floating elements on scroll
 */
function handleScroll() {
  const scrollY = window.scrollY
  const header = document.querySelector(".header")

  // Header background on scroll
  if (scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(20px)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(20px)"
  }

  // Back to top button
  if (backToTop) {
    if (scrollY > 500) {
      backToTop.classList.add("show")
    } else {
      backToTop.classList.remove("show")
    }
  }

  // Parallax effect for floating elements
  const floatingElements = document.querySelectorAll(".floating-element")
  floatingElements.forEach((element, index) => {
    const speed = element.getAttribute("data-speed") || 1
    const yPos = -(scrollY * speed * 0.1)
    element.style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`
  })
}

// Throttled scroll handler
let scrollTimeout
window.addEventListener("scroll", () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      handleScroll()
      scrollTimeout = null
    }, 10)
  }
})

// Back to top functionality
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

/**
 * Initialize Intersection Observer for fade-in animations
 */
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Add stagger effect for multiple elements
        const siblings = Array.from(entry.target.parentElement.children)
        const index = siblings.indexOf(entry.target)
        entry.target.style.transitionDelay = `${index * 0.1}s`
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(`
    .service-card, 
    .portfolio-item, 
    .highlight-item, 
    .skill-category,
    .testimonial,
    .contact__item,
    .section-header
  `)

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// ===== LOADING SCREEN =====

/**
 * Hide loading screen after a delay
 */
function hideLoadingScreen() {
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    isLoading = false
    initializeAnimations()
    startParticles()
  }, 2000)
}

// ===== CURSOR EFFECTS =====

/**
 * Initialize custom cursor effects
 */
function initializeCursor() {
  if (!cursorDot || !cursorOutline) return

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursorDot.style.left = e.clientX + "px"
    cursorDot.style.top = e.clientY + "px"

    cursorOutline.style.left = e.clientX + "px"
    cursorOutline.style.top = e.clientY + "px"
  })

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll("a, button, [data-tilt]")

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(2)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
    })

    el.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
    })
  })
}

// ===== PARTICLES SYSTEM =====

/**
 * Create a new particle
 * @returns {Object} - Particle object
 */
function createParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + 10,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? "#6366f1" : "#ec4899",
  }
}

/**
 * Update positions of all particles
 */
function updateParticles() {
  particles.forEach((particle, index) => {
    particle.y -= particle.speed
    particle.x += Math.sin(particle.y * 0.01) * 0.5

    if (particle.y < -10) {
      particles[index] = createParticle()
    }
  })
}

/**
 * Render particles on the screen
 */
function renderParticles() {
  if (!particlesContainer) return

  particlesContainer.innerHTML = ""

  particles.forEach((particle) => {
    const particleEl = document.createElement("div")
    particleEl.className = "particle"
    particleEl.style.cssText = `
      left: ${particle.x}px;
      top: ${particle.y}px;
      width: ${particle.size}px;
      height: ${particle.size}px;
      background: ${particle.color};
      opacity: ${particle.opacity};
    `
    particlesContainer.appendChild(particleEl)
  })
}

/**
 * Start the particles animation
 */
function startParticles() {
  // Create initial particles
  for (let i = 0; i < 50; i++) {
    particles.push(createParticle())
  }

  function animateParticles() {
    updateParticles()
    renderParticles()
    requestAnimationFrame(animateParticles)
  }

  animateParticles()
}

// ===== TILT EFFECT =====

/**
 * Initialize tilt effect for elements
 */
function initializeTilt() {
  const tiltElements = document.querySelectorAll("[data-tilt]")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    })
  })
}

// ===== KEYBOARD NAVIGATION =====

/**
 * Handle keyboard navigation
 * @param {Event} e - Keyboard event
 */
document.addEventListener("keydown", (e) => {
  // Close modals with Escape key
  if (e.key === "Escape") {
    if (portfolioModal.classList.contains("show")) {
      closePortfolioModal()
    }
    if (successToast.classList.contains("show")) {
      successToast.classList.remove("show")
    }
  }

  // Navigate testimonials with arrow keys
  if (e.key === "ArrowLeft" && document.activeElement.closest(".testimonials")) {
    prevTestimonial()
    stopTestimonialSlider()
    startTestimonialSlider()
  }

  if (e.key === "ArrowRight" && document.activeElement.closest(".testimonials")) {
    nextTestimonial()
    stopTestimonialSlider()
    startTestimonialSlider()
  }
})

// ===== PERFORMANCE OPTIMIZATIONS =====

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in ms
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===== INITIALIZATION =====

/**
 * Initialize all functionality when DOM is loaded
 */
function initialize() {
  // Initialize theme
  initializeTheme()

  // Initialize cursor effects (desktop only)
  if (window.innerWidth > 1024) {
    initializeCursor()
  }

  // Initialize tilt effects
  initializeTilt()

  // Initialize counters
  initializeCounters()

  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Set initial header state
  handleScroll()

  console.log("🚀 Bineesh K S Portfolio initialized successfully!")
}

// ===== EVENT LISTENERS =====

// Hide loading screen on window load
window.addEventListener("load", () => {
  hideLoadingScreen()
})

// Reinitialize cursor effects on window resize
window.addEventListener(
  "resize",
  debounce(() => {
    if (window.innerWidth > 1024) {
      initializeCursor()
    }
  }, 250),
)

// ===== ERROR HANDLING =====

/**
 * Global error handler
 */
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

/**
 * Handle unhandled promise rejections
 */
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
  e.preventDefault()
})

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize)
} else {
  initialize()
}

// ===== ADDITIONAL STYLES FOR MODAL =====

const additionalStyles = `
<style>
.project-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.project-detail__header {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-detail__images {
  position: relative;
}

.project-detail__main-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.project-detail__thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.project-detail__thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  border: 2px solid transparent;
}

.project-detail__thumbnail.active,
.project-detail__thumbnail:hover {
  opacity: 1;
  border-color: var(--primary-color);
}

.project-detail__category {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 50px;
  margin-bottom: 1rem;
}

.project-detail__title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.project-detail__description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.project-detail__links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-detail__content {
  display: grid;
  gap: 2rem;
}

.project-detail__section h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.project-detail__section h3 i {
  color: var(--primary-color);
}

.project-detail__section p {
  color: var(--text-secondary);
  line-height: 1.7;
}

.project-detail__technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.project-detail__features {
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.project-detail__features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
}

.project-detail__features li i {
  color: var(--success-color);
  font-size: 1rem;
}

.project-detail__results {
  display: grid;
  gap: 1rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.result-item i {
  color: var(--primary-color);
  font-size: 1.25rem;
}

.result-item span {
  font-weight: 600;
  color: var(--text-primary);
}

@media (min-width: 768px) {
  .project-detail__header {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
  
  .project-detail__main-image {
    height: 400px;
  }
  
  .project-detail__results {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
`

// Inject additional styles
document.head.insertAdjacentHTML("beforeend", additionalStyles)
