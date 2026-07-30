/* Heliox Intelligence — interacciones */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Nav: hairline al hacer scroll ── */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Reveals al entrar en viewport ── */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 4) * 60 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ── Calendario del hero: del caos al orden ── */
  var grid = document.getElementById("calGrid");
  var badge = document.getElementById("calBadge");
  if (grid) {
    var DAYS = 35; // 5 semanas
    // Asignación estable: 4 personas rotando con descansos plausibles
    var assignment = [
      1, 0, 2, 0, 3, 4, 0,
      0, 1, 0, 2, 0, 0, 3,
      4, 0, 1, 0, 2, 3, 0,
      0, 4, 0, 1, 0, 0, 2,
      3, 0, 4, 0, 1, 2, 0
    ];
    var initials = ["", "AG", "MR", "LP", "JC"];
    var cells = [];

    for (var d = 0; d < DAYS; d++) {
      var cell = document.createElement("span");
      cell.className = "cal-cell" + (assignment[d] ? " p" + assignment[d] : "");
      cell.textContent = initials[assignment[d]];
      grid.appendChild(cell);
      cells.push(cell);
    }

    var checks = document.querySelectorAll(".cal-check");

    var finish = function () {
      if (badge) {
        badge.textContent = "Calendario listo";
        badge.classList.add("done");
      }
      checks.forEach(function (c, i) {
        setTimeout(function () { c.classList.add("on"); }, reducedMotion ? 0 : 150 * i);
      });
    };

    if (reducedMotion) {
      cells.forEach(function (c) { c.classList.add("on", "assigned"); });
      finish();
    } else {
      // 1) aparecen las celdas vacías, 2) se asignan las guardias, 3) checks
      cells.forEach(function (c, i) {
        setTimeout(function () { c.classList.add("on"); }, 200 + i * 14);
      });
      var assignedIdx = [];
      assignment.forEach(function (p, i) { if (p) assignedIdx.push(i); });
      assignedIdx.forEach(function (idx, i) {
        setTimeout(function () {
          cells[idx].classList.add("assigned");
        }, 1100 + i * 90);
      });
      setTimeout(finish, 1100 + assignedIdx.length * 90 + 300);
    }
  }

  /* ── FAQ: cerrar los demás al abrir uno ── */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ── Formulario: feedback al enviar ── */
  var form = document.getElementById("demoForm");
  if (form) {
    form.addEventListener("submit", function () {
      var btn = form.querySelector("button[type=submit]");
      if (btn) {
        btn.textContent = "Abriendo tu correo…";
        setTimeout(function () {
          btn.textContent = "Solicitar una demostración";
        }, 4000);
      }
    });
  }
})();
