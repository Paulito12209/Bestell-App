// === VARIABLEN ===
let cartItems = []; // Artikel im Warenkorb
let cartAmounts = []; // Mengen passend zu cartItems

// === INIT FUNKTION ===
function init() {
  loadFromStorage();
  renderMenu();
  renderCartDesktop();
  renderCartDialog();
  renderCartSummary();
  updateMobileCartButton();
}

// === LOCAL STORAGE FUNKTIONEN ===
function saveToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartAmounts", JSON.stringify(cartAmounts));
}

function loadFromStorage() {
  let savedItems = localStorage.getItem("cartItems");
  let savedAmounts = localStorage.getItem("cartAmounts");

  // Standard: leere Arrays
  cartItems = [];
  cartAmounts = [];

  // Nur wenn Daten vorhanden sind
  if (savedItems && savedAmounts) {
    let items = JSON.parse(savedItems);
    let amounts = JSON.parse(savedAmounts);

    // Sicherheitscheck: beide Arrays müssen gleich lang sein
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

// === WARENKORB DESKTOP RENDERN ===
function renderCartDesktop() {
  let cartList = document.getElementById("cart_list");
  if (!cartList) return;

  cartList.innerHTML = "";

  if (cartItems.length == 0) {
    cartList.innerHTML =
      '<div class="empty_cart">Dein Warenkorb ist leer.</div>';

    let actions = document.getElementById("order_actions");
    if (actions) {
      actions.innerHTML = "";
    }
    return;
  }

  for (let i = 0; i < cartItems.length; i++) {
    cartList.innerHTML += getCartItem(i);
  }

  let actions = document.getElementById("order_actions");
  if (actions) {
    actions.innerHTML = `
      <div class="cart_divider"></div>
      <div class="cart_buttons paddings">
        <button onclick="placeOrder()">Bestellen</button>
      </div>
    `;
  }
}

// === WARENKORB DIALOG (MOBIL) RENDERN ===
function renderCartDialog() {
  let cartListDialog = document.getElementById("cart_list_dialog");
  if (!cartListDialog) return;

  cartListDialog.innerHTML = "";

  if (cartItems.length == 0) {
    cartListDialog.innerHTML =
      '<div class="empty_cart">Dein Warenkorb ist leer.</div>';

    let actionsDialog = document.getElementById("order_actions_dialog");
    if (actionsDialog) {
      actionsDialog.innerHTML = "";
    }
    return;
  }

  for (let i = 0; i < cartItems.length; i++) {
    cartListDialog.innerHTML += getCartItem(i);
  }

  let actionsDialog = document.getElementById("order_actions_dialog");
  if (actionsDialog) {
    actionsDialog.innerHTML = `
      <div class="cart_divider"></div>
      <div class="cart_buttons paddings">
        <button onclick="placeOrder()">Bestellen</button>
      </div>
    `;
  }
}

// === WARENKORB ZUSAMMENFASSUNG RENDERN ===
function renderCartSummary() {
  let subtotal = 0;

  // Zwischensumme berechnen
  for (let i = 0; i < cartItems.length; i++) {
    subtotal = subtotal + cartItems[i].price * cartAmounts[i];
  }

  // Lieferkosten: 5€ wenn Warenkorb nicht leer, sonst 0€
  let shipping = 0;
  if (cartItems.length > 0) {
    shipping = 5;
  }

  let total = subtotal + shipping;

  // HTML für Zusammenfassung
  let summaryHTML = `
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

  // Desktop Warenkorb aktualisieren
  let cartCosts = document.getElementById("cart_costs");
  if (cartCosts) {
    cartCosts.innerHTML = summaryHTML;
  }

  // Dialog Warenkorb aktualisieren
  let cartCostsDialog = document.getElementById("cart_costs_dialog");
  if (cartCostsDialog) {
    cartCostsDialog.innerHTML = summaryHTML;
  }

  // Mobilen Button aktualisieren
  updateMobileCartButton(total);
}

// === ARTIKEL ZUM WARENKORB HINZUFÜGEN ===
function addToCart(menuIndex) {
  let item = menuItems[menuIndex];
  let found = -1;

  // Suchen ob Artikel schon im Warenkorb ist
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == item.id) {
      found = i;
      break;
    }
  }

  if (found == -1) {
    // Neuer Artikel: hinzufügen
    cartItems.push({
      id: item.id,
      name: item.name,
      price: item.price
    });
    cartAmounts.push(1);
  } else {
    // Artikel existiert: Menge erhöhen
    cartAmounts[found] = cartAmounts[found] + 1;
  }

  saveAndUpdate();
}

// === MENGE ERHÖHEN ===
function increaseAmount(cartIndex) {
  if (cartIndex >= 0 && cartIndex < cartAmounts.length) {
    cartAmounts[cartIndex] = cartAmounts[cartIndex] + 1;
    saveAndUpdate();
  }
}

// === MENGE VERRINGERN ===
function decreaseAmount(cartIndex) {
  if (cartIndex >= 0 && cartIndex < cartAmounts.length) {
    if (cartAmounts[cartIndex] > 1) {
      cartAmounts[cartIndex] = cartAmounts[cartIndex] - 1;
    } else {
      // Bei Menge 1: komplett entfernen
      removeFromCart(cartIndex);
      return;
    }
    saveAndUpdate();
  }
}

// === ARTIKEL KOMPLETT ENTFERNEN ===
function removeFromCart(cartIndex) {
  if (cartIndex >= 0 && cartIndex < cartItems.length) {
    cartItems.splice(cartIndex, 1);
    cartAmounts.splice(cartIndex, 1);
    saveAndUpdate();
  }
}

// === SPEICHERN UND ALLES AKTUALISIEREN ===
function saveAndUpdate() {
  saveToStorage();
  renderCartDesktop();
  renderCartDialog();
  renderCartSummary();
}

// === BESTELLUNG AUFGEBEN ===
function placeOrder() {
  let actions = document.getElementById("order_actions");
  if (!actions) {
    actions = document.getElementById("order_actions_dialog");
  }
  if (actions) {
    actions.insertAdjacentHTML("afterbegin", getOrderSuccess());
  }
}

// === WARENKORB ANZEIGEN (MOBIL) ===
function showCart() {
  let cartDialog = document.getElementById("cart_dialog");
  let isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    if (cartDialog && !cartDialog.open) {
      renderCartDialog();
      cartDialog.showModal();
    }
  } else {
    // Desktop: zum Warenkorb scrollen
    let cartContainer = document.querySelector(".cart_container");
    if (cartContainer) {
      cartContainer.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// === WARENKORB SCHLIESSEN (MOBIL) ===
function closeCart() {
  let cartDialog = document.getElementById("cart_dialog");
  if (cartDialog && cartDialog.open) {
    cartDialog.close();
  }
}

// === MOBILEN WARENKORB-BUTTON AKTUALISIEREN ===
function updateMobileCartButton(total) {
  let cartButton = document.getElementById("open_cart_btn");
  if (!cartButton) return;

  if (typeof total !== "number") {
    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      subtotal = subtotal + cartItems[i].price * cartAmounts[i];
    }
    total = subtotal + (cartItems.length > 0 ? 5 : 0);
  }

  if (cartItems.length > 0) {
    cartButton.textContent = "Warenkorb · " + total.toFixed(2) + " €";
  } else {
    cartButton.textContent = "Warenkorb";
  }
}
