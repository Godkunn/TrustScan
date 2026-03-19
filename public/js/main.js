document.addEventListener("DOMContentLoaded", () => {
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

  const openEl = (el) => {
    if (!el) return;
    el.classList.remove("hidden");
    el.setAttribute("aria-hidden", "false");
  };

  const closeEl = (el) => {
    if (!el) return;
    el.classList.add("hidden");
    el.setAttribute("aria-hidden", "true");
  };

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  if (navSignin) navSignin.addEventListener("click", () => openEl(loginModal));
  if (mobileSignin) mobileSignin.addEventListener("click", () => openEl(loginModal));
  if (closeLead) closeLead.addEventListener("click", () => closeEl(leadModal));
  if (closeLogin) closeLogin.addEventListener("click", () => closeEl(loginModal));
  if (openLeadCta) openLeadCta.addEventListener("click", () => openEl(leadModal));

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(subscribeForm);
      const payload = Object.fromEntries(formData.entries());
      console.log("TrustScan waitlist:", payload);
      alert("Thanks — you are on the TrustScan waitlist.");
      subscribeForm.reset();
      closeEl(leadModal);
    });
  }

  if (mockGoogleLogin) {
    mockGoogleLogin.addEventListener("click", () => {
      closeEl(loginModal);
      window.location.href = "/dashboard.html";
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  }

  if (leadModal && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        openEl(leadModal);
      }
    }, 8000);
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeEl(leadModal);
      closeEl(loginModal);
      closeEl(mobileMenu);
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) mobileMenu.classList.remove("open");
    });
  });
});