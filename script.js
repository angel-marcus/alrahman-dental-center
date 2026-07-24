document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------
     MOBILE NAVIGATION (hamburger drawer)
     ------------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  function closeNav() {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-active");
    navOverlay.classList.remove("is-active");
    document.body.classList.remove("nav-open");
  }

  function openNav() {
    navToggle.setAttribute("aria-expanded", "true");
    navLinks.classList.add("is-active");
    navOverlay.classList.add("is-active");
    document.body.classList.add("nav-open");
  }

  if (navToggle && navLinks && navOverlay) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });

    navOverlay.addEventListener("click", closeNav);

    // Close the drawer whenever a nav link is tapped
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    // Close automatically if the viewport grows back to desktop size
    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ------------------------------------------------------------------
     SCROLL REVEAL
     Falls back to showing everything immediately if IntersectionObserver
     isn't supported, so content never gets stuck invisible.
     ------------------------------------------------------------------ */
  const revealItems = document.querySelectorAll(".reveal-item, .reveal-group");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    // No IntersectionObserver support — reveal everything right away
    revealItems.forEach((item) => item.classList.add("is-revealed"));
  }

  // Safety net: if something above the fold never intersects (e.g. very
  // tall viewport, zoomed-out browser, or an observer edge case), reveal
  // it anyway after a short delay so nothing stays permanently hidden.
  window.setTimeout(() => {
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add("is-revealed");
      }
    });
  }, 1200);
});