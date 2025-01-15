let history = JSON.parse(window.localStorage.getItem("history")) || [];

function addToHistory(query) {
    if (history.length >= 10) {
      history.shift();
    }
  
    history.push(query);
    window.localStorage.setItem("history", JSON.stringify(history));
  }

function createHistory() {
    const HISTORY_CONTAINER = document.getElementById("history-container");
    let ulElement = document.getElementById('history-list');
  
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

function removeHistory(){
  history = []
  document.getElementById('history-list').innerHTML = ''
  window.localStorage.removeItem("history")
}

createHistory();