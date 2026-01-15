document.addEventListener("DOMContentLoaded", () => {
  let loggedInId = JSON.parse(localStorage.getItem("loggedInId"));
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const oldPassword = document.getElementById("old-password");
  const newPassword = document.getElementById("new-password");
  const save = document.getElementById("saveButton");
  const message = document.getElementById("message");

  const fileInput = document.getElementById("fileInput");
  const previewImage = document.getElementById("previewImage");
  const uploadIcon = document.getElementById("uploadIcon");

  let profilePic = "";
  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
        profilePic = e.target.result;

        previewImage.classList.add("show");
        uploadIcon.classList.add("hidden");
      };

      reader.readAsDataURL(file);
    }
  });

  if (loggedInId) {
    if (loggedInId.profilePic) {
      previewImage.classList.add("show");
      previewImage.src = loggedInId.profilePic;
    }
    name.value = loggedInId.name;
    email.value = loggedInId.email;
    oldPassword.value = loggedInId.password;
    newPassword.value = loggedInId.password;
  }

  save.addEventListener("click", function (e) {
    e.preventDefault();
    const updatedUser = {
      name: name.value.trim(),
      email: email.value.trim(),
      password: newPassword.value.trim(),
      profilePic: profilePic,
    };

    const users = JSON.parse(localStorage.getItem("userData"));
    const updatedUsers = users.map((user) =>
      user.email === loggedInId.email ? updatedUser : user
    );

    localStorage.setItem("userData", JSON.stringify(updatedUsers));

    localStorage.setItem("loggedInId", JSON.stringify(updatedUser));

    loggedInId = updatedUser;
    name.value = loggedInId.name;
    email.value = loggedInId.email;
    oldPassword.value = loggedInId.password;
    newPassword.value = loggedInId.password;

    message.innerHTML = "Profile updated successfully!";
  });
});
