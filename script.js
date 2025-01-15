const SEARCH_BTN = document.getElementById("search-btn");
const SEARCH_BAR = document.getElementById("search-bar");
SEARCH_BAR.focus();


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

function showConfirmation(message) {
  const confirmationDiv = document.getElementById("confirmation-message");
  let confirmationMessage = document.createElement('p')
  confirmationDiv.appendChild(confirmationMessage)
  confirmationMessage.classList.add('confirmation')
  confirmationMessage.textContent = message;
  setTimeout(() => {
    confirmationMessage.remove();
  }, 3000);
}