const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;

    if(password !== confirmPassword) {
        alert("Password doesn't matched");
        return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));

    const foundUser = userData.find(user => user.email === email && user.password === password);
        window.open("google.com");

    if(foundUser) {
        location.replace("google.com");
    }

    else
        alert("Login failed");
});