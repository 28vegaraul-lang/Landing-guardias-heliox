/* Heliox Intelligence — interacciones, selector de servicios, formulario y analítica */

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
    window.dataLayer.push({ event: event, props: props });
    if (typeof window.gtag === "function" && GA4_ID) window.gtag("event", event, props);
    if (typeof window.plausible === "function") window.plausible(event, { props: props });
  }

  track("page_view", { path: location.pathname });

  /* ═══════════ Clics en CTA ═══════════ */
  document.querySelectorAll("[data-cta]").forEach(function (el) {
    el.addEventListener("click", function () {
      track("cta_click", { location: el.getAttribute("data-cta") });
    });
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

  /* ═══════════ Animaciones al entrar en viewport ═══════════ */
  var groups = document.querySelectorAll("[data-anim]");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("play");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    groups.forEach(function (g) { io.observe(g); });
  } else {
    groups.forEach(function (g) { g.classList.add("play"); });
  }

  /* ═══════════ 04 · Selector de servicios ═══════════ */
  var DEPTS = [
    { id: "urg", name: "Urgencias", rules: ["Turnos de 12 y 24 horas encadenados", "Mínimo dos adjuntos por turno de noche", "Descanso obligatorio tras guardia de 24 h", "Máximo cinco guardias por persona y mes"],
      blocks: [[0, 0, 60, "solid"], [60, 1, 40, "accent"], [20, 2, 20, "soft"], [40, 3, 60, "solid"], [0, 4, 20, "accent"], [20, 5, 40, "softAccent"], [60, 6, 40, "solid"]] },
    { id: "uci", name: "Medicina Intensiva", rules: ["Cobertura continua 24/7 sin huecos", "Relevo presencial en cada cambio de turno", "Un residente siempre acompañado de adjunto", "Máximo dos noches consecutivas"],
      blocks: [[0, 0, 40, "solid"], [40, 0, 60, "accent"], [0, 1, 100, "soft"], [0, 2, 50, "solid"], [50, 3, 50, "accent"], [0, 4, 100, "softAccent"], [20, 5, 60, "solid"], [0, 6, 100, "soft"]] },
    { id: "anest", name: "Anestesiología", rules: ["Quirófano programado y localizada separados", "Reparto por áreas quirúrgicas", "Sin guardia el día previo a programado largo", "Localizada compensada al mes siguiente"],
      blocks: [[0, 0, 20, "solid"], [40, 0, 20, "accent"], [80, 0, 20, "solid"], [20, 2, 20, "soft"], [60, 2, 20, "accent"], [0, 3, 20, "solid"], [40, 4, 20, "softAccent"], [80, 4, 20, "solid"], [20, 6, 20, "accent"]] },
    { id: "radio", name: "Radiodiagnóstico", rules: ["Guardias por modalidad: TC, RM, intervencionista", "Cobertura de informe urgente toda la noche", "Rotación equitativa de fines de semana", "Teleguardia contabilizada como presencial"],
      blocks: [[0, 0, 100, "soft"], [0, 1, 40, "solid"], [60, 1, 40, "accent"], [0, 3, 60, "solid"], [60, 4, 40, "softAccent"], [0, 5, 40, "accent"], [40, 6, 60, "solid"]] },
    { id: "ped", name: "Pediatría", rules: ["Neonatal y urgencias pediátricas diferenciadas", "Adjunto de guardia con experiencia neonatal", "Compensación de festivos por bloques", "Sin guardia en semana de consulta doble"],
      blocks: [[0, 0, 50, "accent"], [50, 1, 50, "solid"], [0, 2, 50, "softAccent"], [50, 3, 50, "accent"], [0, 4, 50, "solid"], [50, 5, 50, "soft"], [0, 6, 50, "accent"]] },
    { id: "cir", name: "Cirugía General", rules: ["Equipo de guardia: adjunto, residente mayor y menor", "Sin quirófano programado tras guardia", "Reparto de festivos por antigüedad y turno", "Máximo cuatro guardias por persona y mes"],
      blocks: [[0, 0, 60, "solid"], [0, 1, 60, "accent"], [0, 2, 60, "softAccent"], [40, 3, 60, "solid"], [40, 4, 60, "accent"], [40, 5, 60, "soft"], [0, 6, 100, "solid"]] }
  ];
  var TONES = { solid: "#eef2f6", accent: "#94bce3", soft: "rgba(238,242,246,.3)", softAccent: "rgba(148,188,227,.3)" };
  var ROWS = 7;

  var deptList = document.getElementById("deptList");
  var deptRules = document.getElementById("deptRules");
  var deptQuad = document.getElementById("deptQuadrant");
  var deptName = document.getElementById("deptName");
  var currentDept = 0;

  function renderDept() {
    var d = DEPTS[currentDept];
    deptList.querySelectorAll(".dept-btn").forEach(function (b, i) {
      b.setAttribute("aria-selected", i === currentDept ? "true" : "false");
    });
    deptName.textContent = d.name;

    deptRules.innerHTML = "";
    d.rules.forEach(function (r, i) {
      var row = document.createElement("div");
      row.className = "dept-rule";
      row.style.animationDelay = reducedMotion ? "0s" : (i * 0.05) + "s";
      var tick = document.createElement("span");
      tick.className = "tick";
      row.appendChild(tick);
      row.appendChild(document.createTextNode(r));
      deptRules.appendChild(row);
    });

    deptQuad.innerHTML = "";
    var q = document.createElement("div");
    q.className = "quadrant";
    q.style.backgroundSize = "calc(100%/5) calc(100%/" + ROWS + ")";
    d.blocks.forEach(function (b, i) {
      var block = document.createElement("div");
      block.style.left = b[0] + "%";
      block.style.top = (b[1] * (100 / ROWS)) + "%";
      block.style.width = b[2] + "%";
      block.style.height = (100 / ROWS) + "%";
      block.style.background = TONES[b[3]];
      block.style.setProperty("--dx", (i % 2 ? -22 : 24) + "px");
      block.style.setProperty("--dy", (i % 3 ? 24 : -20) + "px");
      block.style.animationDelay = reducedMotion ? "0s" : (0.05 + i * 0.06) + "s";
      q.appendChild(block);
    });
    deptQuad.appendChild(q);
  }

  if (deptList) {
    DEPTS.forEach(function (d, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dept-btn";
      btn.setAttribute("role", "tab");
      var num = document.createElement("span");
      num.className = "dept-num";
      num.textContent = String(i + 1).padStart(2, "0");
      btn.appendChild(num);
      btn.appendChild(document.createTextNode(d.name));
      btn.addEventListener("click", function () {
        if (currentDept === i) return;
        currentDept = i;
        renderDept();
        track("dept_select", { dept: d.name });
      });
      deptList.appendChild(btn);
    });
    renderDept();
  }

  /* ═══════════ Contacto: chips de servicio ═══════════ */
  var chipsBox = document.getElementById("chips");
  var servicioField = document.getElementById("servicioField");
  if (chipsBox) {
    DEPTS.map(function (d) { return d.name; }).concat(["Otro"]).forEach(function (name) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = name;
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", function () {
        var wasSelected = chip.getAttribute("aria-pressed") === "true";
        chipsBox.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        if (!wasSelected) {
          chip.setAttribute("aria-pressed", "true");
          servicioField.value = name;
        } else {
          servicioField.value = "";
        }
      });
      chipsBox.appendChild(chip);
    });
  }

  /* ═══════════ Contacto: validación + envío AJAX a FormSubmit ═══════════ */
  var form = document.getElementById("demoForm");
  var successBox = document.getElementById("formSuccess");
  var successTitle = document.getElementById("successTitle");
  var successText = document.getElementById("successText");
  var hint = document.getElementById("formHint");
  var submitBtn = document.getElementById("submitBtn");
  var resetBtn = document.getElementById("resetBtn");
  var HINT_DEFAULT = "No compartimos tus datos con terceros.";

  function fieldWrap(input) { return input.closest(".field"); }

  function validate() {
    var bad = [];
    var nombre = form.elements.nombre;
    var email = form.elements.email;
    var hospital = form.elements.hospital;
    if (!nombre.value.trim()) bad.push(nombre);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.value.trim())) bad.push(email);
    if (!hospital.value.trim()) bad.push(hospital);
    [nombre, email, hospital].forEach(function (input) {
      fieldWrap(input).classList.toggle("invalid", bad.indexOf(input) !== -1);
    });
    return bad;
  }

  if (form) {
    var endpoint = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");

    ["nombre", "email", "hospital"].forEach(function (name) {
      form.elements[name].addEventListener("input", function () {
        fieldWrap(form.elements[name]).classList.remove("invalid");
        hint.textContent = HINT_DEFAULT;
        hint.classList.remove("error");
      });
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var bad = validate();
      if (bad.length) {
        hint.textContent = "Revisa nombre, correo y hospital.";
        hint.classList.add("error");
        bad[0].focus();
        return;
      }

      var firstName = form.elements.nombre.value.trim().split(" ")[0];
      var email = form.elements.email.value.trim();
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";

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
          track("demo_request", { conversion: true, servicio: servicioField.value || "sin indicar" });
          successTitle.textContent = "Gracias, " + firstName + ".";
          successText.textContent = "Te escribimos a " + email + " con los siguientes pasos.";
          form.hidden = true;
          successBox.hidden = false;
          successBox.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
        })
        .catch(function () {
          track("demo_request_error", {});
          hint.textContent = "No se ha podido enviar. Inténtalo de nuevo en un momento.";
          hint.classList.add("error");
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar";
        });
    });

    resetBtn.addEventListener("click", function () {
      form.reset();
      servicioField.value = "";
      chipsBox.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      hint.textContent = HINT_DEFAULT;
      hint.classList.remove("error");
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar";
      successBox.hidden = true;
      form.hidden = false;
      form.elements.nombre.focus();
    });
  }
})();
