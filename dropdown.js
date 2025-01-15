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