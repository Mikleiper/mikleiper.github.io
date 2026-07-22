// === DATOS: tus proyectos ===
// Añadir un proyecto nuevo = añadir un objeto a este array
const proyectos = [
  {
    titulo: "CardResto",
    descripcion:
      "App Android que digitaliza tarjetas de restaurante con OCR y las ubica en un mapa.",
    tecnologias: ["Kotlin", "Spring Boot", "ML Kit", "PostgreSQL"],
    repo: "",
    demo: "",
    nota: "En desarrollo",
  },
  {
    titulo: "Gestor Finanzas",
    descripcion: "Herramienta de gestión de finanzas personales para el hogar.",
    tecnologias: ["Spring Boot", "React", "PostgreSQL"],
    repo: "",
    demo: "",
    nota: "En desarrollo",
  },
  {
    titulo: "Sistema de Gestión de Flota",
    descripcion:
      "Sistema web + Android para gestión de flota y servicios de chófer. Proyecto de prácticas en el Parc Mòbil (Diputació de Barcelona).",
    tecnologias: ["React", "Node.js", "MySQL", "Kotlin"],
    repo: "",
    nota: "Código privado (proyecto de prácticas en Diputació de Barcelona)",
    imagenes: [
      "img/flota/flota-1.jpeg",
      "img/flota/flota-2.jpeg",
      "img/flota/flota-3.jpeg",
      "img/flota/flota-4.jpeg",
    ],
  },
];

// === RENDERIZADO: convertir datos en HTML ===
const contenedor = document.getElementById("lista-proyectos");

function mostrarProyectos(lista) {
  contenedor.innerHTML = ""; // limpia antes de pintar

  lista.forEach(function (proyecto, indice) {
    // Construimos las etiquetas de tecnología
    const tags = proyecto.tecnologias
      .map(function (tec) {
        return `<span class="tag">${tec}</span>`;
      })
      .join("");

    // Construimos los enlaces (solo si existen)
    let enlaces = "";
    if (proyecto.repo) {
      enlaces += `<a href="${proyecto.repo}" target="_blank">Código</a>`;
    }
    if (proyecto.demo) {
      enlaces += `<a href="${proyecto.demo}" target="_blank">Demo</a>`;
    }
    const galeria = proyecto.imagenes
      ? `<div class="galeria" data-proyecto-indice="${indice}">${proyecto.imagenes
          .map(
            (img, i) =>
              `<img src="${img}" alt="Captura de ${proyecto.titulo}" data-imagen-indice="${i}">`,
          )
          .join("")}</div>`
      : "";

    const badge = proyecto.nota
      ? `<span class="tag tag-nota">${proyecto.nota}</span>`
      : "";
    // Construimos la tarjeta completa
    const tarjeta = `
      <article class="tarjeta">
    <h3>${proyecto.titulo} ${badge}</h3>
    <p>${proyecto.descripcion}</p>
    <div class="tags">${tags}</div>
    ${galeria}
    <div class="enlaces">${enlaces}</div>
  </article>
    `;

    contenedor.innerHTML += tarjeta;
  });
}

// Pintamos todos los proyectos al cargar la página
mostrarProyectos(proyectos);

// === NAV: resaltar la sección activa según el scroll ===
const enlacesNav = document.querySelectorAll("nav a");
const secciones = document.querySelectorAll("main section");

const observador = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        const idActivo = entrada.target.id;

        enlacesNav.forEach(function (enlace) {
          // Compara el href="#algo" del enlace con el id de la sección visible
          const coincide = enlace.getAttribute("href") === "#" + idActivo;
          enlace.classList.toggle("activo", coincide);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -40% 0px" },
);

secciones.forEach(function (seccion) {
  observador.observe(seccion);
});

// === LIGHTBOX: ver fotos de proyecto en grande ===
const lightbox = document.getElementById("lightbox");
const lightboxImagen = document.querySelector(".lightbox-imagen");
const btnCerrar = document.querySelector(".lightbox-cerrar");
const btnAnterior = document.querySelector(".lightbox-anterior");
const btnSiguiente = document.querySelector(".lightbox-siguiente");

let imagenesActuales = [];
let indiceActual = 0;

function abrirLightbox(imagenes, indice) {
  imagenesActuales = imagenes;
  indiceActual = indice;
  lightboxImagen.src = imagenesActuales[indiceActual];
  lightbox.classList.remove("oculto");
}

function cerrarLightbox() {
  lightbox.classList.add("oculto");
}

function mostrarSiguiente() {
  indiceActual = (indiceActual + 1) % imagenesActuales.length;
  lightboxImagen.src = imagenesActuales[indiceActual];
}

function mostrarAnterior() {
  indiceActual =
    (indiceActual - 1 + imagenesActuales.length) % imagenesActuales.length;
  lightboxImagen.src = imagenesActuales[indiceActual];
}

// Delegación de eventos: un solo listener en el contenedor,
// en vez de uno por cada imagen (las imágenes se crean dinámicamente
// con innerHTML, no existen todavía al cargar la página)
contenedor.addEventListener("click", function (evento) {
  const galeriaClicada = evento.target.closest(".galeria");
  if (evento.target.tagName === "IMG" && galeriaClicada) {
    const indiceProyecto = galeriaClicada.dataset.proyectoIndice;
    const indiceImagen = evento.target.dataset.imagenIndice;
    abrirLightbox(proyectos[indiceProyecto].imagenes, Number(indiceImagen));
  }
});

btnCerrar.addEventListener("click", cerrarLightbox);
btnSiguiente.addEventListener("click", mostrarSiguiente);
btnAnterior.addEventListener("click", mostrarAnterior);

// Cerrar al hacer clic en el fondo oscuro (fuera de la imagen)
lightbox.addEventListener("click", function (evento) {
  if (evento.target === lightbox) cerrarLightbox();
});

// Navegar con teclado: flechas y Escape
document.addEventListener("keydown", function (evento) {
  if (lightbox.classList.contains("oculto")) return;
  if (evento.key === "Escape") cerrarLightbox();
  if (evento.key === "ArrowRight") mostrarSiguiente();
  if (evento.key === "ArrowLeft") mostrarAnterior();
});
