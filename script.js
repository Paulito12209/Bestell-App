// Variablen
let cartItems = [];
let cartAmount = [];

function init() {
  getFromLocalStorage();
  renderMenuItems();
  renderCart();
  renderCartDialog();
  renderCartSummary();
  updateMobileCartButton();
}

// Local Storage
function saveToLocalStorage() {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartAmount", JSON.stringify(cartAmount));
  } catch (e) {}
}

function getFromLocalStorage() {
  let itemsText = localStorage.getItem("cartItems");
  let amountsText = localStorage.getItem("cartAmount");
  let items = [];
  let amounts = [];

  if (itemsText) {
    try {
      items = JSON.parse(itemsText);
    } catch (e) {
      items = [];
    }
  }
  if (amountsText) {
    try {
      amounts = JSON.parse(amountsText);
    } catch (e) {
      amounts = [];
    }
  }

  if (items && typeof items.length === "number") {
    cartItems = items;
  } else {
    cartItems = [];
  }
  if (amounts && typeof amounts.length === "number") {
    cartAmount = amounts;
  } else {
    cartAmount = [];
  }

  if (cartItems.length !== cartAmount.length) {
    cartItems = [];
    cartAmount = [];
  }
}

// Menü
function renderMenuItems() {
  let list = document.getElementById("menu_list");
  if (!list) {
    return;
  }
  list.innerHTML = "";
  for (let i = 0; i < menuItems.length; i++) {
    list.innerHTML += getMenuItem(i);
  }
}

// Cart Desktop
function renderCart() {
  let list = document.getElementById("cart_list");
  if (!list) {
    return;
  }
  list.innerHTML = "";

  if (cartItems.length === 0) {
    list.innerHTML = '<div class="empty_cart">Dein Warenkorb ist leer.</div>';
    let actions = document.getElementById("order_actions");
    if (actions) {
      actions.innerHTML = "";
    }
    return;
  }

  for (let i = 0; i < cartItems.length; i++) {
    list.innerHTML += getCartItem(i);
  }

  let actions = document.getElementById("order_actions");
  if (actions) {
    actions.innerHTML =
      '\n      <div class="cart_divider"></div>\n      <div class="cart_buttons paddings">\n        <button onclick="placeOrder()">Bestellen</button>\n      </div>';
  }
}

// Cart Dialog (mobil)
function renderCartDialog() {
  let list = document.getElementById("cart_list_dialog");
  if (!list) {
    return;
  }
  list.innerHTML = "";

  if (cartItems.length === 0) {
    list.innerHTML = '<div class="empty_cart">Dein Warenkorb ist leer.</div>';
    let actions = document.getElementById("order_actions_dialog");
    if (actions) {
      actions.innerHTML = "";
    }
    return;
  }

  for (let i = 0; i < cartItems.length; i++) {
    list.innerHTML += getCartItem(i);
  }

  let actions = document.getElementById("order_actions_dialog");
  if (actions) {
    actions.innerHTML =
      '\n      <div class="cart_divider"></div>\n      <div class="cart_buttons paddings">\n        <button onclick="placeOrder()">Bestellen</button>\n      </div>';
  }
}

// Summary
function renderCartSummary() {
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal = subtotal + cartItems[i].price * cartAmount[i];
  }
  let shipping = 0;
  if (cartItems.length > 0) {
    shipping = 5;
  }
  let total = subtotal + shipping;

  let costs = document.getElementById("cart_costs");
  if (costs) {
    costs.innerHTML =
      '\n      <div class="cart_subtotal"><p>Zwischensumme</p><p>' +
      subtotal.toFixed(2) +
      ' €</p></div>\n      <div class="cart_shipping_costs"><p>Lieferkosten</p><p>' +
      shipping.toFixed(2) +
      ' €</p></div>\n      <div class="cart_total"><h3>Gesamt</h3><h3>' +
      total.toFixed(2) +
      " €</h3></div>\n    ";
  }

  let costsD = document.getElementById("cart_costs_dialog");
  if (costsD) {
    costsD.innerHTML =
      '\n      <div class="cart_subtotal"><p>Zwischensumme</p><p>' +
      subtotal.toFixed(2) +
      ' €</p></div>\n      <div class="cart_shipping_costs"><p>Lieferkosten</p><p>' +
      shipping.toFixed(2) +
      ' €</p></div>\n      <div class="cart_total"><h3>Gesamt</h3><h3>' +
      total.toFixed(2) +
      " €</h3></div>\n    ";
  }

  updateMobileCartButton(total);
}

// Cart Logik
function addToCart(menuIndex) {
  let item = menuItems[menuIndex];
  let found = -1;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === item.id) {
      found = i;
      break;
    }
  }
  if (found === -1) {
    cartItems.push({ id: item.id, name: item.name, price: item.price });
    cartAmount.push(1);
  } else {
    cartAmount[found] = cartAmount[found] + 1;
  }
  saveAndRender();
}

function increaseAmount(cartIndex) {
  if (cartAmount[cartIndex] === undefined) {
    return;
  }
  cartAmount[cartIndex] = cartAmount[cartIndex] + 1;
  saveAndRender();
}

function decreaseAmount(cartIndex) {
  if (cartAmount[cartIndex] === undefined) {
    return;
  }
  cartAmount[cartIndex] = cartAmount[cartIndex] - 1;
  if (cartAmount[cartIndex] <= 0) {
    removeFromCart(cartIndex);
    return;
  }
  saveAndRender();
}

function removeFromCart(cartIndex) {
  cartItems.splice(cartIndex, 1);
  cartAmount.splice(cartIndex, 1);
  saveAndRender();
}

function saveAndRender() {
  saveToLocalStorage();
  renderCart();
  renderCartDialog();
  renderCartSummary();
}

function placeOrder() {
  let container = document.getElementById("order_actions");
  if (!container) {
    container = document.getElementById("order_actions_dialog");
  }
  if (container) {
    container.insertAdjacentHTML("afterbegin", getOrderSuccess());
  }
  cartItems = [];
  cartAmount = [];
  saveAndRender();
}

// Mobile UI
function showCart() {
  let dlg = document.getElementById("cart_dialog");
  let isMobile = false;
  if (window.matchMedia) {
    isMobile = window.matchMedia("(max-width: 768px)").matches;
  }
  if (isMobile) {
    if (dlg && !dlg.open) {
      renderCartDialog();
      dlg.showModal();
    }
  } else {
    let el = document.querySelector(".cart_container");
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function updateMobileCartButton(total) {
  let btn = document.getElementById("open_cart_btn");
  if (!btn) {
    return;
  }
  if (typeof total !== "number") {
    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      subtotal = subtotal + cartItems[i].price * cartAmount[i];
    }
    total = subtotal + (cartItems.length > 0 ? 5 : 0);
  }
  if (cartItems.length > 0) {
    btn.textContent = "Warenkorb · " + total.toFixed(2) + " €";
  } else {
    btn.textContent = "Warenkorb";
  }
}
