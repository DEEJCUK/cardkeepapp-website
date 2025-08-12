// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !isExpanded);
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }),
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Get the header height to offset scroll position
      const headerHeight =
        document.querySelector(".header")?.offsetHeight || 70;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header background on scroll
const header = document.querySelector(".header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
  lastScrollY = window.scrollY;
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".feature-card, .about-text, .phone-mockup")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

// Enhanced card stack animation with cute effects
const cardStack = document.querySelector(".card-stack");
if (cardStack) {
  cardStack.addEventListener("mouseenter", () => {
    cardStack.style.transform = "scale(1.05)";
    cardStack.style.filter = "brightness(1.1)";

    // Add sparkle effect
    createSparkles(cardStack);
  });

  cardStack.addEventListener("mouseleave", () => {
    cardStack.style.transform = "scale(1)";
    cardStack.style.filter = "brightness(1)";
  });
}

// Create sparkle animation
function createSparkles(element) {
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement("div");
    sparkle.innerHTML = "✨";
    sparkle.style.position = "absolute";
    sparkle.style.pointerEvents = "none";
    sparkle.style.fontSize = "20px";
    sparkle.style.zIndex = "1000";

    const rect = element.getBoundingClientRect();
    sparkle.style.left = rect.left + Math.random() * rect.width + "px";
    sparkle.style.top = rect.top + Math.random() * rect.height + "px";

    document.body.appendChild(sparkle);

    // Animate sparkle
    sparkle.animate(
      [
        { transform: "translateY(0px) scale(0)", opacity: 1 },
        { transform: "translateY(-30px) scale(1)", opacity: 0.8 },
        { transform: "translateY(-60px) scale(0)", opacity: 0 },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      },
    ).onfinish = () => sparkle.remove();
  }
}

// Enhanced download button interactions with cute feedback
document.querySelectorAll(".download-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Only handle disabled Android button, let iOS anchor link work normally
    if (btn.disabled && btn.classList.contains("android")) {
      // For disabled Android button, show coming soon message
      e.preventDefault();

      const originalText = btn.innerHTML;
      btn.innerHTML = "🔜 Coming Soon!";

      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    }
  });

  // Add hover sound effect simulation
  btn.addEventListener("mouseenter", () => {
    btn.style.filter = "brightness(1.1) saturate(1.2)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.filter = "brightness(1) saturate(1)";
  });
});

// Removed parallax effect to prevent page bouncing

// Enhanced feature cards with 3D tilt and cute effects
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.filter = "brightness(1.05) saturate(1.1)";
    // Add subtle glow
    card.style.boxShadow =
      "0 20px 40px rgba(255, 107, 157, 0.3), 0 0 20px rgba(255, 107, 157, 0.1)";
  });

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;

    // Create subtle following light effect
    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 107, 157, 0.1) 0%, transparent 50%), linear-gradient(135deg, white 0%, #fef7ff 100%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    card.style.filter = "brightness(1) saturate(1)";
    card.style.background = "linear-gradient(135deg, white 0%, #fef7ff 100%)";
    card.style.boxShadow = "0 4px 20px rgba(157, 92, 255, 0.15)";
  });
});

// Enhanced typing animation for hero title with cute effects
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
  const text = heroTitle.innerHTML; // Use innerHTML to preserve the span
  heroTitle.innerHTML = "";

  // Create a cursor element
  const cursor = document.createElement("span");
  cursor.innerHTML = "|";
  cursor.style.animation = "blink 1s infinite";
  cursor.style.color = "#ff6b9d";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      const char = text.charAt(i);
      if (char === "<") {
        // Handle HTML tags
        const tagEnd = text.indexOf(">", i);
        heroTitle.innerHTML += text.substring(i, tagEnd + 1);
        i = tagEnd + 1;
      } else {
        heroTitle.innerHTML += char;
        i++;
      }

      // Add sparkle effect occasionally
      if (i % 8 === 0 && Math.random() > 0.7) {
        createTinySparkle(heroTitle);
      }

      setTimeout(typeWriter, 80);
    } else {
      // Remove cursor when done
      setTimeout(() => {
        cursor.remove();
        // Add final celebration effect
        createHeartBurst(heroTitle);
      }, 1000);
    }
  };

  heroTitle.appendChild(cursor);
  setTimeout(typeWriter, 800);
}

// Create tiny sparkles for typing effect
function createTinySparkle(element) {
  const sparkle = document.createElement("span");
  sparkle.innerHTML = "✨";
  sparkle.style.position = "absolute";
  sparkle.style.fontSize = "12px";
  sparkle.style.zIndex = "10";
  sparkle.style.pointerEvents = "none";

  const rect = element.getBoundingClientRect();
  sparkle.style.left = rect.right - 20 + "px";
  sparkle.style.top = rect.top + Math.random() * rect.height + "px";

  document.body.appendChild(sparkle);

  sparkle.animate(
    [
      { opacity: 0, transform: "scale(0) rotate(0deg)" },
      { opacity: 1, transform: "scale(1) rotate(180deg)" },
      { opacity: 0, transform: "scale(0) rotate(360deg)" },
    ],
    {
      duration: 600,
      easing: "ease-out",
    },
  ).onfinish = () => sparkle.remove();
}

// Create heart burst effect
function createHeartBurst(element) {
  const rect = element.getBoundingClientRect();
  const hearts = ["💖", "💕", "💗", "🌟", "✨"];

  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = "fixed";
    heart.style.left = rect.left + Math.random() * rect.width + "px";
    heart.style.top = rect.top - 10 + "px";
    heart.style.fontSize = "20px";
    heart.style.zIndex = "1000";
    heart.style.pointerEvents = "none";

    document.body.appendChild(heart);

    heart.animate(
      [
        { transform: "translateY(0) scale(0)", opacity: 1 },
        { transform: "translateY(-50px) scale(1.2)", opacity: 0.8 },
        { transform: "translateY(-100px) scale(0)", opacity: 0 },
      ],
      {
        duration: 1500,
        delay: i * 100,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    ).onfinish = () => heart.remove();
  }
}

// Add enhanced CSS animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes cuteWiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-3deg); }
        75% { transform: rotate(3deg); }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .cute-hover:hover {
        animation: cuteWiggle 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// Removed loading animation to prevent page bouncing

// Accessibility helper functions
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }

    if (e.key === "Escape") {
      // Handle escape key for any modal
    }
  });
}

// Keyboard navigation for cards
document.querySelectorAll(".feature-card").forEach((card, index) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "article");

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      card.click();
      e.preventDefault();
    }
  });
});

console.log("🎴 CardKeepApp Website loaded successfully!");
console.log("✨ Welcome to the cutest card collection manager!");
console.log("🌈 Made with love and lots of emojis! 💖");
console.log("♿ Fully accessible for everyone!");

// Add cute loading celebration
window.addEventListener("load", () => {
  setTimeout(() => {
    createWelcomeSparkles();
  }, 1000);
});

// Create welcome sparkles
function createWelcomeSparkles() {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.innerHTML = "✨";
      sparkle.style.position = "fixed";
      sparkle.style.left = Math.random() * window.innerWidth + "px";
      sparkle.style.top = Math.random() * window.innerHeight + "px";
      sparkle.style.fontSize = "24px";
      sparkle.style.zIndex = "1000";
      sparkle.style.pointerEvents = "none";

      document.body.appendChild(sparkle);

      sparkle.animate(
        [
          { transform: "scale(0) rotate(0deg)", opacity: 0 },
          { transform: "scale(1.5) rotate(180deg)", opacity: 1 },
          { transform: "scale(0) rotate(360deg)", opacity: 0 },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
      ).onfinish = () => sparkle.remove();
    }, i * 200);
  }
}

// Welcome Popup Functions
function showWelcomePopup() {
  const popup = document.getElementById("welcomePopup");
  if (popup) {
    popup.style.display = "flex";

    // Focus management for accessibility
    const closeButton = popup.querySelector(".welcome-close");
    if (closeButton) {
      closeButton.focus();
    }

    // Trap focus within popup
    trapFocus(popup);

    // Add sparkle effect
    setTimeout(() => {
      createWelcomePopupSparkles();
    }, 500);
  }
}

function closeWelcomePopup() {
  const popup = document.getElementById("welcomePopup");
  if (popup) {
    popup.style.display = "none";

    // Mark that user has seen the welcome popup (with fallback for private browsing)
    try {
      localStorage.setItem("cardkeepapp-welcome-shown", "true");
    } catch (e) {
      // Fallback for private browsing: use sessionStorage or just set a flag
      try {
        sessionStorage.setItem("cardkeepapp-welcome-shown", "true");
      } catch (e2) {
        // As last resort, just set a global variable for this session
        window.cardkeepWelcomeShown = true;
      }
    }
  }
}

// Check if this is the first visit
function checkFirstVisit() {
  let hasSeenWelcome = false;

  // Try multiple storage methods for private browsing compatibility
  try {
    hasSeenWelcome =
      localStorage.getItem("cardkeepapp-welcome-shown") === "true";
  } catch (e) {
    try {
      hasSeenWelcome =
        sessionStorage.getItem("cardkeepapp-welcome-shown") === "true";
    } catch (e2) {
      hasSeenWelcome = window.cardkeepWelcomeShown === true;
    }
  }

  // Only show on index.html and if user hasn't seen it before
  if (
    !hasSeenWelcome &&
    (window.location.pathname === "/" ||
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/CardKeep-Website/")
  ) {
    // Wait a bit for the page to load nicely
    setTimeout(() => {
      showWelcomePopup();
    }, 1500);
  }
}

// Create sparkles for welcome popup
function createWelcomePopupSparkles() {
  const popup = document.querySelector(".welcome-popup-content");
  if (!popup) return;

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.innerHTML = ["✨", "💖", "💜", "🌟", "💕"][
        Math.floor(Math.random() * 5)
      ];
      sparkle.style.position = "absolute";
      sparkle.style.pointerEvents = "none";
      sparkle.style.fontSize = "20px";
      sparkle.style.zIndex = "2001";

      const rect = popup.getBoundingClientRect();
      sparkle.style.left = rect.left + Math.random() * rect.width + "px";
      sparkle.style.top = rect.top + Math.random() * rect.height + "px";

      document.body.appendChild(sparkle);

      sparkle.animate(
        [
          { transform: "scale(0) rotate(0deg)", opacity: 0 },
          { transform: "scale(1.2) rotate(180deg)", opacity: 1 },
          { transform: "scale(0) rotate(360deg)", opacity: 0 },
        ],
        {
          duration: 2000,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
      ).onfinish = () => sparkle.remove();
    }, i * 150);
  }
}

// Initialize first visit check when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  checkFirstVisit();
  checkLaunchAnimation();
});

// Close welcome popup when clicking outside
window.addEventListener("click", (event) => {
  const welcomePopup = document.getElementById("welcomePopup");
  if (event.target === welcomePopup) {
    closeWelcomePopup();
  }
});

// Close welcome popup with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const welcomePopup = document.getElementById("welcomePopup");
    if (welcomePopup && welcomePopup.style.display === "flex") {
      closeWelcomePopup();
    }

    const launchOverlay = document.getElementById("launchOverlay");
    if (launchOverlay && !launchOverlay.classList.contains("fade-out")) {
      closeLaunchAnimation();
    }
  }
});

// Launch Animation Functions
let launchCurrentSlide = 0;
let launchSlides = [];
let launchInterval;

function checkLaunchAnimation() {
  let hasSeenLaunch = false;

  // Use sessionStorage so it shows once per browser session (not just once ever)
  try {
    hasSeenLaunch =
      sessionStorage.getItem("cardkeepapp-launch-v110-shown") === "true";
  } catch (e) {
    // Fallback for private browsing: use window variable
    hasSeenLaunch = window.cardkeepLaunchShown === true;
  }

  // Only show on index.html and if user hasn't seen v1.1.0 launch yet
  if (
    !hasSeenLaunch &&
    (window.location.pathname === "/" ||
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/CardKeep-Website/")
  ) {
    // Show launch animation after a brief delay
    setTimeout(() => {
      showLaunchAnimation();
    }, 800);
  }
}

function showLaunchAnimation() {
  const overlay = document.getElementById("launchOverlay");
  if (overlay) {
    overlay.style.display = "flex";
    launchSlides = overlay.querySelectorAll(".launch-slide");

    // Start the slideshow
    launchCurrentSlide = 0;
    showLaunchSlide(0);
    startLaunchAutoPlay();
    startLaunchHearts();

    // Auto-close after all slides (20 seconds)
    setTimeout(() => {
      closeLaunchAnimation();
    }, 20000); // 4 seconds per slide × 5 slides = 20 seconds
  }
}

function showLaunchSlide(index) {
  if (!launchSlides.length) return;

  launchSlides.forEach((slide) => slide.classList.remove("active"));
  launchSlides[index].classList.add("active");

  // Animate feature items if present
  const featureItems = launchSlides[index].querySelectorAll(
    ".launch-feature-item",
  );
  setTimeout(() => {
    featureItems.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add("animate");
      }, i * 200);
    });
  }, 300);
}

function nextLaunchSlide() {
  launchCurrentSlide = (launchCurrentSlide + 1) % launchSlides.length;
  showLaunchSlide(launchCurrentSlide);
}

function startLaunchAutoPlay() {
  launchInterval = setInterval(() => {
    nextLaunchSlide();
  }, 4000);
}

function closeLaunchAnimation() {
  const overlay = document.getElementById("launchOverlay");
  if (overlay) {
    clearInterval(launchInterval);
    overlay.classList.add("fade-out");

    // Mark that user has seen the v1.1.0 launch for this session (with fallback for private browsing)
    try {
      sessionStorage.setItem("cardkeepapp-launch-v110-shown", "true");
    } catch (e) {
      // Fallback for private browsing: use window variable
      window.cardkeepLaunchShown = true;
    }

    // Hide completely after fade transition
    setTimeout(() => {
      overlay.style.display = "none";
    }, 1000);
  }
}

// Add hearts periodically during launch
function createLaunchHeart() {
  const containers = document.querySelectorAll(".launch-floating-hearts");
  containers.forEach((container) => {
    if (!container || !container.offsetParent) return; // Skip if not visible

    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.className = "launch-heart";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 4 + "s";

    container.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 4000);
  });
}

// Start creating hearts when launch animation is active
function startLaunchHearts() {
  const heartInterval = setInterval(() => {
    const overlay = document.getElementById("launchOverlay");
    if (
      !overlay ||
      overlay.style.display === "none" ||
      overlay.classList.contains("fade-out")
    ) {
      clearInterval(heartInterval);
      return;
    }
    createLaunchHeart();
  }, 1000);
}
