const FAV_BTN = document.getElementById("addFav");
let favorites = JSON.parse(window.localStorage.getItem("favorites")) || [];

function addToFav() {
  window.localStorage.setItem("favorites", JSON.stringify(favorites));
}

function createFav() {
  const FAV_CONTAINER = document.getElementById("favorites");
  FAV_CONTAINER.innerHTML = "";
  let favList = document.createElement("ul");

  favorites.forEach((item) => {
    let fav = document.createElement("a");
    let favPoint = document.createElement("li");
    fav.setAttribute("href", window.localStorage.getItem(item));
    fav.setAttribute("target", "_blank");
    fav.innerText = item;
    favPoint.appendChild(fav);
    favList.appendChild(favPoint);
    FAV_CONTAINER.appendChild(favList);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&times;";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      removeFavorite(item);
      showConfirmation("Favorite removed successfully");
    });
    favPoint.appendChild(deleteBtn);
  });
}

function getFavName(url) {
  let favName = prompt("How do you want to name this favorite ?");

  if (favName) {
    favorites.push(favName);
    window.localStorage.setItem(favName, url);
    showConfirmation("Favorite added successfully");
  }
}

function removeFavorite(query) {
  favorites = favorites.filter((item) => item !== query);
  window.localStorage.setItem("favorites", JSON.stringify(favorites));
  window.localStorage.removeItem(query)
  createFav();
}

FAV_BTN.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTabUrl = tabs[0].url;

    getFavName(activeTabUrl);

    createFav();
    addToFav();
  });
});

createFav();