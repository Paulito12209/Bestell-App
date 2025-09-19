// === VARIABLEN ===
let cartItems = []; // Artikel im Warenkorb
let cartAmounts = []; // Mengen passend zu cartItems
let orderPlaced = false; // Flag für Bestellbestätigung

// === INIT FUNKTION ===
function init() {
  loadFromStorage();
  renderMenu();
  renderCartDesktop();
  renderCartDialog();
  renderCartSummary();
  updateMobileCartButton();
}

// === LOCAL STORAGE ===
function saveToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartAmounts", JSON.stringify(cartAmounts));
}

function loadFromStorage() {
  let savedItems = localStorage.getItem("cartItems");
  let savedAmounts = localStorage.getItem("cartAmounts");

  cartItems = [];
  cartAmounts = [];

  if (savedItems && savedAmounts) {
    let items = JSON.parse(savedItems);
    let amounts = JSON.parse(savedAmounts);
    if (items.length == amounts.length) {
      cartItems = items;
      cartAmounts = amounts;
    }
  }
}

// === MENU RENDERN ===
function renderMenu() {
  let menuList = document.getElementById("menu_list");
  if (!menuList) return;

  menuList.innerHTML = "";
  for (let i = 0; i < menuItems.length; i++) {
    menuList.innerHTML += getMenuItem(i);
  }
}

// === DESKTOP-WARENKORB RENDERN ===
function renderCartDesktop() {
  let cartList = document.getElementById("cart_list");
  if (!cartList) return;

  if (cartItems.length == 0) {
    cartList.innerHTML = getEmptyCart();
    let buttonArea = document.getElementById("order_actions");
    if (buttonArea) buttonArea.innerHTML = "";
    return;
  }

  cartList.innerHTML = "";
  for (let i = 0; i < cartItems.length; i++) {
    cartList.innerHTML += getCartItem(i);
  }

  let buttonArea = document.getElementById("order_actions");
  if (buttonArea) buttonArea.innerHTML = getOrderActions();
}

// === MOBILER DIALOG-WARENKORB RENDERN ===
function renderCartDialog() {
  let cartListDialog = document.getElementById("cart_list_dialog");
  if (!cartListDialog) return;

  if (cartItems.length == 0) {
    cartListDialog.innerHTML = getEmptyCart();
    let buttonAreaDialog = document.getElementById("order_actions_dialog");
    if (buttonAreaDialog) buttonAreaDialog.innerHTML = "";
    return;
  }

  cartListDialog.innerHTML = "";
  for (let i = 0; i < cartItems.length; i++) {
    cartListDialog.innerHTML += getCartItem(i);
  }

  let buttonAreaDialog = document.getElementById("order_actions_dialog");
  if (buttonAreaDialog) buttonAreaDialog.innerHTML = getOrderActions();
}

// === ZUSAMMENFASSUNG RENDERN ===
function renderCartSummary() {
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal = subtotal + cartItems[i].price * cartAmounts[i];
  }

  let shipping = cartItems.length > 0 ? 5 : 0;
  let total = subtotal + shipping;

  let cartCosts = document.getElementById("cart_costs");
  if (cartCosts) {
    cartCosts.innerHTML =
      getCartSummary(subtotal, shipping, total) +
      (orderPlaced ? getOrderSuccess() : "");
  }

  let cartCostsDialog = document.getElementById("cart_costs_dialog");
  if (cartCostsDialog) {
    cartCostsDialog.innerHTML =
      getCartSummary(subtotal, shipping, total) +
      (orderPlaced ? getOrderSuccess() : "");
  }

  updateMobileCartButton(total);
}

// === HILFE: INDEX NACH ID FINDEN ===
function findCartIndexById(id) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == id) return i;
  }
  return -1;
}

// === ARTIKEL HINZUFÜGEN ===
function addToCart(menuIndex) {
  orderPlaced = false;
  let item = menuItems[menuIndex];
  let existingItemIndex = findCartIndexById(item.id);

  if (existingItemIndex == -1) {
    cartItems.push({ id: item.id, name: item.name, price: item.price });
    cartAmounts.push(1);
  } else {
    cartAmounts[existingItemIndex] = cartAmounts[existingItemIndex] + 1;
  }

  saveAndRenderAll();
}

// === MENGE ERHÖHEN/VERRINGERN/ENTFERNEN ===
function increaseAmount(cartIndex) {
  if (cartIndex < 0 || cartIndex >= cartAmounts.length) return;
  cartAmounts[cartIndex] = cartAmounts[cartIndex] + 1;
  saveAndRenderAll();
}

function decreaseAmount(cartIndex) {
  if (cartIndex < 0 || cartIndex >= cartAmounts.length) return;

  if (cartAmounts[cartIndex] > 1) {
    cartAmounts[cartIndex] = cartAmounts[cartIndex] - 1;
    saveAndRenderAll();
  } else {
    removeFromCart(cartIndex);
  }
}

function removeFromCart(cartIndex) {
  if (cartIndex < 0 || cartIndex >= cartItems.length) return;
  cartItems.splice(cartIndex, 1);
  cartAmounts.splice(cartIndex, 1);
  saveAndRenderAll();
}

// === BESTELLEN ===
function placeOrder() {
  if (cartItems.length == 0) return;
  // Erfolg anzeigen UND Warenkorb leeren (Desktop + Dialog)
  orderPlaced = true;
  cartItems = [];
  cartAmounts = [];
  saveAndRenderAll();
}

// === MOBILER DIALOG ===
function showCart() {
  let dlg = document.getElementById("cart_dialog");
  if (dlg && typeof dlg.showModal == "function") {
    dlg.showModal();
  }
}

function closeCart() {
  let dlg = document.getElementById("cart_dialog");
  if (dlg && typeof dlg.close == "function") {
    dlg.close();
  }
}

// === MOBILER BUTTON TEXT ===
function updateMobileCartButton(total) {
  let btn = document.getElementById("open_cart_btn");
  if (!btn) return;

  let count = 0;
  for (let i = 0; i < cartAmounts.length; i++) {
    count = count + cartAmounts[i];
  }

  if (total == undefined) {
    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      subtotal = subtotal + cartItems[i].price * cartAmounts[i];
    }
    let shipping = cartItems.length > 0 ? 5 : 0;
    total = subtotal + shipping;
  }

  if (count > 0) {
    btn.textContent = "Warenkorb (" + count + ") • " + total.toFixed(2) + " €";
  } else {
    btn.textContent = "Warenkorb";
  }
}

// === SPEICHERN + RENDERN ===
function saveAndRenderAll() {
  saveToStorage();
  renderCartDesktop();
  renderCartDialog();
  renderCartSummary();
}
