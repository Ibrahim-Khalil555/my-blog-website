document.addEventListener("DOMContentLoaded", () => {
  let loggedInId = JSON.parse(localStorage.getItem("loggedInId"));
  const isLogedIn = JSON.parse(localStorage.getItem("isLogedIn"));

  const hambargerIcon = document.getElementById("mobile-menu-icon");
  const hambargerMenu = document.getElementById("mobile-menu-bar");

  const profileIcon = document.getElementById("profile-icon");
  const profileBar = document.getElementById("profile-bar");
  const profilePic = document.getElementById("profile-pic");
  const profilePicAlternativeText = document.getElementById(
    "profile-pic-alternative-text"
  );

  if (loggedInId.profilePic) {
    profilePic.classList.add("display-visible-block");
    profilePic.src = loggedInId.profilePic;
  } else {
    profilePicAlternativeText.innerText = (
      loggedInId.name[0] + loggedInId.name[1]
    ).toUpperCase();
  }

  const loginButtonDesktop = document.getElementById("desktop-login-button");
  const loginButtonMobileTab = document.getElementById(
    "mobile-tab-login-button"
  );

  const logoutButton = document.getElementById("logout-button");

  function loginButtonForDesktop(removeValue, addValue) {
    loginButtonDesktop.classList.remove(removeValue);
    loginButtonDesktop.classList.add(addValue);
  }

  function loginButtonForMobileTab(removeValue, addValueue) {
    loginButtonMobileTab.classList.remove(removeValue);
    loginButtonMobileTab.classList.add(addValueue);
  }

  hambargerIcon.addEventListener("click", function () {
    hambargerMenu.classList.toggle("display-visible-flex");
  });

  profileIcon.addEventListener("click", function () {
    profileBar.classList.toggle("display-visible-flex");
  });

  if (isLogedIn) {
    loginButtonForDesktop("login-button", "display-none");
    loginButtonForMobileTab("mobile-menu-bar-login-button", "display-none");

    profileIcon.classList.add("profile-icon");
  } else {
    loginButtonForDesktop("display-none", "login-button");
    loginButtonForMobileTab("display-none", "mobile-menu-bar-login-button");

    profileIcon.classList.remove("profile-icon");
    profileIcon.classList.add("display-none");
  }

  logoutButton.addEventListener("click", function () {
    profileIcon.classList.remove("profile-icon");
    profileIcon.classList.add("display-none");
    profileBar.classList.remove("display-visible-flex");
    profileBar.classList.add("display-none");

    loginButtonForDesktop("display-none", "login-button");
    loginButtonForMobileTab("display-none", "mobile-menu-bar-login-button");

    localStorage.setItem("isLogedIn", JSON.stringify(false));
  });
});
