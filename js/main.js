// Menú para celular
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("abierto");
});

menu.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", () => menu.classList.remove("abierto"));
});

// Tarjetas: al tocar una se muestra su significado
document.querySelectorAll(".tarjeta").forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    tarjeta.classList.toggle("activa");
  });
});

// Animación de aparición al hacer scroll
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observador.observe(el));

// Año en el pie de página
document.getElementById("anio").textContent = new Date().getFullYear();
