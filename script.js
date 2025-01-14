const SEARCH_BTN = document.getElementById("search-btn");
const SEARCH_BAR = document.getElementById("search-bar");
SEARCH_BAR.focus();

let history = JSON.parse(window.localStorage.getItem("history")) || [];

function openTab(query) {
  let URL = `https://developer.mozilla.org/fr/search?q=${query}&locale=fr&locale=en-US`;
  window.open(URL, "_blank");
}

function addToHistory(query) {
  if (history.length >= 10) {
    history.shift();
  }

  history.push(query);
  window.localStorage.setItem("history", JSON.stringify(history));
}

const dropdown = document.querySelector(".dropdown");
const blockLinks = document.querySelector(".bloc-links");
const btnDrop = document.querySelector(".btn-top");

let isOpen = false; // Indicateur pour vérifier l'état du dropdown

btnDrop.addEventListener("click", toggleDropDown);

function toggleDropDown() {
  if (!isOpen) {
    blockLinks.style.height = `${blockLinks.scrollHeight}px`;
    isOpen = true;
  } else {
    blockLinks.style.height = "0";
    isOpen = false;
  }
}

function createHistory() {
  const HISTORY_CONTAINER = document.getElementById("history-container");
  let ulElement = document.createElement("ul");

  history.forEach((item) => {
    let link = document.createElement("a");
    let url = `https://developer.mozilla.org/fr/search?q=${item}&locale=fr&locale=en-US`;
    let liElement = document.createElement("li");
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.innerHTML = item;
    liElement.appendChild(link);
    ulElement.appendChild(liElement);
    HISTORY_CONTAINER.appendChild(ulElement);
  });
}

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

function eventHandler() {
  let USER_REQUEST = SEARCH_BAR.value;
  if (USER_REQUEST) {
    openTab(USER_REQUEST);
    addToHistory(USER_REQUEST);
  }
}

SEARCH_BTN.addEventListener("click", eventHandler);

SEARCH_BAR.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    eventHandler();
  }
});

createHistory();

function showConfirmation(message) {
  const confirmationMessage = document.getElementById("confirmation-message");
  confirmationMessage.textContent = message;
  setTimeout(() => {
    confirmationMessage.textContent = "";
  }, 2000);
}