const SEARCH_BTN = document.getElementById('search-btn')
const USER_REQUEST = document.getElementById('search-bar')
let history = JSON.parse(window.localStorage.getItem('history')) || []

function openTab(query){
    let URL = `https://developer.mozilla.org/fr/search?q=${query}&locale=fr&locale=en-US`
    window.open(URL,'_blank')
}

function addToHistory(query){
    if (history.length >= 10){
        history.shift()
    }

    history.push(query)
    window.localStorage.setItem('history', JSON.stringify(history))
}

SEARCH_BTN.addEventListener('click', () => {
    let USER_VALUE = USER_REQUEST.value
    openTab(USER_VALUE)
    addToHistory(USER_VALUE)
})

USER_REQUEST.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let USER_VALUE = USER_REQUEST.value
        openTab(USER_VALUE)
        addToHistory(USER_VALUE)
    }})
