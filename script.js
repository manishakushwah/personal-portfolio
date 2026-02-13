

document.addEventListener("DOMContentLoaded", function () {

  const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only handle hash links
      if (href && href.startsWith("#")) {
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          e.preventDefault();

          // Smooth scroll to section
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update URL without jumping
          history.pushState(null, null, href);
        }
      }
    });
  });

  const sections = document.querySelectorAll(".section, .hero-section");
  const navigationLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 100) {
        currentSection = section.getAttribute("id");
      }
    });

    navigationLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // Update on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Initial update
  updateActiveLink();

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.style.padding = "0.75rem 2.5rem";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.6)";
      } else {
        navbar.style.padding = "1rem 2.5rem";
        navbar.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.4)";
      }

      lastScroll = currentScroll;
    });
  }

  const skillBars = document.querySelectorAll(".skill-progress");

  if (skillBars.length > 0) {
    // Store original widths and reset to 0 for animation
    skillBars.forEach((bar) => {
      const targetWidth = bar.style.width || "0%";
      bar.setAttribute("data-width", targetWidth);
      bar.style.width = "0";
    });

    const animateSkills = () => {
      skillBars.forEach((bar) => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (
          barPosition < screenPosition &&
          !bar.classList.contains("animated")
        ) {
          const targetWidth = bar.getAttribute("data-width");
          bar.style.width = targetWidth;
          bar.classList.add("animated");
        }
      });
    };

    window.addEventListener("scroll", animateSkills);

    // Initial check in case skills are already visible
    setTimeout(animateSkills, 100);
  }

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");

      // Check if elements exist
      if (!name || !email || !subject || !message) {
        console.error("Form elements not found");
        return;
      }

      const nameValue = name.value.trim();
      const emailValue = email.value.trim();
      const subjectValue = subject.value.trim();
      const messageValue = message.value.trim();

      // Basic validation
      if (!nameValue || !emailValue || !subjectValue || !messageValue) {
        alert("Please fill in all fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        alert("Please enter a valid email address");
        return;
      }

      // Success message (in production, this would send the form data)
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  const revealElements = document.querySelectorAll(
    ".project-card, .certificate-card, .skill-item, .stat-card",
  );

  if (revealElements.length > 0) {
    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    };

    // Set initial state
    revealElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    window.addEventListener("scroll", revealOnScroll);

    // Initial check
    revealOnScroll();
  }

  const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
      // Future mobile menu implementation
      // Can add hamburger menu functionality here
    }
  };

  window.addEventListener("resize", debounce(createMobileMenu, 250));
  createMobileMenu();

  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach((link) => {
    if (!link.hasAttribute("rel")) {
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // Close any modals or menus if open
      // Future implementation for modals
      const activeElement = document.activeElement;
      if (activeElement) {
        activeElement.blur();
      }
    }
  });

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple styles dynamically
  const style = document.createElement("style");
  style.textContent = `
        button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
  const createScrollToTopButton = () => {
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.className = "scroll-to-top";
    scrollBtn.setAttribute("aria-label", "Scroll to top");

    // Add styles
    const scrollBtnStyle = document.createElement("style");
    scrollBtnStyle.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #00eaff, #0088cc);
                border: none;
                color: #04202c;
                font-size: 1.2rem;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                box-shadow: 0 4px 15px rgba(0, 234, 255, 0.4);
            }
            
            .scroll-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .scroll-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 20px rgba(0, 234, 255, 0.6);
            }
        `;
    document.head.appendChild(scrollBtnStyle);
    document.body.appendChild(scrollBtn);

    // Show/hide on scroll
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    });

    // Scroll to top on click
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  createScrollToTopButton();
  console.log(
    "%c👋 Welcome to my portfolio!",
    "color: #00eaff; font-size: 20px; font-weight: bold;",
  );
  console.log(
    "%cLooking to hire? Let's connect!",
    "color: #ff4d4d; font-size: 14px;",
  );
  console.log(
    "%cEmail: Kushwahmanisha500@gmail.com",
    "color: #92999f; font-size: 12px;",
  );
  console.log(
    "%cGitHub: https://github.com/manishakushwah",
    "color: #92999f; font-size: 12px;",
  );
});

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

