import { initCart } from "./panier.js";
import { initAnimations } from "./animation/animation.js";

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
document.addEventListener("DOMContentLoaded", () => {
  const modeLabels = document.querySelectorAll(".mode-label");
  const modeCheckboxes = document.querySelectorAll('input[name="mode"]');

  modeLabels.forEach((label, index) => {
    label.addEventListener("click", (e) => {
      modeCheckboxes.forEach((checkbox) => (checkbox.checked = false));
      modeCheckboxes[index].checked = true;
      modeLabels.forEach((lbl) => {
        lbl.classList.remove(
          "border-red-600",
          "bg-red-50",
          "text-red-700",
          "border-2"
        );
        lbl.classList.add(
          "border-gray-300",
          "bg-white",
          "text-gray-700",
          "hover:bg-gray-50"
        );
      });

      label.classList.remove(
        "border-gray-300",
        "bg-white",
        "text-gray-700",
        "hover:bg-gray-50"
      );
      label.classList.add(
        "border-red-600",
        "bg-red-50",
        "text-red-700",
        "border-2"
      );
    });
  });

  const budgetSlider = document.querySelector('input[type="range"]');

  if (budgetSlider) {
    budgetSlider.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      const formattedValue = value.toLocaleString('en-US');

      const budgetDisplay = document.querySelector(".budget-display");
      if (budgetDisplay) {
        budgetDisplay.textContent = `${formattedValue} Ar`;
      }
    });
  }
});

const type_project = document.querySelector("#type-project");
const other_container = document.querySelector("#other-container");

type_project.addEventListener("change", (e) => {
  if (e.target.value == "other") {
    let other_items = `
      <input class="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition placeholder-gray-400"
        type="text" placeholder="Tell us more..."/>
    `;

    other_container.innerHTML = other_items;
  } else {
    other_container.innerHTML = "";
  }
});


const collaborationForm = document.querySelector('form');

collaborationForm.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const firstName = collaborationForm.querySelector('input[placeholder="John"]').value.trim();
  const lastName = collaborationForm.querySelector('input[placeholder="Doe"]').value.trim();
  const email = collaborationForm.querySelector('input[type="email"]').value.trim();
  const description = collaborationForm.querySelector('textarea').value.trim();
  const projectType = document.querySelector("#type-project").value;

  if (!firstName || !lastName || !email || !description || projectType === "Select a type...") {
    showNotification("Veuillez remplir tous les champs obligatoires (*)", "bg-red-600");
    return;
  }

  const submitBtn = collaborationForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> ENVOI EN COURS...';

  setTimeout(() => {
    showNotification("Message envoyé avec succès ! Tokimahery vous répondra sous 48h.", "bg-green-600");
    collaborationForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> SEND MY REQUEST';
  }, 1500);
});

function showNotification(message, bgColor) {
  const existingNote = document.getElementById('form-notification');
  if (existingNote) existingNote.remove();

  const notification = document.createElement('div');
  notification.id = 'form-notification';
  notification.className = `fixed bottom-5 right-5 ${bgColor} text-white px-6 py-3 rounded-lg shadow-2xl transition-all duration-500 transform translate-y-20 z-[100] flex items-center gap-3`;
  notification.innerHTML = `
    <i class="fa-solid ${bgColor === 'bg-green-600' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span class="text-sm font-medium">${message}</span>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove('translate-y-20');
    notification.classList.add('translate-y-0');
  }, 10);

  setTimeout(() => {
    notification.classList.add('opacity-0', 'translate-y-10');
    setTimeout(() => notification.remove(), 500);
  }, 4000);
}

initCart();
initAnimations();