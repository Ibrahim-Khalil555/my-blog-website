document.addEventListener("DOMContentLoaded", () => {
  let loggedInId = JSON.parse(localStorage.getItem("loggedInId"));

  const title = document.getElementById("post-title");
  const slug = document.getElementById("post-slug");
  const slugMeassage = document.getElementById("slug-meassage");
  const category = document.getElementById("category");
  const message = document.getElementById("message");
  const saveButton = document.getElementById("save-button");

  const date = new Date();

  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const currentDate = month + " " + day + ", " + year;

  const editor = SUNEDITOR.create("sunEditor", {
    width: "100%",
    height: "700px",
    overflow: "auto",
    buttonList: [
      ["undo", "redo"],
      ["bold", "italic", "underline"],
      ["list", "align", "link", "image", "video"],
      ["removeFormat"],
    ],
  });

  let profilePicValue = "";
  if (loggedInId) {
    if (loggedInId.profilePic && loggedInId.profilePic.trim() !== "") {
      profilePicValue = loggedInId.profilePic;
    } else if (loggedInId.name) {
      profilePicValue = loggedInId.name.substring(0, 2).toUpperCase();
    }
  }

  const fileInput = document.getElementById("fileInput");
  const previewImage = document.getElementById("previewImage");
  const uploadText = document.getElementById("uploadText");

  let featuredImage = "";
  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
        featuredImage = e.target.result;

        previewImage.classList.add("show");
        uploadText.classList.add("hidden");
      };

      reader.readAsDataURL(file);
    }
  });

  slug.addEventListener("input", () => {
    const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    const findSlug = blogPosts.find((post) => post.slug === slug.value);

    if (findSlug) {
      slugMeassage.innerText = "Slug matched, try another one!";
      slugMeassage.classList.add("slug-meassage");
      saveButton.disabled = true;
    } else {
      saveButton.disabled = false;
      slugMeassage.innerText = "";
    }
  });

  const saveData = (
    featuredImage,
    title,
    slug,
    content,
    category,
    userName,
    profilePic,
    date
  ) => {
    const post = {
      featuredImage,
      title,
      content,
      slug,
      category,
      userName,
      profilePic,
      date,
    };

    const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    blogPosts.push(post);

    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

    message.innerText = "Post created successfully.";
    message.classList.remove("text-color-red");
    message.classList.add("text-color-green");
  };

  saveButton.addEventListener("click", () => {
    if (
      featuredImage !== "" &&
      title.value !== "" &&
      slug.value !== "" &&
      category.value !== "Select option"
    ) {
      const content = editor.getContents();

      saveData(
        featuredImage,
        title.value,
        slug.value,
        content,
        category.value,
        loggedInId.name,
        profilePicValue,
        currentDate
      );
    } else {
      message.innerText = "Can't submit with empty field!";
      message.classList.add("text-color-red");
    }
  });
});
