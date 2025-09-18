// === TEMPLATE FUNKTIONEN ===
function getMenuItem(menuIndex) {
  return `
    <div class="menu_container">
      <div class="menu_box">
        <div class="menu_info">
          <h3>${menuItems[menuIndex].name}</h3>
          <p>${menuItems[menuIndex].description}</p>
          <p class="menu_price">${menuItems[menuIndex].price.toFixed(2)} €</p>
        </div>
        <!-- Orange + Button oben rechts der Karte -->
        <button onclick="addToCart(${menuIndex})">+</button>
      </div>
    </div>
  `;
}

function getCartItem(cartIndex) {
  return `
    <div>
      <h3>${cartItems[cartIndex].name}</h3>
      <div class="cart_options">
        <div class="cart_buttons">
          <button onclick="decreaseAmount(${cartIndex})"><img src="assets/icons/remove.png" alt="-" /></button>
          <p>${cartAmount[cartIndex]}</p>
          <button onclick="increaseAmount(${cartIndex})"><img src="assets/icons/add.png" alt="+" /></button>
        </div>
        <div class="cart_buttons">
          <p>${(cartItems[cartIndex].price * cartAmount[cartIndex]).toFixed(2)} €</p>
          <button onclick="removeFromCart(${cartIndex})"><img src="assets/icons/trash-can.png" alt="entfernen" /></button>
        </div>
      </div>
    </div>
  `;
}