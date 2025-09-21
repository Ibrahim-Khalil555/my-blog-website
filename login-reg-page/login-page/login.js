document.addEventListener('DOMContentLoaded', () => {

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const loginErrorMessage = document.getElementById("login-error-message");

    
function checkFields() {
  if ((email.value.trim() !== "") && (password.value.trim() !== "")) {
    loginButton.disabled = false;
  }
  else {
    loginButton.disabled = true;
  }

  if ((email.value.trim() === "") || (password.value.trim() === "")) {
  removeErrorMessage();
  }
}

function removeErrorMessage() {
  loginErrorMessage.innerHTML = "";
}

email.addEventListener("input", checkFields);
password.addEventListener("input", checkFields);
    
    
loginButton.addEventListener("click", function(e) {
        
  e.preventDefault();
        
  const userData = JSON.parse(localStorage.getItem("userData"));  
  const foundUser = userData.find(user => user.email === email.value.trim() && user.password === password.value.trim());
           
  if(foundUser) {
    localStorage.setItem("isLogedIn", JSON.stringify(true));
    localStorage.setItem("loggedInId", JSON.stringify(foundUser));
    window.location.href = "../../home.html";
  }
  else {
    loginErrorMessage.innerHTML = "Login failed. Try again!";
  }

    
});

});