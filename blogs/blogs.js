document.addEventListener("DOMContentLoaded", () => {
  const loggedInId = JSON.parse(localStorage.getItem("loggedInId"));

  const viewAllPostButton = document.getElementById("view-all-post-button");

  const blogPosts = JSON.parse(localStorage.getItem("blogPosts"));
  const reversed = blogPosts.reverse();

  const showPost = document.getElementById("card-grid");

  function createElement(element, attribute, attributeValue, containerContent) {
    const container = document.createElement(element);
    container.setAttribute(attribute, attributeValue);
    container.innerHTML = containerContent;

    return container;
  }

  let renderedPosts = 0;

  function postRender(add) {
    let limitVisiblePosts = renderedPosts + add;

    reversed.some((post, index) => {
      if (index < renderedPosts) return false;

      if (index === limitVisiblePosts) {
        return true;
      } else {
        const postContainer = createElement("div", "class", "card", null);
        showPost.appendChild(postContainer);
        const postFeaturedImage = createElement(
          "img",
          "src",
          post.featuredImage,
          null
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
            "card-profile-pic",
            null
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

    if (renderedPosts >= reversed.length) {
      viewAllPostButton.classList.remove("view-all-post-button");
      viewAllPostButton.classList.add("display-none");
    }
  }

  postRender(9);

  viewAllPostButton.addEventListener("click", () => {
    postRender(3);
  });

  function onPostClick(post, slug) {
    post.addEventListener("click", () => {
      window.location.href = `../single-post/single-post.html?slug=${slug}`;
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

  const desktopMenuBarButton = document.getElementById("desktop-menu-bar-link");

  desktopMenuBarButton.classList.add("on-click-desktop-menu-bar-link");
});
