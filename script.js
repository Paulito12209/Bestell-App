// === VARIABLEN ===
let menuItemsIndex = 0;
let cartItems = [];
let cartAmount = [];

// === INIT FUNKTION ===
function init() {
  renderMenuItems();
  renderCart();
}

// - RENDER FUNKTION: GERICHTE
function renderMenuItems() {
  let menuListRef = document.getElementById("menu_list");
  menuListRef.innerHTML = "";

  for (
    let menuItemsIndex = 0;
    menuItemsIndex < menuItems.length;
    menuItemsIndex++
  ) {
    menuListRef.innerHTML += getMenuItem(menuItemsIndex);
  }
}

// - RENDER FUNKTION: WARENKORB
function renderCart() {
  let cartListRef = document.getElementById("cart_list");
  cartListRef.innerHTML = "";

  for (
    let menuItemsIndex = 0;
    menuItemsIndex < cartItems.length;
    menuItemsIndex++
  ) {
    cartListRef.innerHTML += getCartItem(menuItemsIndex);
  }
}

// - LÖSCHEN FUNKTION

// - RECHNEN

// - DIALOG ÖFFNEN
