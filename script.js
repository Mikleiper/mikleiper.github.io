// === DATOS: tus proyectos ===
// Añadir un proyecto nuevo = añadir un objeto a este array
const proyectos = [
  {
    titulo: "CardResto",
    descripcion:
      "App Android que digitaliza tarjetas de restaurante con OCR y las ubica en un mapa.",
    tecnologias: ["Kotlin", "Spring Boot", "ML Kit", "PostgreSQL"],
    repo: "https://github.com/tuusuario/cardresto",
    demo: "",
  },
  {
    titulo: "Gestor Finanzas",
    descripcion: "Herramienta de gestión de finanzas personales para el hogar.",
    tecnologias: ["Spring Boot", "React", "PostgreSQL"],
    repo: "https://github.com/tuusuario/gestor-finanzas",
    demo: "",
  },
  {
    titulo: "Sistema de Gestión de Flota",
    descripcion:
      "Sistema web + Android para gestión de flota y servicios de chófer. Proyecto de prácticas en el Parc Mòbil (Diputació de Barcelona).",
    tecnologias: ["React", "Node.js", "MySQL", "Kotlin"],
    repo: "",
    demo: "",
  },
];

// === RENDERIZADO: convertir datos en HTML ===
const contenedor = document.getElementById("lista-proyectos");

function mostrarProyectos(lista) {
  contenedor.innerHTML = ""; // limpia antes de pintar

  lista.forEach(function (proyecto) {
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

    // Construimos la tarjeta completa
    const tarjeta = `
      <article class="tarjeta">
        <h3>${proyecto.titulo}</h3>
        <p>${proyecto.descripcion}</p>
        <div class="tags">${tags}</div>
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
