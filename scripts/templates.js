// === MENU TEMPLATES ===
function getMenuItem(menuIndex) {
  return `
    <div class="menu_container">
      <div class="menu_box">
        <div class="menu_info">
          <h3>${menuItems[menuIndex].name}</h3>
          <p>${menuItems[menuIndex].description}</p>
          <p class="menu_price">${menuItems[menuIndex].price.toFixed(2)} €</p>
        </div>
        <button aria-label="hinzufügen" onclick="addToCart(${menuIndex})">+</button>
      </div>
    </div>
  `;
}

// === CART TEMPLATES ===
function getCartItem(cartIndex) {
  return `
    <div>
      <h3>${cartItems[cartIndex].name}</h3>
      <div class="cart_options">
        <div class="cart_buttons">
          <button onclick="decreaseAmount(${cartIndex})"><img src="assets/icons/remove.png" alt="-" /></button>
          <p>${cartAmounts[cartIndex]}</p>
          <button onclick="increaseAmount(${cartIndex})"><img src="assets/icons/add.png" alt="+" /></button>
        </div>
        <div class="cart_buttons">
          <p>${(cartItems[cartIndex].price * cartAmounts[cartIndex]).toFixed(
            2
          )} €</p>
          <button onclick="removeFromCart(${cartIndex})"><img src="assets/icons/trash-can.png" alt="entfernen" /></button>
        </div>
      </div>
    </div>
  `;
}

function getEmptyCart() {
  return '<div class="empty_cart">Dein Warenkorb ist leer.</div>';
}

function getCartSummary(subtotal, shipping, total) {
  return `
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

function getOrderActions() {
  return `
    <div class="cart_divider"></div>
    <div class="cart_buttons paddings">
      <button onclick="placeOrder()">Bestellen</button>
    </div>
  `;
}

function getOrderSuccess() {
  return `
    <div id="order_success" class="order_success" role="status">
      Deine Testbestellung wurde aufgenommen. Vielen Dank!
    </div>
  `;
}
