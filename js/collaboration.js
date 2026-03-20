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
