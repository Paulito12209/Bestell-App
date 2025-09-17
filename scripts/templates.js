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
                <button onclick="addToCart(${menuItemsIndex})">+</button>
              </div>
            </div>`;
}

function getCartItem(menuItemsIndex) {
  return `<div>
            <h3>${cartItems[menuItemsIndex].name}</h3>
            <div class="cart_options">
                <div class="cart_buttons">
                    <button onclick="decreaseAmount(${menuItemsIndex})"><img src="assets/icons/remove.png" alt="" /></button>
                    <p>${cartAmount[menuItemsIndex]}</p>
                    <button onclick="increaseAmount(${menuItemsIndex})"><img src="assets/icons/add.png" alt="" /></button>
                </div>
                <div class="cart_buttons">
                    <p>${(
                      cartItems[menuItemsIndex].price *
                      cartAmount[menuItemsIndex]
                    ).toFixed(2)} €</p>
                    <button><img src="assets/icons/trash-can.png" alt="" /></button>
                </div>
            </div>
         </div>`;
}
