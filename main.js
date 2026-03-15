(function () {
  var techBadges = document.querySelectorAll(".tech-cloud__badge");
  if (!techBadges.length) return;

  window.addEventListener("scroll", function () {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var fadeFactor = 1 - Math.min(1, scrollY / 1200);

    techBadges.forEach(function (badge, index) {
      var direction = index % 2 === 0 ? -1 : 1;
      var drift = scrollY * 0.03 * direction;

      badge.style.transform =
        "translate3d(" + drift + "px," + -scrollY * 0.02 + "px,0)";
      badge.style.opacity = String(fadeFactor);
    });
  });
})();
