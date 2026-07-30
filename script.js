/* Heliox Intelligence — interacciones, analítica y test A/B del hero */

(function () {
  "use strict";

  /* ═══════════ Configuración ═══════════
     Rellena UNO de los dos para activar la analítica:
     - GA4_ID:            p. ej. "G-XXXXXXXXXX" (Google Analytics 4)
     - PLAUSIBLE_DOMAIN:  p. ej. "helioxintelligence.com" (Plausible)
     Sin rellenar, los eventos se acumulan igualmente en window.dataLayer. */
  var GA4_ID = "";
  var PLAUSIBLE_DOMAIN = "";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ═══════════ Analítica ═══════════ */
  window.dataLayer = window.dataLayer || [];

  if (GA4_ID) {
    var ga = document.createElement("script");
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
    document.head.appendChild(ga);
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID);
  }
  if (PLAUSIBLE_DOMAIN) {
    var pl = document.createElement("script");
    pl.defer = true;
    pl.setAttribute("data-domain", PLAUSIBLE_DOMAIN);
    pl.src = "https://plausible.io/js/script.js";
    document.head.appendChild(pl);
  }

  function track(event, props) {
    props = props || {};
    props.hero_variant = variant;
    window.dataLayer.push({ event: event, props: props });
    if (typeof window.gtag === "function" && GA4_ID) window.gtag("event", event, props);
    if (typeof window.plausible === "function") window.plausible(event, { props: props });
  }

  /* ═══════════ Test A/B/C del hero ═══════════
     Asignación aleatoria persistente por visitante (localStorage).
     Forzable para revisión con ?v=A | ?v=B | ?v=C */
  var VARIANTS = {
    A: null, // la del HTML: «Las guardias, resueltas.»
    B: {
      title: "Imagina no volver<br>a <span class=\"accent\">cuadrar una guardia.</span>",
      lede: "Heliox aprende cómo funciona tu servicio y genera cada mes un calendario justo, completo y con los descansos garantizados. Tú solo lo revisas."
    },
    C: {
      title: "Haz que el próximo calendario<br>sea <span class=\"accent\">el último a mano.</span>",
      lede: "Creado por médicos, Heliox convierte las reglas de tu servicio en una planificación automática, equilibrada y sin conflictos."
    }
  };

  var variant;
  try {
    var forced = new URLSearchParams(location.search).get("v");
    if (forced && VARIANTS.hasOwnProperty(forced.toUpperCase())) {
      variant = forced.toUpperCase();
    } else {
      variant = localStorage.getItem("heliox_variant");
      if (!variant || !VARIANTS.hasOwnProperty(variant)) {
        variant = ["A", "B", "C"][Math.floor(Math.random() * 3)];
        localStorage.setItem("heliox_variant", variant);
      }
    }
  } catch (e) {
    variant = "A"; // localStorage bloqueado (modo privado estricto)
  }

  if (VARIANTS[variant]) {
    var title = document.getElementById("heroTitle");
    var lede = document.getElementById("heroLede");
    if (title) title.innerHTML = VARIANTS[variant].title;
    if (lede) lede.textContent = VARIANTS[variant].lede;
  }
  var variantField = document.getElementById("variantField");
  if (variantField) variantField.value = variant;

  track("page_view", { path: location.pathname });

  /* ═══════════ Nav: hairline al hacer scroll ═══════════ */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ═══════════ Clics en CTA (por ubicación) ═══════════ */
  var ctaTargets = [
    [document.querySelector(".btn-nav"), "nav"],
    [document.querySelector(".hero .btn-primary"), "hero"],
    [document.querySelector(".hero .btn-ghost"), "hero_secundario"]
  ];
  ctaTargets.forEach(function (pair) {
    if (pair[0]) {
      pair[0].addEventListener("click", function () {
        track("cta_click", { location: pair[1] });
      });
    }
  });

  /* ═══════════ Profundidad de scroll ═══════════ */
  var depths = [25, 50, 75, 100];
  var seen = {};
  window.addEventListener("scroll", function () {
    var h = document.documentElement;
    var pct = Math.round(((h.scrollTop + h.clientHeight) / h.scrollHeight) * 100);
    depths.forEach(function (d) {
      if (pct >= d && !seen[d]) {
        seen[d] = true;
        track("scroll_depth", { depth: d });
      }
    });
  }, { passive: true });

  /* ═══════════ Reveals al entrar en viewport ═══════════ */
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

  /* ═══════════ Calendario del hero: del caos al orden ═══════════ */
  var grid = document.getElementById("calGrid");
  var badge = document.getElementById("calBadge");
  if (grid) {
    var DAYS = 35; // 5 semanas
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

  /* ═══════════ FAQ: acordeón + tracking ═══════════ */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item, idx) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
        var q = item.querySelector("summary");
        track("faq_open", { question: q ? q.textContent.trim().slice(0, 60) : String(idx) });
      }
    });
  });

  /* ═══════════ Formulario: envío AJAX a FormSubmit ═══════════ */
  var form = document.getElementById("demoForm");
  var successBox = document.getElementById("formSuccess");
  var errorBox = document.getElementById("formError");
  if (form) {
    var endpoint = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (errorBox) errorBox.hidden = true;
      var btn = form.querySelector("button[type=submit]");
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Enviando…";

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function () {
          track("demo_request", { conversion: true });
          form.hidden = true;
          if (successBox) {
            successBox.hidden = false;
            successBox.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
          }
        })
        .catch(function () {
          track("demo_request_error", {});
          if (errorBox) errorBox.hidden = false;
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }
})();
