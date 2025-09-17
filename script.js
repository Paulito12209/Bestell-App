
// === VARIABLEN ===
let cartItems = [];
let cartAmount = [];

// === INIT FUNKTION ===
function init() {
  getFromLocalStorage();
  renderMenuItems();
  renderCart();
  updateCartCostSummary();
}

// === LOCAL STORAGE FUNKTIONEN ===
function saveToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartAmount", JSON.stringify(cartAmount));
}

function getFromLocalStorage() {
  if (JSON.parse(localStorage.getItem("cartItems")) != null) {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartAmount = JSON.parse(localStorage.getItem("cartItems"));
  }
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

// === WARENKORB FUNKTIONEN ===
function addToCart(ItemsIndex) {
  let menuItem = menuItems[ItemsIndex];

  let cartIndex = -1;
  for (
    let menuItemsIndex = 0;
    menuItemsIndex < cartItems.length;
    menuItemsIndex++
  ) {
    if (cartItems[menuItemsIndex].id == menuItem.id) {
      cartIndex = menuItemsIndex;
      break;
    }
  }

  if (cartIndex >= 0) {
    cartAmount[cartIndex]++;
  } else {
    cartItems.push(menuItem);
    cartAmount.push(1);
  }
  saveToLocalStorage();
  renderCart();
  updateCartCostSummary();
}

// === RECHNER FUNKTIONEN ===
function increaseAmount(cartIndex) {
  cartAmount[cartIndex]++;

  saveToLocalStorage();
  renderCart();
  updateCartCostSummary();
}

function decreaseAmount(cartIndex) {
  if (cartAmount[cartIndex] > 1) {
    cartAmount[cartIndex]--;
  } else {
    cartItems.splice(cartIndex, 1);
    cartAmount.splice(cartIndex, 1);
  }

  saveToLocalStorage();
  renderCart();
  updateCartCostSummary();
}

// === WARENKORB ANZEIGE ===
function updateCartCostSummary() {
  let sumSubTotal = 0;

  for (
    let menuItemsIndex = 0;
    menuItemsIndex < cartItems.length;
    menuItemsIndex++
  ) {
    sumSubTotal += cartItems[menuItemsIndex].price * cartAmount[i];
  }

  let deliveryCost = 5.0;
  let total = sumSubTotal + deliveryCost;

  document.getElementById("sumSubTotal").innerHTML =
    sumSubTotal.toFixed(2) + "€";
  document.getElementById("total").innerHTML = total.toFixed(2) + "€";
}
// - DIALOG ÖFFNEN
