import { addClass, removeClass } from "./global.js"; 

const body = document.body;
const headerElement = document.querySelector(".header");

headerElement.addEventListener("click", e => {
    const target = e.target;

    if (target.classList.contains("header__toggle")) {
        toggleTheme();
    }
});

export async function loadHeader() {
    const response = await fetch("./header.html")
    const headerElements = await response.text()

    headerElement.innerHTML = headerElements;
}

function toggleTheme() {
    const isDarkMode = document.body.classList.contains("darkMode");

    if (isDarkMode) {
        removeClass("darkMode", body);
    } else {
        addClass("darkMode", body);
    }
}