// === Variablen ===
let cartItems = []; // Artikel im Warenkorb
let cartAmounts = []; // Mengen passend zu cartItems

function init() {
  loadFromStorage();
  renderMenu();
  renderCartDesktop();
  renderCartDialog();
  renderCartSummary();
  updateMobileCartButton();
}

/* === Local Storage === */

function saveToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartAmounts", JSON.stringify(cartAmounts));
}

function loadFromStorage() {
  let itemsText = localStorage.getItem("cartItems");
  let amountsText = localStorage.getItem("cartAmounts");
  let items = [];
  let amounts = [];

  if (itemsText) {
    items = JSON.parse(itemsText);
  }
  if (amountsText) {
    amounts = JSON.parse(amountsText);
  }

  if (items && typeof items.length === "number") {
    cartItems = items;
  } else {
    cartItems = [];
  }
  if (amounts && typeof amounts.length === "number") {
    cartAmounts = amounts;
  } else {
    cartAmounts = [];
  }

  // Sicherheitscheck
  if (cartItems.length !== cartAmounts.length) {
    cartItems = [];
    cartAmounts = [];
  }
}

/* === Menü === */

function renderMenu() {
  let menuListRef = document.getElementById("menu_list");
  if (!menuListRef) {
    return;
  }
  menuListRef.innerHTML = "";
  for (let index = 0; index < menuItems.length; index++) {
    menuListRef.innerHTML += getMenuItem(index);
  }
}

/* === Warenkorb Desktop === */

function renderCartDesktop() {
  let cartListRef = document.getElementById("cart_list");
  if (!cartListRef) {
    return;
  }
  cartListRef.innerHTML = "";

  if (cartItems.length === 0) {
    cartListRef.innerHTML =
      '<div class="empty_cart">Dein Warenkorb ist leer.</div>';
    let actionsRef = document.getElementById("order_actions");
    if (actionsRef) {
      actionsRef.innerHTML = "";
    }
    return;
  }

  for (let index = 0; index < cartItems.length; index++) {
    cartListRef.innerHTML += getCartItem(index);
  }

  let actionsRef = document.getElementById("order_actions");
  if (actionsRef) {
    actionsRef.innerHTML =
      '\n<div class="cart_divider"></div>\n' +
      '<div class="cart_buttons paddings">\n' +
      '  <button onclick="placeOrder()">Bestellen</button>\n' +
      "</div>";
  }
}

/* === Warenkorb Dialog (mobil) === */

function renderCartDialog() {
  let dialogListRef = document.getElementById("cart_list_dialog");
  if (!dialogListRef) {
    return;
  }
  dialogListRef.innerHTML = "";

  if (cartItems.length === 0) {
    dialogListRef.innerHTML =
      '<div class="empty_cart">Dein Warenkorb ist leer.</div>';
    let actionsDialogRef = document.getElementById("order_actions_dialog");
    if (actionsDialogRef) {
      actionsDialogRef.innerHTML = "";
    }
    return;
  }

  for (let index = 0; index < cartItems.length; index++) {
    dialogListRef.innerHTML += getCartItem(index);
  }

  let actionsDialogRef = document.getElementById("order_actions_dialog");
  if (actionsDialogRef) {
    actionsDialogRef.innerHTML =
      '\n<div class="cart_divider"></div>\n' +
      '<div class="cart_buttons paddings">\n' +
      '  <button onclick="placeOrder()">Bestellen</button>\n' +
      "</div>";
  }
}

/* === Zusammenfassung === */

function renderCartSummary() {
  let subtotal = 0;
  for (let index = 0; index < cartItems.length; index++) {
    subtotal = subtotal + cartItems[index].price * cartAmounts[index];
  }
  let shipping = 0;
  if (cartItems.length > 0) {
    shipping = 5;
  }
  let total = subtotal + shipping;

  let cartCosts = document.getElementById("cart_costs");
  if (cartCosts) {
    cartCosts.innerHTML =
      '\n<div class="cart_subtotal"><p>Zwischensumme</p><p>' +
      subtotal.toFixed(2) +
      " €</p></div>\n" +
      '<div class="cart_shipping_costs"><p>Lieferkosten</p><p>' +
      shipping.toFixed(2) +
      " €</p></div>\n" +
      '<div class="cart_total"><h3>Gesamt</h3><h3>' +
      total.toFixed(2) +
      " €</h3></div>\n";
  }

  let cartCostsDialog = document.getElementById("cart_costs_dialog");
  if (cartCostsDialog) {
    cartCostsDialog.innerHTML =
      '\n<div class="cart_subtotal"><p>Zwischensumme</p><p>' +
      subtotal.toFixed(2) +
      " €</p></div>\n" +
      '<div class="cart_shipping_costs"><p>Lieferkosten</p><p>' +
      shipping.toFixed(2) +
      " €</p></div>\n" +
      '<div class="cart_total"><h3>Gesamt</h3><h3>' +
      total.toFixed(2) +
      " €</h3></div>\n";
  }

  updateMobileCartButton(total);
}

/* === Warenkorb-Logik === */

function addToCart(menuIndex) {
  let item = menuItems[menuIndex];
  let existingIndex = -1;

  for (let index = 0; index < cartItems.length; index++) {
    if (cartItems[index].id === item.id) {
      existingIndex = index;
      break;
    }
  }

  if (existingIndex === -1) {
    cartItems.push({ id: item.id, name: item.name, price: item.price });
    cartAmounts.push(1);
  } else {
    cartAmounts[existingIndex] = cartAmounts[existingIndex] + 1;
  }

  saveAndReRender();
}

function increaseAmount(cartIndex) {
  if (cartAmounts[cartIndex] === undefined) {
    return;
  }
  cartAmounts[cartIndex] = cartAmounts[cartIndex] + 1;
  saveAndReRender();
}

function decreaseAmount(cartIndex) {
  if (cartAmounts[cartIndex] === undefined) {
    return;
  }
  cartAmounts[cartIndex] = cartAmounts[cartIndex] - 1;
  if (cartAmounts[cartIndex] <= 0) {
    removeFromCart(cartIndex);
    return;
  }
  saveAndReRender();
}

function removeFromCart(cartIndex) {
  cartItems.splice(cartIndex, 1);
  cartAmounts.splice(cartIndex, 1);
  saveAndReRender();
}

function saveAndReRender() {
  saveToStorage();
  renderCartDesktop();
  renderCartDialog();
  renderCartSummary();
}

/* === Bestellen + Dialog steuern === */

function placeOrder() {
  let actions = document.getElementById("order_actions");
  if (!actions) {
    actions = document.getElementById("order_actions_dialog");
  }
  if (actions) {
    actions.insertAdjacentHTML("afterbegin", getOrderSuccess());
  }
  // Optional: automatisch schließen
  // closeCart();
}

function showCart() {
  let cartDialog = document.getElementById("cart_dialog");
  let isMobile = false;
  if (window.matchMedia) {
    isMobile = window.matchMedia("(max-width: 768px)").matches;
  }

  if (isMobile) {
    if (cartDialog && !cartDialog.open) {
      renderCartDialog();
      cartDialog.showModal();
    }
  } else {
    let cartContainer = document.querySelector(".cart_container");
    if (cartContainer && cartContainer.scrollIntoView) {
      cartContainer.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function closeCart() {
  let cartDialog = document.getElementById("cart_dialog");
  if (cartDialog && cartDialog.open) {
    cartDialog.close();
  }
}

function updateMobileCartButton(total) {
  let cartButton = document.getElementById("open_cart_btn");
  if (!cartButton) {
    return;
  }

  if (typeof total !== "number") {
    let subtotal = 0;
    for (let index = 0; index < cartItems.length; index++) {
      subtotal = subtotal + cartItems[index].price * cartAmounts[index];
    }
    total = subtotal + (cartItems.length > 0 ? 5 : 0);
  }

  if (cartItems.length > 0) {
    cartButton.textContent = "Warenkorb · " + total.toFixed(2) + " €";
  } else {
    cartButton.textContent = "Warenkorb";
  }
}
