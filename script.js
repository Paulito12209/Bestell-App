// === VARIABLEN ===
let cartItems = [];
let cartAmount = [];

// === INITIAL FUNKTION ===
function init() {
  getFromLocalStorage();
  renderMenuItems();
  renderCart();
  renderCartSummary();
}

// === LOCAL STORAGE ===
function saveToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartAmount", JSON.stringify(cartAmount));
}

function getFromLocalStorage() {
  let items = JSON.parse(localStorage.getItem("cartItems"));
  let amounts = JSON.parse(localStorage.getItem("cartAmount"));

  // Standard: leere Arrays
  cartItems = [];
  cartAmount = [];

  // Nur wenn wirklich Daten da sind
  if (items != null && amounts != null) {
    // Längen müssen gleich sein
    if (items.length == amounts.length) {
      cartItems = items;
      cartAmount = amounts;
    }
  }
}

// === MENU RENDER ===
function renderMenuItems() {
  let list = document.getElementById("menu_list");
  list.innerHTML = "";
  for (let i = 0; i < menuItems.length; i++) {
    list.innerHTML += getMenuItem(i);
  }
}

// === WARENKORB RENDER ===
function renderCart() {
  let list = document.getElementById("cart_list");
  list.innerHTML = "";

  if (cartItems.length === 0) {
    list.innerHTML = `<div class="empty_cart">Dein Warenkorb ist leer.</div>`;
    return;
  }
  for (let i = 0; i < cartItems.length; i++) {
    list.innerHTML += getCartItem(i);
  }
}

// === SUMMARY RENDER ===
function renderCartSummary() {
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal = subtotal + cartItems[i].price * cartAmount[i];
  }

  let shipping = 0.0;
  if (cartItems.length > 0) {
    shipping = 5.0;
  }

  let total = subtotal + shipping;

  let costs = document.getElementById("cart_costs");
  costs.innerHTML = `
    <div class="cart_subtotal">
      <p>Zwischensumme</p>
      <p>${subtotal.toFixed(2)} €</p>
    </div>
    <div class="cart_shipping_costs">
      <p>Lieferkosten</p>
      <p>${shipping.toFixed(2)} €</p>
    </div>
    <div class="cart_total">
      <h3>Gesamt</h3>
      <h3>${total.toFixed(2)} €</h3>
    </div>
  `;
}

// === WARENKORB LOGIK ===
// Klick auf oranges + in der Menükarte
function addToCart(menuIndex) {
  let item = menuItems[menuIndex];

  // Manuelle Suche nach gleicher ID
  let found = -1;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == item.id) {
      found = i;
      break;
    }
  }

  if (found == -1) {
    // Neues Item in den Warenkorb
    cartItems.push(item);
    cartAmount.push(1);
  } else {
    // Anzahl erhöhen
    cartAmount[found] = cartAmount[found] + 1;
  }

  saveToLocalStorage();
  renderCart();
  renderCartSummary();
}

// Menge erhöhen
function increaseAmount(cartIndex) {
  // Bounds-Check (sicher ist sicher)
  if (cartIndex >= 0 && cartIndex < cartAmount.length) {
    cartAmount[cartIndex] = cartAmount[cartIndex] + 1;
    saveToLocalStorage();
    renderCart();
    renderCartSummary();
  }
}

// Menge verringern (bei 1 -> entfernen)
function decreaseAmount(cartIndex) {
  if (cartIndex >= 0 && cartIndex < cartAmount.length) {
    if (cartAmount[cartIndex] > 1) {
      cartAmount[cartIndex] = cartAmount[cartIndex] - 1;
    } else {
      // bei 1 wird der Eintrag komplett entfernt
      cartItems.splice(cartIndex, 1);
      cartAmount.splice(cartIndex, 1);
    }
    saveToLocalStorage();
    renderCart();
    renderCartSummary();
  }
}

// Item komplett entfernen
function removeFromCart(cartIndex) {
  if (cartIndex >= 0 && cartIndex < cartItems.length) {
    cartItems.splice(cartIndex, 1);
    cartAmount.splice(cartIndex, 1);
    saveToLocalStorage();
    renderCart();
    renderCartSummary();
  }
}

// function saveAndRender() {
//   saveToLocalStorage();
//   renderCart();
//   renderCartSummary();
// }

//DIALO ÖFFNEN
