import { toggleTheme } from "./global.js"; 

const headerElement = document.querySelector(".header");
const footerElement = document.querySelector(".footer");

headerElement.addEventListener("click", e => {
    const target = e.target;

    if (target.classList.contains("header__toggle")) {
        toggleTheme();
    }
});

async function loadHeader() {
    const response = await fetch("common html/header.html")
    const headerElements = await response.text()

    headerElement.innerHTML = headerElements;
}

async function loadFooter() {
    const response = await fetch("common html/footer.html");
    const footerMarkup = await response.text()

    footerElement.innerHTML = footerMarkup;
}

export { loadHeader, loadFooter }