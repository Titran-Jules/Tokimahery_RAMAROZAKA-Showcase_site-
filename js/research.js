import { initCart } from "./panier.js";
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    menuOverlay.classList.remove('hidden');
    setTimeout(() => menuOverlay.classList.add('opacity-100'), 10);
}

function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    menuOverlay.classList.remove('opacity-100');
    setTimeout(() => menuOverlay.classList.add('hidden'), 300);
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
const papers = [
  {
    id: 1,
    title: "Automatic Generation of Thematic Maps Using Multi-Agent Systems",
    abstract:
      "This paper presents an approach to automating the generation of thematic maps through multi-agent systems. Agents collaborate to process, interpret, and spatially organize geographic data, reducing the manual effort typically required in cartographic workflows. The system is demonstrated and evaluated within the GAMA simulation platform.",
    publishedDate: new Date("2024-11-01"),
    journal: "GAMA Days 2024",
    authors: [
      "I. H. Maminiaina",
      "H. Rakotonirainy",
      "J. Dinaharison",
      "T. Ramarozaka",
      "A. Razafinimaro",
    ],
    tags: ["multi-agent systems", "cartography", "GAMA"],
    url: "https://hal.science/hal-04890215v1/file/Gama_days_2024_Maminiaina.pdf",
    pdfUrl:
      "https://hal.science/hal-04890215v1/file/Gama_days_2024_Maminiaina.pdf",
  },
  {
    id: 2,
    title: "Prise en compte des normes dans les comportements des agents",
    abstract:
      "Cette thèse de doctorat explore comment les normes sociales et organisationnelles peuvent être intégrées dans les comportements des agents autonomes. Elle propose un cadre formel permettant aux agents de percevoir, interpréter et respecter des normes dans des environnements multi-agents complexes, avec des applications en simulation sociale et en systèmes distribués.",
    publishedDate: new Date("2024-01-01"),
    journal: "Université de Fianarantsoa — Thèse de doctorat en Informatique",
    authors: ["T. Ramarozaka"],
    tags: ["multi-agent systems", "norms", "PhD thesis"],
    url: "https://agritrop.cirad.fr/610658/1/THESE%20Tokimahery%20FINALE.pdf",
    pdfUrl:
      "https://agritrop.cirad.fr/610658/1/THESE%20Tokimahery%20FINALE.pdf",
  },
  {
    id: 3,
    title:
      "Extending Partial-Order Planning to Account for Norms in Agent Behavior",
    abstract:
      "This paper proposes an extension of partial-order planning to integrate normative constraints into agent behavior. By incorporating norms directly into the planning process, agents can reason about socially acceptable action sequences while still achieving their goals. The approach is evaluated in the context of multi-agent simulations and discussed within the European Social Simulation community.",
    publishedDate: new Date("2022-09-01"),
    journal:
      "Conference of the European Social Simulation Association, Springer Nature Switzerland",
    authors: ["T. Ramarozaka", "J. P. Müller", "H. L. Rakotonirainy"],
    tags: ["multi-agent systems", "norms", "planning"],
    url: "https://edepot.wur.nl/641647#page=144",
    pdfUrl: "https://edepot.wur.nl/641647#page=144",
  },
];

const container = document.getElementById("papers-container");
container.className = "max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-1 gap-8 py-16";

papers.forEach((paper) => {
  const card = document.createElement("div");

  card.className =
    "group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col justify-between";

  const date = paper.publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const tagsHTML = paper.tags
    .map(
      (tag) =>
        `<span class="text-xs bg-[#F6F4F4] px-3 py-1 rounded-full uppercase tracking-wide text-text-muted">${tag}</span>`,
    )
    .join("");

  card.innerHTML = `
    <div class="flex justify-between items-start mb-4">
      <div class="flex gap-2 flex-wrap">
        ${tagsHTML}
      </div>
      <span class="text-sm text-gray-400">${date}</span>
    </div>

    <h3 class="text-[1.5rem] font-Playfair font-semibold mb-2 leading-snug">
      ${paper.title}
    </h3>

    <p class="text-sm text-gray-500 italic mb-3">
      ${paper.authors.join(", ")} — ${paper.journal}
    </p>

    <p class="text-gray-600 text-sm mb-6 mt-6 leading-relaxed">
      ${paper.abstract}
    </p>

    <a href="${paper.pdfUrl}" target="_blank"
    class="inline-flex items-center gap-2 text-red text-xs font-medium hover:opacity-70 transform:transition-all">
    <i class="fa-solid fa-file-pdf"></i>READ PDF
    </a>
    <hr class="w-15 border-t-2 border-red items-center">
  `;

  container.appendChild(card);
});

initCart();