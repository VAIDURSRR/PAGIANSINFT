// ===== Agenda de eventos 2026: filtros y estado (En curso / Próximo / Terminado) =====
// Se carga después de componentes.js (usa su función abrirModal).
(function () {
  const eventos = document.querySelectorAll("#agenda .evento");
  if (!eventos.length) return;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  eventos.forEach((ev) => {
    const ini = new Date(ev.dataset.ini + "T00:00:00");
    const fin = new Date(ev.dataset.fin + "T23:59:59");
    const estado = ev.querySelector(".estado");
    if (hoy > fin) { estado.textContent = "Terminado"; estado.style.background = "#7a6a8a"; }
    else if (hoy >= ini) { estado.textContent = "En curso"; estado.style.background = "#2e8b57"; }
    else { estado.textContent = "Próximamente"; estado.style.background = "#f28c1b"; }

    ev.querySelector("button").addEventListener("click", () => {
      abrirModal(ev.dataset.titulo, ev.dataset.texto, ev.dataset.img);
    });
  });

  const botones = document.querySelectorAll("#filtrosAgenda .filtro");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      botones.forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
      const f = btn.dataset.filtro;
      eventos.forEach((ev) => {
        ev.style.display = f === "todos" || ev.dataset.zona === f ? "" : "none";
      });
    });
  });
})();
