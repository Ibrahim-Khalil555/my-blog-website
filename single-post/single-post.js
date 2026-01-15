document.addEventListener("DOMContentLoaded", () => {
  const loggedInId = JSON.parse(localStorage.getItem("loggedInId"));

  const category = document.getElementById("category");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const date = document.getElementById("date");
  const featuredImage = document.getElementById("featuredImage");
  const content = document.getElementById("content");

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const slug = getQueryParam("slug");

  const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  const post = blogPosts.find((p) => p.slug === slug);

  if (post) {
    category.innerHTML = post.category;
    title.innerText = post.title;
    if (
      post.profilePic.startsWith("data:image") ||
      post.profilePic.endsWith(".jpg") ||
      post.profilePic.endsWith(".png")
    ) {
      const profilePic = document.createElement("img");
      profilePic.setAttribute("alt", "User Profile");
      profilePic.setAttribute("class", "card-profile-pic");
      profilePic.src = post.profilePic;
      author.appendChild(profilePic);
    } else {
      const profilePicAlterText = document.createElement("span");
      profilePicAlterText.setAttribute("class", "card-profile-text");

      profilePicAlterText.textContent = post.userName
        .substring(0, 2)
        .toUpperCase();
      author.appendChild(profilePicAlterText);
    }
    const userName = document.createElement("span");
    userName.setAttribute("class", "user-name");
    userName.textContent = post.userName;
    author.appendChild(userName);

    date.innerHTML = post.date;
    featuredImage.src = post.featuredImage;
    content.innerHTML = post.content;
  } else {
    document.getElementById("post-details").innerHTML =
      "<p>Post not found!</p>";
  }

  const CardProfilePic = document.querySelector(
    ".card-profile-pic, .card-profile-text"
  );
  const UserName = document.querySelector(".user-name");
  console.log(UserName);

  if (UserName.innerText === loggedInId.name) {
    CardProfilePic.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = `../my-profile-page/profile.html?user=${UserName.innerText}`;
    });

    UserName.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = `../my-profile-page/profile.html?user=${UserName.innerText}`;
    });
  }
});
