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
