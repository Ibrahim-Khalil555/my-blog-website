document.addEventListener('DOMContentLoaded', () => {
  const isLogedIn = JSON.parse(localStorage.getItem("isLogedIn"));

  const hambargerIcon = document.getElementById("mobile-menu-icon");
  const hambargerMenu = document.getElementById("mobile-menu-bar");

  const profileIcon = document.getElementById("profile-icon");
  const profileBar = document.getElementById("profile-bar");
  
  const loginButtonDesktop = document.getElementById("desktop-login-button");
  const loginButtonMobileTab = document.getElementById("mobile-tab-login-button");

  const logoutButton = document.getElementById("logout-button");

  function loginButtonForDesktop(removeValue, addValue) {
    loginButtonDesktop.classList.remove(removeValue);
    loginButtonDesktop.classList.add(addValue);
  }

  function loginButtonForMobileTab(removeValue, addValueue) {
    loginButtonMobileTab.classList.remove(removeValue);
    loginButtonMobileTab.classList.add(addValueue);
  }

  /* Show Menu-Bar in Mobile and Tablet Version */
  hambargerIcon.addEventListener("click", function() {
    hambargerMenu.classList.toggle("display-visible-flex");
  });
  
  /* Show Profile-Bar in All Version (Mobile, Tablet and Desktop) */
  profileIcon.addEventListener("click", function() {
    profileBar.classList.toggle("display-visible-flex");
  });

  /* Hide Login-Button After Successfully Log In */  
  if(isLogedIn) {
    loginButtonForDesktop("login-button", "display-none");
    loginButtonForMobileTab("mobile-menu-bar-login-button", "display-none");

    profileIcon.classList.add("profile-icon");
  }
  
  else {
    loginButtonForDesktop("display-none", "login-button");
    loginButtonForMobileTab("display-none", "mobile-menu-bar-login-button");

    profileIcon.classList.remove("profile-icon");
    profileIcon.classList.add("display-none");
  }
  
  /* Logout Button */
  logoutButton.addEventListener("click", function(){
    profileIcon.classList.remove("profile-icon");
    profileIcon.classList.add("display-none");
    profileBar.classList.remove("display-visible-flex");
    profileBar.classList.add("display-none");
    
    loginButtonForDesktop("display-none", "login-button");
    loginButtonForMobileTab("display-none", "mobile-menu-bar-login-button");
    
    localStorage.setItem("isLogedIn", JSON.stringify(false));
  
  });
});

