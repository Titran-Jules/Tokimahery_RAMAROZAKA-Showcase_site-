const cartState = {
    items: {},
    totalItems: 0,
    totalAmount: 0,
};

const cartBadge = document.querySelector("#cart-badge");
const cartPopup = document.querySelector("#cart-popup");
const cartIcon = document.querySelector(".fa-basket-shopping");
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotalEl = document.querySelector("#cart-total");
const closeCartBtn = document.querySelector("#close-cart");

function updateCartBadge() {
    const count = cartState.totalItems;
    cartBadge.textContent = count;
    if (count === 0) {
        cartBadge.classList.add("hidden");
    } else {
        cartBadge.classList.remove("hidden");
    }
}

function calculateCartTotals() {
    const entries = Object.values(cartState.items);
    cartState.totalItems = entries.reduce((sum, item) => sum + item.quantity, 0);
    cartState.totalAmount = entries.reduce((sum, item) => sum + item.course.price * item.quantity, 0);
}

function renderCart() {
    const items = Object.values(cartState.items);
    const count = cartState.totalItems;

    document.querySelector("#cart-title").textContent = `Your cart${count > 0 ? ` (${count})` : ''}`;

    if (items.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center text-gray-500 py-6">Your cart is empty.</div>
        `;
        cartTotalEl.textContent = `0 Ar`;
        return;
    }

    cartItemsContainer.innerHTML = items
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

    cartTotalEl.textContent = `${cartState.totalAmount.toLocaleString('en-us')} Ar`;
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
}

function removeFromCart(courseId) {
    if (!cartState.items[courseId]) return;

    delete cartState.items[courseId];
    calculateCartTotals();
    updateCartBadge();
    renderCart();
}

function toggleCartPopup(show) {
    if (typeof show === "boolean") {
        show ? cartPopup.classList.remove("hidden") : cartPopup.classList.add("hidden");
    } else {
        cartPopup.classList.toggle("hidden");
    }
}

function attachCartEvents() {
    cartIcon.addEventListener("click", () => toggleCartPopup(true));
    closeCartBtn.addEventListener("click", () => toggleCartPopup(false));

    document.addEventListener("click", (event) => {
        if (cartPopup.contains(event.target) || cartIcon.parentElement.contains(event.target)) {
            return;
        }
        toggleCartPopup(false);
    });

    cartPopup.addEventListener("click", (event) => {
        if (event.target.closest(".remove-from-cart")) {
            const courseId = Number(event.target.closest(".remove-from-cart").dataset.courseId);
            removeFromCart(courseId);
        }
    });
}

function isCourseInCart(courseId) {
    return Boolean(cartState.items[courseId]);
}

function updateAddToCartButtons() {

}

function initCart() {
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