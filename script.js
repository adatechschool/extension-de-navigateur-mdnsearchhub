const SEARCH_BTN = document.getElementById("search-btn");
const SEARCH_BAR = document.getElementById("search-bar");
SEARCH_BAR.focus();
const DEL_BTN = document.getElementById("delete-history")

function openTab(query) {
  let URL = `https://developer.mozilla.org/fr/search?q=${query}&locale=fr&locale=en-US`;
  window.open(URL, "_blank");
}

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

FAV_BTN.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTabUrl = tabs[0].url;

    getFavName(activeTabUrl);

    createFav();
    addToFav();
  });
});

DEL_BTN.addEventListener("click",removeHistory)