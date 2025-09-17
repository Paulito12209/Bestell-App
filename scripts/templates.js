
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