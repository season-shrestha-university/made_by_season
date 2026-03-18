(function () {
  var techBadges = document.querySelectorAll(".tech-cloud__badge");
  if (!techBadges.length) return;

  window.addEventListener("scroll", function () {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var fadeFactor = Math.min(1, scrollY / 400);

    techBadges.forEach(function (badge, index) {
      var direction = index % 2 === 0 ? -1 : 1;
      var drift = scrollY * 0.03 * direction;

      badge.style.transform =
        "translate3d(" + drift + "px," + -scrollY * 0.02 + "px,0)";
      badge.style.opacity = String(fadeFactor);
    });
  });
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
