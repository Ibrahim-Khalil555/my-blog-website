
const regButton = document.getElementById("regButton");

regButton.addEventListener("click", function(){
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;

    if(password !== confirmPassword) {
        alert("Password doesn't matched");
        return;
    }


    const newUser = {
        name,
        email,
        password
    };

    const users = JSON.parse(localStorage.getItem("userData")) || [];

    users.push(newUser);
    
    alert("Registration Successfull");
    
    localStorage.setItem("userData", JSON.stringify(users));
});
