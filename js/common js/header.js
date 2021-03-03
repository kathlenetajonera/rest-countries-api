import { toggleTheme } from "./global.js"; 

const headerElement = document.querySelector(".header");

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

export { loadHeader }