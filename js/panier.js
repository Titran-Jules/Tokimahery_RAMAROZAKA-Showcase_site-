export const cartState = JSON.parse(localStorage.getItem('cart_data')) || {
    items: {},
    totalItems: 0,
    totalAmount: 0,
};

let stockData = {};

function saveCart () {
    localStorage.setItem('cart_data', JSON.stringify(cartState));
}

function injectCartSection () {
    if (document.querySelector("#cart-popup")) return;

    const popup = document.createElement('div');
    popup.id = "cart-popup";

    popup.className = "hidden fixed top-20 right-8 bg-white shadow-2xl rounded-2xl w-80 z-50 max-h-96 flex flex-col border border-gray-100";

    popup.innerHTML = `
      <div class="flex justify-between items-center p-4 border-b">
        <h2 id="cart-title" class="font-semibold text-lg text-gray-800">Your cart</h2>
        <button id="close-cart" class="text-gray-400 hover:text-gray-600 text-xl">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div id="cart-items" class="flex-1 overflow-y-auto p-4"></div>
      <div class="border-t p-4 bg-gray-50 rounded-b-2xl">
        <div class="flex justify-between items-center font-semibold text-gray-800">
          <span>Total:</span>
          <span id="cart-total">0 Ar</span>
        </div>
      </div>
    `;

    document.body.appendChild(popup);
}

function refreshStockDataRefs () {
    stockData = {
        badge: document.querySelector("#cart-badge"),
        popup: document.querySelector("#cart-popup"),
        icon: document.querySelector(".fa-basket-shopping"),
        itemsContainer: document.querySelector("#cart-items"),
        totalEl: document.querySelector("#cart-total"),
        closeBtn: document.querySelector("#close-cart"),
        title: document.querySelector("#cart-title")
    }
}

export function updateCartBadge() {
    if (!stockData.badge) return;

    const count = cartState.totalItems;
    stockData.badge.textContent = count;
    stockData.badge.classList.toggle("hidden", count == 0);
}



export function renderCart() {

    if (!stockData.itemsContainer || !stockData.totalEl) return;

    const items = Object.values(cartState.items);
    const count = cartState.totalItems;

    stockData.title.textContent = `Your cart${items.length > 0 ? ` (${cartState.totalItems})` : ''}`;

    if (items.length === 0) {
        stockData.itemsContainer.innerHTML = `
            <div class="text-center text-gray-500 py-6">Your cart is empty.</div>
        `;
        return;
    }

    stockData.itemsContainer.innerHTML = items.map(item => {
            return `
                <div class="flex justify-between items-start gap-3 p-3 rounded-xl border border-gray-200">
                    <div class="flex-1">
                        <h3 class="text-sm font-semibold">${item.course.title}</h3>
                        <p class="text-xs text-gray-500">MGA ${item.course.price.toLocaleString('en-us')}</p>
                    </div>
                    <button data-course-id="${item.course.id}" class="remove-from-cart text-gray-400 hover:text-red-600 text-lg"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        })
        .join("");

    stockData.totalEl.textContent = `${cartState.totalAmount.toLocaleString('en-us')} Ar`;
}

export function addToCart(course) {
    if (!cartState.items[course.id]) {
        cartState.items[course.id] = { course, quantity: 1 };
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
    cartState.totalAmount = entries.reduce((sum, item) => sum + item.course.price * item.quantity, 0);
    saveCart();
}

function toggleCartPopup(show) {
    stockData.popup?.classList.toggle("hidden", !show);
}

function attachCartEvents() {

    stockData.icon?.addEventListener("click", () => toggleCartPopup(true));
    stockData.closeBtn?.addEventListener("click", () => toggleCartPopup(false));

    document.addEventListener("click", (event) => {
        if (!stockData.popup?.contains(event.target) && !stockData.icon?.contains(event.target)) {
            toggleCartPopup(false);
        }
    });

    stockData.popup?.addEventListener("click", (event) => {
        const removeBtn = event.target.closest(".remove-from-cart");
        if (removeBtn) {
            removeFromCart(Number(removeBtn.dataset.courseId));
        }
    });
}

export function initCart() {
    injectCartSection();
    refreshStockDataRefs();
    calculateCartTotals();
    updateCartBadge();
    renderCart();
    attachCartEvents();
}

window.addEventListener('storage', (event) => {
    if (event.key === 'cart_data') {
        const newData = JSON.parse(event.newValue);
        Object.assign(cartState, newData);
        updateCartBadge();
        renderCart();
    }
});