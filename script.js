// === VARIABLEN ===
let cartItems = [];
let cartAmount = [];

function init() {
  getFromLocalStorage();
  renderMenuItems();
  renderCart();
  renderCartSummary();
  updateMobileCartButton();
}

// === Local Storage ===
function saveToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartAmount", JSON.stringify(cartAmount));
}

function getFromLocalStorage() {
  let items = JSON.parse(localStorage.getItem("cartItems"));
  let amounts = JSON.parse(localStorage.getItem("cartAmount"));
  cartItems = Array.isArray(items) ? items : [];
  cartAmount = Array.isArray(amounts) ? amounts : [];
  if (cartItems.length !== cartAmount.length) {
    cartItems = [];
    cartAmount = [];
  }
}

// === Render Menü ===
function renderMenuItems() {
  let list = document.getElementById("menu_list");
  list.innerHTML = "";
  for (let i = 0; i < menuItems.length; i++) {
    list.innerHTML += getMenuItem(i);
  }
}

// === Render Cart === (Desktop)
function renderCart() {
  let list = document.getElementById("cart_list");
  list.innerHTML = "";
  if (cartItems.length === 0) {
    list.innerHTML = `<div class=\"empty_cart\">Dein Warenkorb ist leer.</div>`;
    let actions = document.getElementById("order_actions");
    if (actions) actions.innerHTML = "";
    return;
  }
  for (let i = 0; i < cartItems.length; i++) {
    list.innerHTML += getCartItem(i);
  }
  let actions = document.getElementById("order_actions");
  if (actions) {
    actions.innerHTML = `\n      <div class=\"cart_divider\"></div>\n      <div class=\"cart_buttons paddings\">\n        <button onclick=\"placeOrder()\">Bestellen</button>\n      </div>`;
  }
}

// === Render Cart (Dial ===og mobil)
function renderCartDialog() {
  let list = document.getElementById("cart_list_dialog");
  if (!list) return;
  list.innerHTML = "";
  if (cartItems.length === 0) {
    list.innerHTML = `<div class=\"empty_cart\">Dein Warenkorb ist leer.</div>`;
    let actions = document.getElementById("order_actions_dialog");
    if (actions) actions.innerHTML = "";
    return;
  }
  for (let i = 0; i < cartItems.length; i++) {
    list.innerHTML += getCartItem(i);
  }
  let actions = document.getElementById("order_actions_dialog");
  if (actions) {
    actions.innerHTML = `\n      <div class=\"cart_divider\"></div>\n      <div class=\"cart_buttons paddings\">\n        <button onclick=\"placeOrder()\">Bestellen</button>\n      </div>`;
  }
}

// === Summary ===
function renderCartSummary() {
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal += cartItems[i].price * cartAmount[i];
  }
  let shipping = cartItems.length > 0 ? 5.0 : 0.0;
  let total = subtotal + shipping;

  let costs = document.getElementById("cart_costs");
  if (costs) {
    costs.innerHTML = `\n      <div class=\"cart_subtotal\"><p>Zwischensumme</p><p>${subtotal.toFixed(
      2
    )} €</p></div>\n      <div class=\"cart_shipping_costs\"><p>Lieferkosten</p><p>${shipping.toFixed(
      2
    )} €</p></div>\n      <div class=\"cart_total\"><h3>Gesamt</h3><h3>${total.toFixed(
      2
    )} €</h3></div>\n    `;
  }

  let costsD = document.getElementById("cart_costs_dialog");
  if (costsD) {
    costsD.innerHTML = `\n      <div class=\"cart_subtotal\"><p>Zwischensumme</p><p>${subtotal.toFixed(
      2
    )} €</p></div>\n      <div class=\"cart_shipping_costs\"><p>Lieferkosten</p><p>${shipping.toFixed(
      2
    )} €</p></div>\n      <div class=\"cart_total\"><h3>Gesamt</h3><h3>${total.toFixed(
      2
    )} €</h3></div>\n    `;
  }

  updateMobileCartButton(total);
}

// === Cart Logik ===
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
    cartAmount[found]++;
  }
  saveToLocalStorage();
  renderCart();
  renderCartDialog();
  renderCartSummary();
}

function increaseAmount(index) {
  cartAmount[index]++;
  saveToLocalStorage();
  renderCart();
  renderCartDialog();
  renderCartSummary();
}

function decreaseAmount(index) {
  cartAmount[index]--;
  if (cartAmount[index] <= 0) {
    removeFromCart(index);
    return;
  }
  saveToLocalStorage();
  renderCart();
  renderCartDialog();
  renderCartSummary();
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  cartAmount.splice(index, 1);
  saveToLocalStorage();
  renderCart();
  renderCartDialog();
  renderCartSummary();
}

function placeOrder() {
  if (cartItems.length === 0) return;
  cartItems = [];
  cartAmount = [];
  saveToLocalStorage();
  renderCart();
  renderCartDialog();
  renderCartSummary();
  let container = document.getElementById("cart_list");
  if (container) {
    container.insertAdjacentHTML("afterbegin", getOrderSuccess());
    setTimeout(() => {
      let s = document.getElementById("order_success");
      if (s) s.remove();
    }, 3500);
  }
}

// === Responsive Dialog ===
function showCart() {
  let dialog = document.getElementById("cart_dialog");
  if (!dialog) return;
  if (!dialog.open) {
    renderCartDialog();
    dialog.showModal();
  } else {
    dialog.close();
  }
}

function updateMobileCartButton(total = 0) {
  let btn = document.getElementById("open_cart_btn");
  if (!btn) return;
  btn.textContent =
    total > 0 ? `Warenkorb · ${total.toFixed(2)} €` : "Warenkorb";
}
