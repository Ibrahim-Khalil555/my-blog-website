/* Show Menu-Bar in Mobile Version */
const icon = document.querySelector(".mobile-menu-icon");
const menu = document.querySelector(".mobile-menu-bar");


icon.addEventListener("click", function() {
  if (menu.style.display === "none") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
});

/* Show Profile-Bar in All Version */
const profile_icon = document.querySelector(".profile-icon");
const profile_menu = document.querySelector(".profile-bar");


profile_icon.addEventListener("click", function() {
  if (profile_menu.style.display === "none") {
    profile_menu.style.display = "flex";
  } else {
    profile_menu.style.display = "none";
  }
});