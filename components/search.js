document.addEventListener("DOMContentLoaded", () => {
  const posts = JSON.parse(localStorage.getItem("blogPosts"));
  const searchInput = document.getElementById("search-input");
  const searchResultBar = document.getElementById("search-result");

  searchInput.addEventListener("input", () => {
    if (searchInput.value !== "") {
      searchResultBar.classList.remove("display-none");
    } else if (searchInput.value === "") {
      searchResultBar.classList.add("display-none");
    }

    searchResultBar.innerHTML = "";

    const searchInputValue = searchInput.value.toLowerCase();
    const filtered = posts.filter((post) => {
      const title = String(post.title || "");
      return title.toLowerCase().startsWith(searchInputValue);
    });

    filtered.forEach((result) => {
      const createTitle = document.createElement("p");
      createTitle.textContent = result.title;
      searchResultBar.appendChild(createTitle);

      onTitleClick(createTitle, result.slug);
    });
  });

  function onTitleClick(title, slug) {
    title.addEventListener("click", () => {
      window.location.href = `single-post/single-post.html?slug=${slug}`;
    });
  }
});
