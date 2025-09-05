
const regButton = document.getElementById("regButton");

regButton.addEventListener("click", function(e){

    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;

    if(name == "" || email == "" || password == "" || confirmPassword == "") {
        document.getElementById("reg-message").innerHTML = "Invalid attempt. Try again!";
        return;
    }

    if(!(email.includes("@") && email.includes(".com"))) {
        document.getElementById("reg-message").innerHTML = "Email is not valid!";
        return;
    }

    if(password !== confirmPassword) {
        document.getElementById("reg-message").innerHTML = "Password doesn't matched!";
        return;
    }


    const newUser = {
        name,
        email,
        password
    };

    const users = JSON.parse(localStorage.getItem("userData")) || [];

    const preLength = users.length;

    users.push(newUser);

    const afterLength = users.length
    
    if(preLength < afterLength) {
        document.getElementById("reg-message").innerHTML = "Registration Successfull";
    }
    
    localStorage.setItem("userData", JSON.stringify(users));
});
