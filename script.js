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

function eventHandler() {
  let USER_REQUEST = SEARCH_BAR.value;
  openTab(USER_REQUEST);
  addToHistory(USER_REQUEST);
}

SEARCH_BTN.addEventListener("click", eventHandler);

SEARCH_BAR.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    eventHandler();
  }
});

createHistory();
