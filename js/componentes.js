// ===== Componentes extra (se carga después de main.js) =====

// ---------- CUENTA REGRESIVA DEL BANNER ----------
(function () {
  const el = document.getElementById("cuentaRegresiva");
  if (!el) return;
  const hoy = new Date();
  let objetivo = new Date(hoy.getFullYear(), 10, 1); // 1 de noviembre
  const dias = Math.ceil((objetivo - hoy) / 86400000);
  if (dias > 1) el.textContent = "Faltan " + dias + " días";
  else if (dias === 1) el.textContent = "¡Es mañana!";
  else if (hoy.getMonth() === 10 && hoy.getDate() <= 2) el.textContent = "¡Hoy se celebra!";
  else el.textContent = "Hasta el próximo año";
})();

// ---------- SLIDER ----------
(function () {
  const contenedor = document.querySelector(".slides");
  if (!contenedor) return;
  const slides = document.querySelectorAll(".slide");
  const puntosBox = document.getElementById("puntos");
  let actual = 0;
  let timer;

  slides.forEach((_, i) => {
    const p = document.createElement("button");
    p.className = "punto" + (i === 0 ? " activo" : "");
    p.setAttribute("aria-label", "Ir a la imagen " + (i + 1));
    p.addEventListener("click", () => { ir(i); reiniciar(); });
    puntosBox.appendChild(p);
  });

  function ir(n) {
    actual = (n + slides.length) % slides.length;
    contenedor.style.transform = "translateX(-" + actual * 100 + "%)";
    puntosBox.querySelectorAll(".punto").forEach((p, i) => p.classList.toggle("activo", i === actual));
  }
  function reiniciar() { clearInterval(timer); timer = setInterval(() => ir(actual + 1), 5000); }

  document.querySelector(".flecha.prev").addEventListener("click", () => { ir(actual - 1); reiniciar(); });
  document.querySelector(".flecha.next").addEventListener("click", () => { ir(actual + 1); reiniciar(); });
  document.querySelector(".slider").addEventListener("mouseenter", () => clearInterval(timer));
  document.querySelector(".slider").addEventListener("mouseleave", reiniciar);
  reiniciar();
})();

// ---------- MODAL (una sola ventana reutilizable) ----------
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");

function abrirModal(titulo, texto, imagen) {
  modalTitulo.textContent = titulo;
  modalTexto.textContent = texto || "";
  if (imagen) { modalImg.src = imagen; modalImg.alt = titulo; modalImg.style.display = "block"; }
  else { modalImg.style.display = "none"; }
  modal.classList.add("abierto");
  document.body.style.overflow = "hidden";
}
function cerrarModal() {
  modal.classList.remove("abierto");
  document.body.style.overflow = "";
}
document.getElementById("modalCerrar").addEventListener("click", cerrarModal);
modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarModal(); });

// Botones/cards con data-modal
document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    abrirModal(btn.dataset.titulo, btn.dataset.texto, btn.dataset.img);
  });
});

// ---------- NOTICIAS ----------
// IMPORTANTE: son noticias de EJEMPLO. Cámbialas por las reales de tu municipio.
const noticias = [
  { dia: "28", mes: "OCT", cat: "Cultura", titulo: "Inician los preparativos de las ofrendas en la ciudad",
    resumen: "Escuelas, plazas y familias comienzan a montar sus altares.",
    texto: "Escuelas, plazas y familias de la localidad comienzan a montar sus altares con cempasúchil, papel picado y fotografías para recordar a sus seres queridos." },
  { dia: "29", mes: "OCT", cat: "Gastronomía", titulo: "Panaderías aumentan la producción de pan de muerto",
    resumen: "El pan de muerto y el pan de pulque son de los más pedidos.",
    texto: "Las panaderías de la región aumentan su producción en estas fechas. El pan de muerto es el más buscado para llevar a la ofrenda y compartir en familia." },
  { dia: "30", mes: "OCT", cat: "Eventos", titulo: "Concurso de ofrendas en escuelas del municipio",
    resumen: "Los alumnos presentan altares con elementos tradicionales.",
    texto: "Alumnos de distintas escuelas presentan sus ofrendas y explican el significado de cada elemento: velas, agua, sal, flores, comida y fotografías." },
  { dia: "31", mes: "OCT", cat: "Tradiciones", titulo: "Panteones se preparan para recibir visitantes",
    resumen: "Las familias limpian y adornan las tumbas de sus difuntos.",
    texto: "Desde estos días, las familias acuden a limpiar, pintar y adornar las tumbas de sus seres queridos para recibirlos el 1 y 2 de noviembre." },
  { dia: "01", mes: "NOV", cat: "Tradiciones", titulo: "Día de los niños y los 'angelitos'",
    resumen: "Se ofrecen dulces, atole y pan en los altares infantiles.",
    texto: "El 1 de noviembre se recuerda a los niños fallecidos con juguetes, dulces, atole y pan en los altares." }
];

const listaNoticias = document.getElementById("listaNoticias");
const filtrosNoticias = document.getElementById("filtrosNoticias");

function pintarNoticias(cat) {
  listaNoticias.innerHTML = "";
  noticias.filter((n) => cat === "Todas" || n.cat === cat).forEach((n) => {
    const art = document.createElement("article");
    art.className = "noticia";
    art.innerHTML =
      '<div class="fecha-noticia"><strong>' + n.dia + "</strong>" + n.mes + "</div>" +
      '<div><span class="etiqueta">' + n.cat + "</span><h3>" + n.titulo + "</h3><p>" + n.resumen + "</p></div>" +
      '<button class="btn-chico">Leer más</button>';
    art.querySelector("button").addEventListener("click", () => abrirModal(n.titulo, n.texto));
    listaNoticias.appendChild(art);
  });
}
if (listaNoticias) {
  const cats = ["Todas", ...new Set(noticias.map((n) => n.cat))];
  cats.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "filtro" + (i === 0 ? " activo" : "");
    b.textContent = c;
    b.addEventListener("click", () => {
      filtrosNoticias.querySelectorAll(".filtro").forEach((x) => x.classList.remove("activo"));
      b.classList.add("activo");
      pintarNoticias(c);
    });
    filtrosNoticias.appendChild(b);
  });
  pintarNoticias("Todas");
}

// ---------- TABS ----------
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("activo"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("activo"));
    btn.classList.add("activo");
    document.getElementById(btn.dataset.tab).classList.add("activo");
  });
});

// ---------- GALERÍA CON FILTROS ----------
const botonesGaleria = document.querySelectorAll("#filtrosGaleria .filtro");
const figuras = document.querySelectorAll("#galeria figure");

botonesGaleria.forEach((btn) => {
  btn.addEventListener("click", () => {
    botonesGaleria.forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    const filtro = btn.dataset.filtro;
    figuras.forEach((f) => {
      f.classList.toggle("oculta", filtro !== "todas" && f.dataset.cat !== filtro);
    });
  });
});

// Clic en una foto de la galería abre el modal (lightbox)
figuras.forEach((f) => {
  f.addEventListener("click", () => {
    const img = f.querySelector("img");
    abrirModal(f.querySelector("figcaption").textContent, f.dataset.desc || "", img.getAttribute("src"));
  });
});
