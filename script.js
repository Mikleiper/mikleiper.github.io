// === DATOS: tus proyectos ===
// Los textos que cambian de idioma (descripcion, nota) son objetos {es, en}.
// Los demas campos (titulo, tecnologias, enlaces) son iguales en ambos idiomas.
const proyectos = [
  {
    titulo: "CardResto",
    descripcion: {
      es: "App Android que digitaliza tarjetas de restaurante con OCR y las ubica en un mapa.",
      en: "Android app that digitizes restaurant cards with OCR and places them on a map.",
    },
    tecnologias: ["Kotlin", "Spring Boot", "ML Kit", "PostgreSQL"],
    repo: "",
    demo: "",
    nota: { es: "En desarrollo", en: "In progress" },
  },
  {
    titulo: "Gestor Finanzas",
    descripcion: {
      es: "Herramienta de gestión de finanzas personales para el hogar.",
      en: "Personal household finance management tool.",
    },
    tecnologias: ["Java", "Spring Boot", "PostgreSQL"],
    repo: "https://github.com/Mikleiper/gestor-finanzas",
    demo: "",
    nota: { es: "En desarrollo", en: "In progress" },
  },
  {
    titulo: "Sistema de Gestión de Flota",
    descripcion: {
      es: "Sistema web + Android para gestión de flota y servicios de chófer. Proyecto de prácticas en el Parc Mòbil (Diputació de Barcelona).",
      en: "Web + Android system for fleet management and chauffeur services. Internship project at Parc Mòbil (Diputació de Barcelona).",
    },
    tecnologias: ["React", "Node.js", "MySQL", "Kotlin"],
    repo: "",
    nota: {
      es: "Código privado (proyecto de prácticas en Diputació de Barcelona)",
      en: "Private code (internship project at Diputació de Barcelona)",
    },
    imagenes: [
      "img/flota/flota-1.jpeg",
      "img/flota/flota-2.jpeg",
      "img/flota/flota-3.jpeg",
      "img/flota/flota-4.jpeg",
    ],
  },
];

// === TRADUCCIONES: diccionario de textos estaticos ===
// Cada clave coincide con un atributo data-i18n del HTML.
// Ademas incluye las etiquetas que genera el JS (proj_codigo, proj_demo...).
const textos = {
  es: {
    skip: "Saltar al contenido",
    nav_inicio: "Inicio",
    nav_proyectos: "Proyectos",
    nav_skills: "Skills",
    nav_certificaciones: "Certificaciones",
    hero_subtitulo:
      "Desarrollador Backend (Java/Spring Boot) & Android (Kotlin) · Barcelona",
    hero_bio:
      "Desarrollador de aplicaciones multiplataforma (Java, Spring Boot, Kotlin, JavaScript, Express.js). Tras 13 años de carrera en psicología, aporto al sector tecnológico una profunda comprensión de las necesidades del usuario, trabajo con equipo y madurez profesional. Traduzco requerimientos complejos en soluciones de software lógicas y estructuradas.",
    sec_proyectos: "Proyectos",
    sec_skills: "Skills",
    skills_backend: "Backend",
    skills_frontend: "Frontend",
    skills_mobile: "Mobile",
    skills_datos: "Datos & ML",
    skills_bd: "Bases de datos",
    skills_herramientas: "Herramientas",
    skill_aprendizaje: "Aprendizaje supervisado",
    sec_certificaciones: "Certificaciones",
    cert1_meta: "Oracle · Junio 2025",
    cert1_desc:
      "Modelado e implementación de bases de datos relacionales con SQL: creación de tablas, consultas y generación de informes.",
    cert2_meta: "DataCamp · Marzo 2026",
    cert2_desc:
      "Entrenamiento de modelos de aprendizaje supervisado con scikit-learn: clasificación, regresión y ajuste de modelos sobre datos reales.",
    cv_descargar: "Descargar CV",
    proj_codigo: "Código",
    proj_demo: "Demo",
    proj_captura: "Captura de",
    aria_cerrar: "Cerrar",
    aria_anterior: "Foto anterior",
    aria_siguiente: "Foto siguiente",
  },
  en: {
    skip: "Skip to content",
    nav_inicio: "Home",
    nav_proyectos: "Projects",
    nav_skills: "Skills",
    nav_certificaciones: "Certifications",
    hero_subtitulo:
      "Backend (Java/Spring Boot) & Android (Kotlin) Developer · Barcelona",
    hero_bio:
      "Cross-platform application developer (Java, Spring Boot, Kotlin, JavaScript, Express.js). After a 13-year career in psychology, I bring to the tech sector a deep understanding of user needs, teamwork and professional maturity. I translate complex requirements into logical, well-structured software solutions.",
    sec_proyectos: "Projects",
    sec_skills: "Skills",
    skills_backend: "Backend",
    skills_frontend: "Frontend",
    skills_mobile: "Mobile",
    skills_datos: "Data & ML",
    skills_bd: "Databases",
    skills_herramientas: "Tools",
    skill_aprendizaje: "Supervised learning",
    sec_certificaciones: "Certifications",
    cert1_meta: "Oracle · June 2025",
    cert1_desc:
      "Relational database modeling and implementation with SQL: table creation, queries and report generation.",
    cert2_meta: "DataCamp · March 2026",
    cert2_desc:
      "Training supervised learning models with scikit-learn: classification, regression and model tuning on real datasets.",
    cv_descargar: "Download CV",
    proj_codigo: "Code",
    proj_demo: "Demo",
    proj_captura: "Screenshot of",
    aria_cerrar: "Close",
    aria_anterior: "Previous photo",
    aria_siguiente: "Next photo",
  },
};

// Idioma activo. Se lee de localStorage (si el usuario ya eligio antes)
// y si no, arranca en espanol. Es 'let' porque cambia al pulsar el boton.
let idiomaActual = localStorage.getItem("idioma") || "es";

// === RENDERIZADO: convertir datos en HTML ===
const contenedor = document.getElementById("lista-proyectos");

function mostrarProyectos(lista) {
  // Convertimos cada proyecto en su string HTML con map, y al final los
  // unimos y asignamos a innerHTML UNA sola vez (ver nota al pie de la función).
  const tarjetas = lista.map(function (proyecto, indice) {
    // Construimos las etiquetas de tecnología
    const tags = proyecto.tecnologias
      .map(function (tec) {
        return `<span class="tag">${tec}</span>`;
      })
      .join("");

    // Construimos los enlaces (solo si existen). El texto del enlace
    // sale del diccionario segun el idioma activo.
    let enlaces = "";
    if (proyecto.repo) {
      enlaces += `<a href="${proyecto.repo}" target="_blank">${textos[idiomaActual].proj_codigo}</a>`;
    }
    if (proyecto.demo) {
      enlaces += `<a href="${proyecto.demo}" target="_blank">${textos[idiomaActual].proj_demo}</a>`;
    }
    const galeria = proyecto.imagenes
      ? `<div class="galeria" data-proyecto-indice="${indice}">${proyecto.imagenes
          .map(
            (img, i) =>
              `<img src="${img}" alt="${textos[idiomaActual].proj_captura} ${proyecto.titulo}" data-imagen-indice="${i}">`,
          )
          .join("")}</div>`
      : "";

    // descripcion y nota son objetos {es, en}: elegimos la del idioma activo
    const badge = proyecto.nota
      ? `<span class="tag tag-nota">${proyecto.nota[idiomaActual]}</span>`
      : "";
    const descripcion = proyecto.descripcion[idiomaActual];
    // Construimos la tarjeta completa
    const tarjeta = `
      <article class="tarjeta">
    <h3>${proyecto.titulo} ${badge}</h3>
    <p>${descripcion}</p>
    <div class="tags">${tags}</div>
    ${galeria}
    <div class="enlaces">${enlaces}</div>
  </article>
    `;

    return tarjeta;
  });

  // Una sola escritura en el DOM. Con innerHTML += dentro del bucle,
  // el navegador re-parsea TODO el HTML del contenedor en cada vuelta
  // (y recrea los nodos ya pintados); así solo lo parsea una vez.
  contenedor.innerHTML = tarjetas.join("");
}

// === IDIOMA: aplicar traducciones y recordar la eleccion ===
const botonesIdioma = document.querySelectorAll(".lang-toggle button");

// El boton de CV descarga el PDF del idioma activo
const enlaceCV = document.getElementById("cv-link");
const archivosCV = {
  es: "cv/CV-Miguel-Munoz-ES.pdf",
  en: "cv/CV-Miguel-Munoz-EN.pdf",
};

function cambiarIdioma(idioma) {
  idiomaActual = idioma;

  // 1. Traducir el texto visible de todo elemento marcado con data-i18n
  document.querySelectorAll("[data-i18n]").forEach(function (elemento) {
    const clave = elemento.dataset.i18n;
    const traduccion = textos[idioma][clave];
    if (traduccion !== undefined) {
      elemento.textContent = traduccion;
    }
  });

  // 1b. Traducir el atributo aria-label de los elementos con data-i18n-aria
  // (los aria-label no son texto visible, los lee el lector de pantalla)
  document.querySelectorAll("[data-i18n-aria]").forEach(function (elemento) {
    const clave = elemento.dataset.i18nAria;
    const traduccion = textos[idioma][clave];
    if (traduccion !== undefined) {
      elemento.setAttribute("aria-label", traduccion);
    }
  });

  // 1c. Apuntar el boton de CV al PDF del idioma activo
  if (enlaceCV) {
    enlaceCV.setAttribute("href", archivosCV[idioma]);
  }

  // 2. Re-pintar los proyectos (se generan con JS, no llevan data-i18n)
  mostrarProyectos(proyectos);

  // 3. Resaltar el boton del idioma activo (ES o EN)
  botonesIdioma.forEach(function (boton) {
    boton.classList.toggle("lang-activo", boton.dataset.lang === idioma);
  });

  // 4. Actualizar el atributo lang del <html> (accesibilidad y SEO)
  document.documentElement.lang = idioma;

  // 5. Recordar la eleccion para la proxima visita
  localStorage.setItem("idioma", idioma);
}

// Cada boton cambia al idioma que indica su atributo data-lang
botonesIdioma.forEach(function (boton) {
  boton.addEventListener("click", function () {
    cambiarIdioma(boton.dataset.lang);
  });
});

// Aplicar el idioma inicial al cargar (esto tambien pinta los proyectos)
cambiarIdioma(idiomaActual);

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
