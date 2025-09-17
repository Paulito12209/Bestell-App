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
  let items = JSON.parse(localStorage.getItem("cartItems"));
  let Amount = JSON.parse(localStorage.getItem("cartItems"));
  if (items && Amount) {
    cartItems = items;
    cartAmount = Amount;
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
    sumSubTotal += cartItems[menuItemsIndex].price * cartAmount[menuItemsIndex];
  }

  let deliveryCost = 5.0;
  let sumTotal = sumSubTotal + deliveryCost;
  let subTotal = document.getElementById("sumSubTotal");
  let total = document.getElementById("total")

  if(subTotal) subTotal.innerHTML = sumSubTotal.toFixed(2) +"€";
  if(total) total.innerHTML = sumTotal.toFixed(2) +"€";
}
// - DIALOG ÖFFNEN
