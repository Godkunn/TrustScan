document.addEventListener("DOMContentLoaded", () => {
  // Modal & UI Elements
  const leadModal = document.getElementById("lead-modal");
  const loginModal = document.getElementById("login-modal");
  const closeLead = document.getElementById("close-lead");
  const closeLogin = document.getElementById("close-login");
  const subscribeForm = document.getElementById("subscribe-form");
  const navSignin = document.getElementById("nav-signin");
  const mobileSignin = document.getElementById("mobile-signin");
  const mockGoogleLogin = document.getElementById("mock-google-login");
  const openLeadCta = document.getElementById("open-lead-cta");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const analyzeBtn = document.getElementById("analyze-btn");

  // Reusable Open/Close Functions
  const openEl = (el) => {
    if (!el) return;
    el.classList.remove("hidden");
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeEl = (el) => {
    if (!el) return;
    el.classList.add("hidden");
    el.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scrolling
  };

  // Mobile Menu Toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  // Trigger Modals
  if (navSignin) navSignin.addEventListener("click", () => openEl(loginModal));
  if (mobileSignin) mobileSignin.addEventListener("click", () => {
    closeEl(mobileMenu); // Close menu when opening modal
    openEl(loginModal);
  });
  if (closeLead) closeLead.addEventListener("click", () => closeEl(leadModal));
  if (closeLogin) closeLogin.addEventListener("click", () => closeEl(loginModal));
  if (openLeadCta) openLeadCta.addEventListener("click", () => openEl(leadModal));

  // Form Submission (Mock Lead Capture)
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(subscribeForm);
      const payload = Object.fromEntries(formData.entries());
      console.log("TrustScan waitlist payload:", payload);
      alert("Success! You are on the TrustScan waitlist.");
      subscribeForm.reset();
      closeEl(leadModal);
    });
  }

  // Mock Navigation Routing (Using relative paths for static hosting)
  if (mockGoogleLogin) {
    mockGoogleLogin.addEventListener("click", () => {
      closeEl(loginModal);
      window.location.href = "./dashboard.html";
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      window.location.href = "./contact.html";
    });
  }

  // Smart Lead Modal Auto-Trigger (Only shows once per session)
  if (leadModal && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const hasSeenModal = sessionStorage.getItem("trustscan_lead_modal_shown");
    
    if (!hasSeenModal) {
      setTimeout(() => {
        if (document.visibilityState === "visible") {
          openEl(leadModal);
          sessionStorage.setItem("trustscan_lead_modal_shown", "true");
        }
      }, 8000);
    }
  }

  // Global UI Escapes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeEl(leadModal);
      closeEl(loginModal);
      if (mobileMenu) mobileMenu.classList.remove("open");
    }
  });

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) mobileMenu.classList.remove("open");
    });
  });
});