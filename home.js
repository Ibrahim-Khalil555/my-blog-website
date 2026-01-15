document.addEventListener("DOMContentLoaded", () => {
  const posts = JSON.parse(localStorage.getItem("blogPosts"));
  const mobileSearchInput = document.getElementById("mobile-search-input");
  const mobileSearchResultBar = document.getElementById("mobile-search-result");

  mobileSearchInput.addEventListener("input", () => {
    if (mobileSearchInput.value !== "") {
      mobileSearchResultBar.classList.remove("display-none");
    } else if (mobileSearchInput.value === "") {
      mobileSearchResultBar.classList.add("display-none");
    }

    mobileSearchResultBar.innerHTML = "";

    const searchInputValue = mobileSearchInput.value.toLowerCase();
    const filtered = posts.filter((post) => {
      const title = String(post.title || "");
      return title.toLowerCase().startsWith(searchInputValue);
    });

    filtered.forEach((result) => {
      const createTitle = document.createElement("p");
      createTitle.textContent = result.title;
      mobileSearchResultBar.appendChild(createTitle);

      onTitleClick(createTitle, result.slug);
    });
  });

  function onTitleClick(title, slug) {
    title.addEventListener("click", () => {
      window.location.href = `single-post/single-post.html?slug=${slug}`;
    });
  }

  const desktopMenuBarButton = document.getElementById("desktop-menu-bar-link");
  desktopMenuBarButton.classList.add("on-click-desktop-menu-bar-link");
});
