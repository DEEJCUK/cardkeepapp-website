const WELCOME_STORAGE_KEY = "cardkeepapp-welcome-shown";

function isReducedMotionPreferred() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getHeaderOffset() {
  return document.querySelector(".header")?.offsetHeight || 70;
}

function closeMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) {
    return;
  }

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

function trapFocus(container, event) {
  if (event.key !== "Tab") {
    return;
  }

  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  if (focusable.length === 0) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    last.focus();
    event.preventDefault();
  } else if (!event.shiftKey && document.activeElement === last) {
    first.focus();
    event.preventDefault();
  }
}

function markWelcomeSeen() {
  try {
    localStorage.setItem(WELCOME_STORAGE_KEY, "true");
    return;
  } catch (error) {
    try {
      sessionStorage.setItem(WELCOME_STORAGE_KEY, "true");
      return;
    } catch (fallbackError) {
      window.cardkeepWelcomeShown = true;
    }
  }
}

function hasSeenWelcome() {
  try {
    return localStorage.getItem(WELCOME_STORAGE_KEY) === "true";
  } catch (error) {
    try {
      return sessionStorage.getItem(WELCOME_STORAGE_KEY) === "true";
    } catch (fallbackError) {
      return window.cardkeepWelcomeShown === true;
    }
  }
}

function isHomePage() {
  const { pathname } = window.location;
  return (
    pathname === "/" ||
    pathname.endsWith("/index.html") ||
    pathname.endsWith("/CardKeep-Website/")
  );
}

function showWelcomePopup() {
  const popup = document.getElementById("welcomePopup");
  const closeButton = popup?.querySelector(".welcome-close");

  if (!popup) {
    return;
  }

  popup.style.display = "flex";
  closeButton?.focus();
}

function closeWelcomePopup() {
  const popup = document.getElementById("welcomePopup");

  if (!popup) {
    return;
  }

  popup.style.display = "none";
  markWelcomeSeen();
}

function initMobileNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger || !navMenu) {
    return;
  }

  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!isExpanded));
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

function initSmoothScrolling() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      const top =
        target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

      window.scrollTo({
        top,
        behavior: isReducedMotionPreferred() ? "auto" : "smooth",
      });
    });
  });
}

function initHeaderState() {
  const header = document.querySelector(".header");

  if (!header) {
    return;
  }

  const updateHeader = () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".feature-card, .about-text");

  if (elements.length === 0) {
    return;
  }

  if (isReducedMotionPreferred() || !("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(element);
  });
}

function initFeatureCardAccessibility() {
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "article");
  });
}

function initWelcomePopup() {
  const popup = document.getElementById("welcomePopup");
  const closeButton = popup?.querySelector(".welcome-close");

  if (!popup || !closeButton) {
    return;
  }

  closeButton.addEventListener("click", closeWelcomePopup);

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeWelcomePopup();
    }
  });

  popup.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeWelcomePopup();
      return;
    }

    trapFocus(popup, event);
  });

  if (!hasSeenWelcome() && isHomePage()) {
    window.setTimeout(showWelcomePopup, 1500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initSmoothScrolling();
  initHeaderState();
  initRevealAnimations();
  initFeatureCardAccessibility();
  initWelcomePopup();
});

window.closeWelcomePopup = closeWelcomePopup;
