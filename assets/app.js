/* Steward — replica estatica. Todo el JavaScript del sitio: carrusel del hero,
   galeria de producto y los controles que en esta copia no tienen backend detras.
   Sin dependencias. */
(function () {
  "use strict";

  /* ---------------------------------------------------------- carrusel del hero */
  var hero = document.querySelector(".hero");
  if (hero) {
    var slides = [].slice.call(hero.querySelectorAll(".slide"));
    var puntos = [].slice.call(hero.querySelectorAll(".hero__pts button"));
    var actual = 0, timer = null, pausadoPorUsuario = false;
    var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function mostrar(i) {
      actual = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        var on = n === actual;
        s.classList.toggle("es-act", on);
        if (on) { s.removeAttribute("aria-hidden"); } else { s.setAttribute("aria-hidden", "true"); }
      });
      puntos.forEach(function (b, n) {
        if (n === actual) { b.setAttribute("aria-current", "true"); }
        else { b.removeAttribute("aria-current"); }
      });
    }

    var pausa = hero.querySelector("[data-pausa]");

    // el avance se suspende por hover o foco, pero eso es distinto de que el visitante
    // haya pulsado pausa: si se mezclan, el boton acaba haciendo lo contrario
    function correr() {
      if (quieto || timer || pausadoPorUsuario) return;
      timer = setInterval(function () { mostrar(actual + 1); }, 6000);
    }
    function suspender() { clearInterval(timer); timer = null; }
    function pintarPausa() {
      if (!pausa) return;
      pausa.setAttribute("aria-pressed", pausadoPorUsuario ? "true" : "false");
      pausa.setAttribute("aria-label",
        pausadoPorUsuario ? "Reanudar el carrusel" : "Pausar el carrusel");
      pausa.textContent = pausadoPorUsuario ? "▶" : "❚❚";
    }

    hero.querySelectorAll("[data-mover]").forEach(function (b) {
      b.addEventListener("click", function () {
        mostrar(actual + parseInt(b.dataset.mover, 10));
      });
    });
    puntos.forEach(function (b) {
      b.addEventListener("click", function () { mostrar(parseInt(b.dataset.ir, 10)); });
    });
    if (pausa) {
      pausa.addEventListener("click", function () {
        pausadoPorUsuario = !pausadoPorUsuario;
        if (pausadoPorUsuario) { suspender(); } else { correr(); }
        pintarPausa();
      });
    }
    hero.addEventListener("mouseenter", suspender);
    hero.addEventListener("mouseleave", correr);
    hero.addEventListener("focusin", suspender);
    hero.addEventListener("focusout", correr);
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") mostrar(actual - 1);
      if (e.key === "ArrowRight") mostrar(actual + 1);
    });
    pintarPausa();
    correr();
  }

  /* -------------------------------------------------------- galeria de producto */
  var foto = document.getElementById("foto");
  var thumbs = document.querySelectorAll(".galeria__thumbs button");
  if (foto && thumbs.length) {
    thumbs.forEach(function (b) {
      b.addEventListener("click", function () {
        thumbs.forEach(function (o) { o.setAttribute("aria-selected", "false"); });
        b.setAttribute("aria-selected", "true");
        foto.src = b.dataset.img;
      });
    });
  }

  /* --------------------------- controles sin backend en esta copia estatica */
  document.querySelectorAll("[data-demo]").forEach(function (b) {
    b.addEventListener("click", function () {
      var p = b.parentNode.querySelector(".nota-js");
      if (p) { p.remove(); return; }
      var s = document.createElement("span");
      s.className = "nota-js";
      s.setAttribute("role", "status");
      s.style.cssText = "display:block;width:100%;margin-top:.5rem;font-size:.8rem;color:#6b7280";
      s.textContent = "Esta copia no tiene carro conectado.";
      b.parentNode.appendChild(s);
    });
  });

  document.querySelectorAll(".busca, .news__f").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); });
  });
})();
