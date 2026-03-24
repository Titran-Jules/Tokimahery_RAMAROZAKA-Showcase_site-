export const cartState = JSON.parse(localStorage.getItem("cart_data")) || {
  items: {},
  totalItems: 0,
  totalAmount: 0,
};

let stockData = {};

function saveCart() {
  localStorage.setItem("cart_data", JSON.stringify(cartState));
}

function injectCartSection() {
  if (document.querySelector("#cart-popup")) return;

  const popup = document.createElement("div");
  popup.id = "cart-popup";

  popup.className =
    "hidden fixed top-20 right-10 bg-white shadow-2xl rounded-2xl w-85 z-50 max-h-[360px] overflow-y-auto flex flex-col border border-gray-100";

  popup.innerHTML = `
      <div class="flex justify-between items-center p-4">
        <h2 id="cart-title" class="font-semibold text-lg text-gray-800">Your cart</h2>
        <button id="close-cart" class="text-gray-400 hover:text-gray-600 text-xl">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div id="cart-items"></div>
      <div id="card-footer" class="border-t-2 border-gray-100 p-4 rounded-b-2xl hidden">
        <div class="flex justify-between items-center font-semibold text-gray-800">
          <span>Total:</span>
          <span id="cart-total">0 Ar</span>
        </div>
        <button id="confirm-order" class="w-full bg-red-dark text-white py-2 rounded-xl mt-2 hover:opacity-90 duration-300">CONFIRM ORDER</button>
      </div>
    `;

  document.body.appendChild(popup);
}

function refreshStockDataRefs() {
  stockData = {
    badge: document.querySelector("#cart-badge"),
    popup: document.querySelector("#cart-popup"),
    icon: document.querySelector(".fa-basket-shopping"),
    itemsContainer: document.querySelector("#cart-items"),
    footer: document.querySelector("#card-footer"),
    totalEl: document.querySelector("#cart-total"),
    closeBtn: document.querySelector("#close-cart"),
    title: document.querySelector("#cart-title"),
  };
}

export function updateCartBadge() {
  if (!stockData.badge) return;

  const count = cartState.totalItems;
  stockData.badge.textContent = count;
  stockData.badge.classList.toggle("hidden", count == 0);
}

export function renderCart() {
  if (!stockData.itemsContainer) return;

  const items = Object.values(cartState.items);
  const count = cartState.totalItems;

  stockData.title.textContent = `Your cart${items.length > 0 ? ` (${cartState.totalItems})` : ""}`;

  if (items.length === 0) {
    stockData.itemsContainer.innerHTML = `
            <div class="text-center text-gray-500 py-6">Your cart is empty.</div>
        `;
    stockData.footer?.classList.add("hidden");
    stockData.totalEl.textContent = "0 Ar";
    return;
  }
  stockData.footer?.classList.remove("hidden");
  stockData.itemsContainer.innerHTML = items
    .map((item) => {
      return `
                <div class="flex justify-between items-start gap-3 p-3">
                    <h3 class="text-sm font-semibold truncate w-45">${item.course.title}</h3>
                    <div class="flex items-center gap-2">
                        <p class="text-sm">${item.course.price.toLocaleString("en-us")} Ar</p>
                        <button data-course-id="${item.course.id}" class="remove-from-cart text-gray-400 hover:text-red-600 text-xs"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
    })
    .join("");

  stockData.totalEl.textContent = `${cartState.totalAmount.toLocaleString("en-us")} Ar`;
}

export function addToCart(course) {
  if (!cartState.items[course.id]) {
    cartState.items[course.id] = { course, quantity: 1 };
  } else {
    alert("This course is already in your cart!");
  }
  calculateCartTotals();
  updateCartBadge();
  renderCart();
}

export function removeFromCart(courseId) {
  delete cartState.items[courseId];
  calculateCartTotals();
  updateCartBadge();
  renderCart();
}

export function calculateCartTotals() {
  const entries = Object.values(cartState.items);
  cartState.totalItems = entries.reduce((sum, item) => sum + item.quantity, 0);
  cartState.totalAmount = entries.reduce(
    (sum, item) => sum + item.course.price * item.quantity,
    0,
  );
  saveCart();
}

function toggleCartPopup(show) {
  stockData.popup?.classList.toggle("hidden", !show);
}

function attachCartEvents() {
  stockData.icon?.addEventListener("click", () => toggleCartPopup(true));
  stockData.closeBtn?.addEventListener("click", () => toggleCartPopup(false));

  document.addEventListener("click", (event) => {
    if (
      !stockData.popup?.contains(event.target) &&
      !stockData.icon?.contains(event.target)
    ) {
      toggleCartPopup(false);
    }
  });

  stockData.popup?.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-from-cart");
    if (removeBtn) {
      removeFromCart(Number(removeBtn.dataset.courseId));
    }
  });

  stockData.popup?.addEventListener("click", (event) => {
    event.stopPropagation();

    const removeBtn = event.target.closest(".remove-from-cart");
    if (removeBtn) {
      removeFromCart(Number(removeBtn.dataset.courseId));
    }
  });

  const confirmBtn = document.querySelector("#confirm-order");
  confirmBtn?.addEventListener("click", () => {
    if (cartState.totalItems === 0) return;

    cartState.items = {};
    calculateCartTotals();
    updateCartBadge();
    renderCart();

    toggleCartPopup(false);
    showSuccessToast();
  });
}

function showSuccessToast() {
  const toast = document.createElement("div");
  toast.className = `
        fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] 
        flex items-center gap-4 p-5 rounded-2xl bg-emerald-700 text-white 
        shadow-2xl border border-white/10 min-w-[320px] md:min-w-[500px]
        opacity-0 translate-y-4 transition-all duration-500 ease-out
    `;

  toast.innerHTML = `
        <div class="text-3xl shrink-0">🎉</div>
        <div class="flex-1">
            <h3 class="font-bold text-lg leading-tight">Thank you so much for buying our course!</h3>
            <p class="text-sm text-emerald-50/90 mt-1">We'll be in touch shortly with all the details.</p>
        </div>
        <button class="close-toast ml-4 text-white/60 hover:text-white">
            <i class="fa-solid fa-xmark text-xl"></i>
        </button>
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("opacity-0", "translate-y-4");
    toast.classList.add("opacity-100", "translate-y-0");
  }, 10);

  const closeToast = () => {
    toast.classList.replace("opacity-100", "opacity-0");
    toast.classList.replace("translate-y-0", "translate-y-4");
    setTimeout(() => toast.remove(), 500);
  };

  toast.querySelector(".close-toast").addEventListener("click", closeToast);
  setTimeout(closeToast, 5000);
}
export function initCart() {
  injectCartSection();
  refreshStockDataRefs();
  calculateCartTotals();
  updateCartBadge();
  renderCart();
  attachCartEvents();
}

window.addEventListener("storage", (event) => {
  if (event.key === "cart_data") {
    const newData = JSON.parse(event.newValue);
    Object.assign(cartState, newData);
    updateCartBadge();
    renderCart();
  }
});
