// === VARIABLEN ===
let menuItemsIndex = 0;
let cartItems = [];

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

// === TEMPLATE FUNKTIONEN ===
function getMenuItem(menuItemsIndex) {
  return `<div class="menu_container">
              <div class="menu_box">
                <div class="menu_info">
                  <h3>${menuItems[menuItemsIndex].name}</h3>
                  <p>${menuItems[menuItemsIndex].description}</p>
                  <p class="menu_price">${menuItems[
                    menuItemsIndex
                  ].price.toFixed(2)} €</p>
                </div>
                <!-- BUTTON ZUM HINZUFÜGEN -->
                <button onclick="renderCart()">+</button>
              </div>
            </div>`;
}

// - LÖSCHEN FUNKTION

// - RECHNEN

// - DIALOG ÖFFNEN
