document.addEventListener("DOMContentLoaded", () => {
  const loggedInId = JSON.parse(localStorage.getItem("loggedInId"));
  const blogPosts = JSON.parse(localStorage.getItem("blogPosts"));
  const reversed = blogPosts.reverse();

  const selectCategory = document.getElementById("filter-by-category");
  const viewAllPostButton = document.getElementById("view-all-post-button");
  const showPost = document.getElementById("card-grid");

  function createElement(element, attribute, attributeValue, containerContent) {
    const container = document.createElement(element);
    container.setAttribute(attribute, attributeValue);
    container.innerHTML = containerContent;
    return container;
  }

  let renderedPosts = 0;

  function postRender(postsArray, add) {
    showPost.innerHTML = "";

    if (postsArray.length === 0) {
      showPost.innerHTML = "<p>No posts found for this category.</p>";
      return;
    }

    let limitVisiblePosts = renderedPosts + add;
    postsArray.some((post, index) => {
      if (index < renderedPosts) return false;

      if (index === limitVisiblePosts) {
        return true;
      } else {
        const postContainer = createElement("div", "class", "card", null);
        showPost.appendChild(postContainer);

        const postFeaturedImage = createElement(
          "img",
          "src",
          post.featuredImage
        );
        postContainer.appendChild(postFeaturedImage);

        const postCategory = createElement(
          "span",
          "class",
          "post-card-category",
          post.category
        );
        postContainer.appendChild(postCategory);

        const postTitle = createElement(
          "span",
          "class",
          "post-card-title",
          post.title
        );
        postContainer.appendChild(postTitle);

        const postProfileContainer = createElement(
          "span",
          "class",
          "card-profile",
          null
        );
        postContainer.appendChild(postProfileContainer);

        if (
          post.profilePic &&
          (post.profilePic.startsWith("data:image") ||
            post.profilePic.endsWith(".jpg") ||
            post.profilePic.endsWith(".png"))
        ) {
          const postProfilePic = createElement(
            "img",
            "class",
            "card-profile-pic"
          );
          postProfilePic.src = post.profilePic;
          postProfileContainer.appendChild(postProfilePic);
        } else {
          const postProfileText = createElement(
            "span",
            "class",
            "card-profile-text",
            post.profilePic
          );
          postProfileContainer.appendChild(postProfileText);
        }

        const postProfileUserName = createElement(
          "p",
          "class",
          "user-name",
          post.userName
        );
        postProfileContainer.appendChild(postProfileUserName);

        const postPublishedDate = createElement(
          "p",
          "class",
          "published-date",
          post.date
        );
        postProfileContainer.appendChild(postPublishedDate);

        onPostClick(postContainer, post.slug);
      }
    });

    renderedPosts = limitVisiblePosts;
  }

  selectCategory.addEventListener("change", () => {
    const selectedValue = selectCategory.value;

    if (selectedValue === "Categories") {
      postRender(reversed, 9);
      return;
    }

    const filtered = reversed.filter((post) => post.category === selectedValue);

    console.log(filtered);

    postRender(filtered, 9);
  });

  postRender(reversed, 9);

  function onPostClick(post, slug) {
    post.addEventListener("click", () => {
      window.location.href = `single-post/single-post.html?slug=${slug}`;
    });
  }

  const allCardProfilePic = document.querySelectorAll(
    ".card-profile-pic, .card-profile-text"
  );
  const allUserName = document.querySelectorAll(".user-name");

  allUserName.forEach((userName, index) => {
    const cardProfilePic = allCardProfilePic[index];

    if (userName.innerText === loggedInId.name) {
      cardProfilePic.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `../my-profile-page/profile.html?user=${userName.innerText}`;
      });

      userName.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `../my-profile-page/profile.html?user=${userName.innerText}`;
      });
    } else {
      cardProfilePic.addEventListener("click", (e) => e.stopPropagation());
      userName.addEventListener("click", (e) => e.stopPropagation());
    }
  });
});
