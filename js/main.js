/* ============================================================
   Caric'Art — script principal
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initStatusBanner();
  initMobileNav();
  initActiveNavLink();
  initYear();
  initHeroBackdrop();
  initHeroArt();

  // Galerie complète (page galerie + boutique)
  const gallery = document.querySelector("[data-gallery]");
  if (gallery) initGallery(gallery);

  // Sélection d'œuvres sur la page d'accueil
  const featured = document.querySelector("[data-featured]");
  if (featured) renderWorks(featured, WORKS.slice(0, 4), true);
});

/* ---------- Bandeau statut des commandes ---------- */
function initStatusBanner() {
  const el = document.getElementById("status-banner");
  if (!el) return;
  const open = SITE_CONFIG.commandesOuvertes;
  el.className = "status-banner " + (open ? "open" : "closed");
  el.innerHTML = open
    ? `${SITE_CONFIG.texteOuvert} <a href="commandes.html">Commander une caricature →</a>`
    : `${SITE_CONFIG.texteFerme} <a href="contact.html">Présenter un projet →</a>`;
}

/* ---------- Menu mobile ---------- */
function initMobileNav() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".main-nav");
  if (!burger || !nav) return;
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(nav.classList.contains("open")));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Lien de nav actif ---------- */
function initActiveNavLink() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });
}

/* ---------- Année du footer ---------- */
function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Hero : fond & bande défilante ---------- */
function initHeroBackdrop() {
  const bg = document.querySelector(".hero-bg");
  if (bg) {
    bg.innerHTML = WORKS.slice(0, 12)
      .map((w) => `<img src="${w.file}" alt="" loading="lazy">`)
      .join("");
  }
  const track = document.querySelector("[data-marquee]");
  if (track) {
    const imgs = WORKS.slice(0, 24)
      .map((w, i) => `<img src="${w.file}" alt="${w.title}" data-index="${i}" loading="lazy">`)
      .join("");
    track.innerHTML = imgs + imgs; // duplication pour une boucle infinie
    track.querySelectorAll("img").forEach((img) =>
      img.addEventListener("click", () => openLightbox(parseInt(img.dataset.index, 10)))
    );
  }
}

/* ---------- Hero : cadres cliquables ---------- */
function initHeroArt() {
  document.querySelectorAll(".hero-art img[data-work-index]").forEach((img) =>
    img.addEventListener("click", () =>
      openLightbox(parseInt(img.dataset.workIndex, 10))
    )
  );
}

/* ---------- Galerie ---------- */
function initGallery(container) {
  const mode = container.dataset.gallery || "all";
  let items = WORKS;
  if (mode === "forsale") {
    items = items.filter((w) => w.forSale);
  } else if (mode !== "all") {
    items = items.filter((w) => w.category === mode);
  }

  // Les pages thématiques présentent déjà une œuvre dans leur introduction.
  // Ne pas la répéter immédiatement dans leur sélection.
  const heroImage = document.querySelector(".theme-page .theme-hero-art img")?.getAttribute("src");
  if (heroImage && items.some((work) => work.file === heroImage)) {
    items = items.filter((work) => work.file !== heroImage);
    if (!items.length) {
      container.innerHTML = '<p class="note">Découvrez d’autres œuvres dans <a href="galerie.html">la galerie complète</a>.</p>';
      return;
    }
  }

  const filterBar = document.querySelector("[data-filters]");
  if (filterBar && mode === "all") {
    const cats = [...new Set(items.map((w) => w.category))];
    filterBar.innerHTML =
      `<button class="filter-btn active" data-cat="all">Tout voir</button>` +
      cats
        .map(
          (c) =>
            `<button class="filter-btn" data-cat="${c}">${CATEGORIES[c] || c}</button>`
        )
        .join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      const shown = cat === "all" ? items : items.filter((w) => w.category === cat);
      renderWorks(container, shown, true);
    });
  }

  if (!items.length) {
    container.innerHTML =
      '<p class="note text-center" style="grid-column:1/-1">Les œuvres de cette section seront dévoilées prochainement.</p>';
    return;
  }
  renderWorks(container, items, true);
}

/* ---------- Rendu des cartes œuvres ---------- */
function renderWorks(container, items, withLightbox) {
  container.innerHTML = items
    .map(
      (w, i) => `
      <article class="work-card" data-index="${WORKS.indexOf(w)}" tabindex="0"
               role="button" aria-label="Voir ${w.title} en grand">
        <img src="${w.file}" alt="${w.title} — caricature ${CATEGORIES[w.category] || ""}" loading="lazy">
        <div class="work-meta">
          <div class="work-cat">${CATEGORIES[w.category] || w.category}${w.year ? " · " + w.year : ""}</div>
          <div class="work-title">${w.title}</div>
          ${w.medium ? `<div class="note">${w.medium}</div>` : ""}
          ${w.forSale ? `<span class="work-badge">À vendre${w.price ? " · " + w.price : ""}</span>`
                      : `<span class="work-badge sold">Non disponible</span>`}
        </div>
      </article>`
    )
    .join("");

  if (withLightbox) {
    container.querySelectorAll(".work-card").forEach((card) => {
      card.addEventListener("click", () =>
        openLightbox(parseInt(card.dataset.index, 10))
      );
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
          openLightbox(parseInt(card.dataset.index, 10));
      });
    });
  }
}

/* ---------- Lightbox ---------- */
let lbIndex = 0;

function openLightbox(index) {
  lbIndex = index;
  let lb = document.querySelector(".lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="Fermer">×</button>
        <button class="lightbox-nav prev" aria-label="Précédent">‹</button>
        <button class="lightbox-nav next" aria-label="Suivant">›</button>
        <img src="" alt="">
        <div class="lb-meta">
          <div class="lb-title"></div>
          <div class="lb-desc"></div>
        </div>
      </div>`;
    document.body.appendChild(lb);

    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.closest(".lightbox-close")) closeLightbox();
      if (e.target.closest(".prev")) stepLightbox(-1);
      if (e.target.closest(".next")) stepLightbox(1);
    });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("show")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });
  }
  updateLightbox(lb);
  lb.classList.add("show");
  document.body.style.overflow = "hidden";
}

function updateLightbox(lb) {
  const w = WORKS[lbIndex];
  lb.querySelector("img").src = w.file;
  lb.querySelector("img").alt = w.title;
  lb.querySelector(".lb-title").textContent =
    `${w.title} — ${CATEGORIES[w.category] || w.category}${w.year ? ` (${w.year})` : ""}`;
  lb.querySelector(".lb-desc").textContent =
    w.desc +
    (w.medium ? ` Technique : ${w.medium}.` : "") +
    (w.forSale ? ` Disponible${w.price ? " — " + w.price : ""}.` : "");
}

function stepLightbox(dir) {
  lbIndex = (lbIndex + dir + WORKS.length) % WORKS.length;
  updateLightbox(document.querySelector(".lightbox"));
}

function closeLightbox() {
  document.querySelector(".lightbox").classList.remove("show");
  document.body.style.overflow = "";
}
