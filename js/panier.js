export const cartState = JSON.parse(localStorage.getItem('cart_data')) || {
    items: {},
    totalItems: 0,
    totalAmount: 0,
};

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

    const cartIconContainer = document.querySelector(".fa-basket-shopping")?.parentElement;

    if (cartIconContainer && !document.querySelector("#cart-badge")) {
        cartIconContainer.classList.add("relative");
        const badge = document.createElement("div");
        badge.id = "cart-badge";
        badge.className = "hidden absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold";
        cartIconContainer.appendChild(badge);
    }
}

export function updateCartBadge() {
    const badge = document.querySelector("#cart-badge");

    if (!badge) return;

    const count = cartState.totalItems;
    badge.textContent = count;
    if (count === 0) {
        badge.classList.add("hidden");
    } else {
        badge.classList.remove("hidden");
    }
}

export function calculateCartTotals() {
    const entries = Object.values(cartState.items);
    cartState.totalItems = entries.reduce((sum, item) => sum + item.quantity, 0);
    cartState.totalAmount = entries.reduce((sum, item) => sum + item.course.price * item.quantity, 0);
    saveCart();
}

export function renderCart() {

    const container = document.querySelector("#cart-items");
    const totalEl = document.querySelector("#cart-total");
    const titleEl = document.querySelector("#cart-title");

    if (!container || !totalEl) return;
    if (!cartItemsContainer || !cartTotalEl) return;

    const items = Object.values(cartState.items);
    const count = cartState.totalItems;

    if (titleEl) titleEl.textContent = `Your cart${items.length > 0 ? ` (${cartState.totalItems})` : ''}`;

    if (items.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-6">Your cart is empty.</div>
        `;
        totalEl.textContent = `0 Ar`;
        return;
    }

    container.innerHTML = items
        .map(({course}) => {
            return `
                <div class="flex justify-between items-start gap-3 p-3 rounded-xl border border-gray-200">
                    <div class="flex-1">
                        <h3 class="text-sm font-semibold">${course.title}</h3>
                        <p class="text-xs text-gray-500">MGA ${course.price.toLocaleString('en-us')}</p>
                    </div>
                    <button data-course-id="${course.id}" class="remove-from-cart text-gray-400 hover:text-red-600 text-lg"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        })
        .join("");

    totalEl.textContent = `${cartState.totalAmount.toLocaleString('en-us')} Ar`;
}

function addToCart(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (!cartState.items[courseId]) {
        cartState.items[courseId] = { course, quantity: 0 };
    }

    cartState.items[courseId].quantity += 1;
    calculateCartTotals();
    updateCartBadge();
    renderCart();
    updateCourses();
    saveCart();
}

function removeFromCart(courseId) {
    if (!cartState.items[courseId]) return;

    delete cartState.items[courseId];
    calculateCartTotals();
    updateCartBadge();
    renderCart();
    saveCart();
}

function toggleCartPopup(show) {
    if (typeof show === "boolean") {
        show ? cartPopup.classList.remove("hidden") : cartPopup.classList.add("hidden");
    } else {
        cartPopup.classList.toggle("hidden");
    }
}

function attachCartEvents() {

    const cartIcon = document.querySelector(".fa-basket-shopping");
    const closeBtn = document.querySelector("#close-cart");
    const popup = document.querySelector("#cart-popup");

    if (cartIcon) cartIcon.addEventListener("click", () => popup?.classList.remove("hidden"));
    if (closeBtn) closeBtn.addEventListener("click", () => popup?.classList.add("hidden"));

    document.addEventListener("click", (event) => {
        if (!popup || !cartIcon) return;
        if (popup.contains(event.target) || cartIcon.parentElement.contains(event.target)) {
            return;
        }
        popup.classList.add("hidden");
    });

    popup?.addEventListener("click", (event) => {
        const removeBtn = event.target.closest(".remove-from-cart");

        if (removeBtn) {
            removeFromCart(Number(removeBtn.dataset.courseId));
        }
    });
}

function isCourseInCart(courseId) {
    return Boolean(cartState.items[courseId]);
}

function updateAddToCartButtons() {

}

export function initCart() {
    injectCartSection();
    calculateCartTotals();
    updateCartBadge();
    renderCart();
    attachCartEvents();
}

function addToCartHandler(event) {
    const button = event.currentTarget;
    const courseId = Number(button.dataset.courseId);
    if (!courseId) return;
    if (isCourseInCart(courseId)) {
        alert("This course is already in your cart!");
        return;
    }

    addToCart(courseId);
}

function attachAddToCartEvents() {
    const addButtons = document.querySelectorAll(".add-to-cart-btn");
    addButtons.forEach((button) => {
        button.addEventListener("click", addToCartHandler);
    });
}

function updateCartAfterRender() {
    updateAddToCartButtons();
    attachAddToCartEvents();
    renderCart();
}

window.addEventListener('storage', (event) => {
    if (event.key === 'cart_data') {
        const newData = JSON.parse(event.newValue);
        Object.assign(cartState, newData);
        updateCartBadge();
        renderCart();
    }
});