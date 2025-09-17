// Variablen festlegen

// FUNKTIONEN:
// - INIT FUNKTION
function init(){

}

// - RENDER FUNKTION: GERICHTE
function renderMenuItems() {
  let menuRef = document.getElementById("gallery_content");
  menuRef.innerHTML = "";

  for (let i = 0; i < menu.length; i++) {
    menuRef.innerHTML += getMenuItem(i);
  }
}

// - RENDER FUNKTION: WARENKORB?

// - TEMPLATES

// - LÖSCHEN FUNKTION

// - RECHNEN

// - DIALOG ÖFFNEN