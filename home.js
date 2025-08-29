/* Show Menu in Mobile Version */
const icon = document.querySelector(".mobile-menu-icon");
const menu = document.querySelector(".mobile-menu-bar");


icon.addEventListener("click", function() {
  if (menu.style.display === "none") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
});
