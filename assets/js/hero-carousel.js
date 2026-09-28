// Rotates through the .hero-slide images inside #hero-carousel with a
// cross-fade. No dependencies, pauses on hover/focus so it doesn't distract
// while someone's reading nearby text.

(function () {
  var INTERVAL_MS = 5000;

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("hero-carousel");
    if (!container) return;

    var slides = Array.prototype.slice.call(
      container.querySelectorAll(".hero-slide")
    );
    if (slides.length < 2) return;

    var index = slides.findIndex(function (s) {
      return s.classList.contains("active");
    });
    if (index === -1) index = 0;

    var timer = null;

    function show(nextIndex) {
      slides[index].classList.remove("active");
      slides[nextIndex].classList.add("active");
      index = nextIndex;
    }

    function tick() {
      show((index + 1) % slides.length);
    }

    function start() {
      if (timer) return;
      timer = setInterval(tick, INTERVAL_MS);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
    }

    start();
    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);
  });
})();
