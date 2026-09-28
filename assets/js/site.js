document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.getAttribute("data-page") || "";

  var links = [
    ["index.html", "Welcome!"],
    ["research.html", "Research"],
    ["people.html", "People"],
    ["publications.html", "Publications"],
    ["teaching.html", "Teaching"],
    ["manual.html", "Manning Research Manual"]
  ];

  var navHtml = links
    .map(function (l) {
      var active = l[0] === page ? " active" : "";
      return '<a href="' + l[0] + '" class="' + active.trim() + '">' + l[1] + "</a>";
    })
    .join("");

  var headerHtml =
    '<div class="header-inner">' +
    '<a class="brand" href="index.html">' +
    '<img src="assets/img/logo.svg" alt="ManningGroup logo">' +
    "<span>ManningGroup</span>" +
    "</a>" +
    '<button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>' +
    '<nav class="primary-nav">' +
    navHtml +
    "</nav>" +
    "</div>";

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = headerHtml;
  document.body.insertBefore(header, document.body.firstChild);

  var toggle = header.querySelector(".nav-toggle");
  var nav = header.querySelector(".primary-nav");
  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    "<p>Department of Physics, Syracuse University &middot; " +
    '<a href="mailto:mmanning@syr.edu">mmanning@syr.edu</a></p>';
  document.body.appendChild(footer);
});
