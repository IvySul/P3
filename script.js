const models = [
  { name: "Atlas", type: "Fashion", rating: 4.8 },
  { name: "Nova", type: "Editorial", rating: 4.6 },
  { name: "Jade", type: "Commercial", rating: 4.9 },
  { name: "Orion", type: "Runway", rating: 4.7 },
  { name: "Luna", type: "Lifestyle", rating: 4.5 },
  { name: "Kai", type: "Digital", rating: 4.6 },
];

const grid = document.getElementById("model-grid");
const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const searchInput = document.getElementById("search-input");
const profileCount = document.getElementById("profiles-count");
const avgRating = document.getElementById("avg-rating");
const topCategory = document.getElementById("top-category");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function renderModels(filteredModels) {
  if (!grid) return;
  grid.innerHTML = "";

  filteredModels.forEach((model) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${model.name}</h3>
      <p class="model-category">${model.type}</p>
      <p>Portfolio-ready profile for ${model.type.toLowerCase()} work.</p>
      <p class="model-rating">Rating: ${model.rating}</p>
    `;
    grid.appendChild(card);
  });

  if (filteredModels.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No matching models found.";
    grid.appendChild(empty);
  }
}

function updateStats(modelList) {
  if (!profileCount || !avgRating || !topCategory) return;
  profileCount.textContent = String(modelList.length);

  const rating =
    modelList.reduce((sum, model) => sum + model.rating, 0) / modelList.length;
  avgRating.textContent = rating.toFixed(1);

  const counts = modelList.reduce((acc, model) => {
    acc[model.type] = (acc[model.type] || 0) + 1;
    return acc;
  }, {});

  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  topCategory.textContent = top ? top[0] : "-";
}

if (grid) {
  renderModels(models);
  updateStats(models);
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = models.filter(
      (model) =>
        model.name.toLowerCase().includes(query) ||
        model.type.toLowerCase().includes(query),
    );
    renderModels(filtered);
    updateStats(filtered.length ? filtered : models);
  });
}

if (contactForm && statusEl) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    statusEl.textContent =
      "Thanks! Your message was captured locally for this demo.";
    contactForm.reset();
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("open");
  });
}
