(() => {
  const techBadges = document.querySelectorAll(".tech-cloud__badge");
  if (!techBadges.length) return;

  const heroSection = document.querySelector(".hero");
  const keyHighlightsSection = document.querySelector(".experience-intro");

  const clamp01 = (value) => Math.min(1, Math.max(0, value));

  const updateTechBadges = () => {
    const scrollY = window.scrollY || window.pageYOffset || 0;

    let heroFadeIn = 0;
    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect();
      const heroHeight = heroRect.height;

      if (heroHeight > 0) {
        const progressIn = (heroHeight - heroRect.bottom) / heroHeight;
        heroFadeIn = clamp01(progressIn);
      }
    }

    let keyFadeOut = 1;
    if (keyHighlightsSection) {
      const keyRect = keyHighlightsSection.getBoundingClientRect();
      const keyHeight = keyRect.height;

      if (keyHeight > 0) {
        const passed = clamp01(-keyRect.top / keyHeight);
        keyFadeOut = 1 - passed;
      }
    }

    const fadeFactor = clamp01(heroFadeIn * keyFadeOut);

    techBadges.forEach((badge, index) => {
      const direction = index % 2 === 0 ? -1 : 1;
      const drift = scrollY * 0.03 * direction;

      badge.style.transform = `translate3d(${drift}px, ${
        -scrollY * 0.02
      }px, 0)`;
      badge.style.opacity = String(fadeFactor);
    });
  };

  updateTechBadges();
  window.addEventListener("scroll", updateTechBadges, { passive: true });
})();

(() => {
  const MODAL_HASHES = new Set([
    "#modal-work",
    "#modal-skills",
    "#modal-education",
  ]);

  const syncScrollLock = () => {
    const isModalOpen = MODAL_HASHES.has(window.location.hash);
    document.documentElement.classList.toggle("no-scroll", isModalOpen);
    document.body.classList.toggle("no-scroll", isModalOpen);
  };

  window.addEventListener("hashchange", syncScrollLock);
  document.addEventListener("DOMContentLoaded", syncScrollLock);
  syncScrollLock();
})();

(function () {
  var words = document.querySelectorAll(".progress-banner__word[data-hint]");
  if (!words.length) return;

  var tooltipId = "progress-hint-tooltip";
  var tooltip = document.createElement("span");
  tooltip.id = tooltipId;
  tooltip.className = "progress-banner__hint";
  tooltip.setAttribute("role", "tooltip");
  document.body.appendChild(tooltip);

  function showHint(word) {
    tooltip.textContent = word.getAttribute("data-hint");
    tooltip.classList.add("progress-banner__hint--visible");
    word.setAttribute("aria-describedby", tooltipId);
  }

  function hideHint(word) {
    tooltip.classList.remove("progress-banner__hint--visible");
    word.removeAttribute("aria-describedby");
  }

  words.forEach(function (word) {
    word.setAttribute("tabindex", "0");
    word.addEventListener("mouseenter", function () { showHint(word); });
    word.addEventListener("mouseleave", function () { hideHint(word); });
    word.addEventListener("focus", function () { showHint(word); });
    word.addEventListener("blur", function () { hideHint(word); });
  });
})();
