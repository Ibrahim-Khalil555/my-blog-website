const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function(e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email == "" || password == "") {
        document.getElementById("login-message").innerHTML = "Try again!";
        return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));

    const foundUser = userData.find(user => user.email === email && user.password === password);

    if(foundUser) {
        localStorage.setItem("isLogedIn", JSON.stringify(true));
        window.location.href = "../../home.html";
    }

    else {
        document.getElementById("login-message").innerHTML = "Login failed. Try again!";
    }

});