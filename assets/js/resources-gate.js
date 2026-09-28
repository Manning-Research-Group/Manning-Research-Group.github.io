// Simple client-side gate. NOTE: this is NOT real security — the protected
// content is still delivered to the browser and visible via page source or
// dev tools to anyone who looks. It only keeps out casual visitors and search
// engines. Don't put anything here you wouldn't want a determined person to see.

(function () {
  var PASSWORD = "orangesoft";
  var SESSION_KEY = "resources-unlocked";

  document.addEventListener("DOMContentLoaded", function () {
    var gate = document.getElementById("password-gate");
    var content = document.getElementById("protected-content");
    if (!gate || !content) return;

    function unlock() {
      gate.style.display = "none";
      content.style.display = "block";
    }

    if (sessionStorage.getItem(SESSION_KEY) === "yes") {
      unlock();
      return;
    }

    var form = document.getElementById("password-form");
    var input = document.getElementById("password-input");
    var error = document.getElementById("password-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value === PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "yes");
        unlock();
      } else {
        error.style.display = "block";
        input.value = "";
        input.focus();
      }
    });
  });
})();
