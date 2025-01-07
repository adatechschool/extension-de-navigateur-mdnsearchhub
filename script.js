const SEARCH_BTN = document.getElementById('search-btn')
const USER_REQUEST = document.getElementById('search-bar')

SEARCH_BTN.addEventListener('click', () => {
    let USER_VALUE = USER_REQUEST.value 
    let URL = `https://developer.mozilla.org/fr/search?q=${USER_VALUE}&locale=fr&locale=en-US`
    window.open(URL,'_blank')
})

USER_REQUEST.addEventListener('keydown', function(evenement) {
    if (evenement.key === 'Enter') {
        let USER_VALUE = USER_REQUEST.value 
        let URL = `https://developer.mozilla.org/fr/search?q=${USER_VALUE}&locale=fr&locale=en-US`
        window.open(URL,'_blank')
    }})
