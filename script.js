// === INIT FUNKTION ===
function init() {
  renderMenuItems();
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

// - RENDER FUNKTION: WARENKORB?

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
                <button>+</button>
              </div>
            </div>`;
}

// - LÖSCHEN FUNKTION

// - RECHNEN

// - DIALOG ÖFFNEN
