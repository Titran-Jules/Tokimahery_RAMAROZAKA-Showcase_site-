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

initCart();
initAnimations();