// ---- Your Afghanistan image data ----
// Files must exist inside the /images folder with the EXACT names below.
const images = [
  // Provinces
  { src: "images/band-e-amir.jpg",      title: "Band-e-Amir — Bamiyan",     category: "provinces" },
  { src: "images/wakhan-corridor.jpg",  title: "Wakhan Corridor — Badakhshan", category: "provinces" },
  { src: "images/panjshir-valley.jpg",  title: "Panjshir Valley",           category: "provinces" },

  // Culture
  { src: "images/attan-dance.jpg",      title: "Attan — National Dance",    category: "culture" },
  { src: "images/traditional-dress.jpg",title: "Traditional Dress",         category: "culture" },

  // People
  { src: "images/afghan-portrait.jpg",  title: "Afghan Portrait",           category: "people" },
  { src: "images/afghan-child.jpg",     title: "Children of Kabul",         category: "people" },

  // Food
  { src: "images/kabuli-pulao.jpg",     title: "Kabuli Pulao",              category: "food" },
  { src: "images/mantu.jpg",            title: "Mantu",                     category: "food" },
  { src: "images/bolani.jpg",           title: "Bolani",                    category: "food" },

  // History
  { src: "images/bamiyan-buddha.jpg",   title: "Bamiyan — Buddha Cliffs",   category: "history" },
  { src: "images/herat-citadel.jpg",    title: "Herat Citadel",             category: "history" },
];

const gallery    = document.getElementById("gallery");
const lightbox   = document.getElementById("lightbox");
const lbImg      = document.getElementById("lbImg");
const lbCaption  = document.getElementById("lbCaption");
const lbClose    = document.getElementById("lbClose");
const lbPrev     = document.getElementById("lbPrev");
const lbNext     = document.getElementById("lbNext");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentIndex  = 0;
let visibleImages = [...images];

// Render gallery
function renderGallery(items) {
  gallery.innerHTML = "";
  items.forEach((img, i) => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.dataset.title = img.title;
    div.style.animationDelay = `${i * 60}ms`;
    div.innerHTML = `<img src="${img.src}" alt="${img.title}" loading="lazy" />`;
    div.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(div);
  });
}

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    visibleImages = filter === "all"
      ? [...images]
      : images.filter(img => img.category === filter);

    renderGallery(visibleImages);
  });
});

// Lightbox
function openLightbox(index) {
  currentIndex = index;
  lbImg.src = visibleImages[currentIndex].src;
  lbCaption.textContent = visibleImages[currentIndex].title;
  lightbox.classList.add("open");
}
function closeLightbox() {
  lightbox.classList.remove("open");
}
function showNext() {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  lbImg.src = visibleImages[currentIndex].src;
  lbCaption.textContent = visibleImages[currentIndex].title;
}
function showPrev() {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  lbImg.src = visibleImages[currentIndex].src;
  lbCaption.textContent = visibleImages[currentIndex].title;
}

lbClose.addEventListener("click", closeLightbox);
lbNext.addEventListener("click", showNext);
lbPrev.addEventListener("click", showPrev);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape")     closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft")  showPrev();
});

// Init
renderGallery(visibleImages);