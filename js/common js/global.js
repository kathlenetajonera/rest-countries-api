const body = document.body;
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const updateTheme = () => {
    const colorTheme = localStorage.getItem("mode");

    if (!colorTheme) {
        if (isDarkMode) {
            addClass("darkMode", body);
            saveColorScheme("dark");
        } else {
            saveColorScheme("light");
        }
    } else {
        if (colorTheme === "dark") {
            addClass("darkMode", body);
            saveColorScheme("dark");
        }
    }
}

const showLoading = (element) => {
    element.insertAdjacentHTML("beforebegin", `
    <div class="spinner"></div>
    `)
}

const hideLoading = (element) => {
    const loader = element.previousElementSibling;

    if (loader.classList.contains("spinner")) {
        loader.remove();
    }
}

function toggleTheme() {
    const isDarkMode = document.body.classList.contains("darkMode");

    if (isDarkMode) {
        removeClass("darkMode", body);
        saveColorScheme("light");
    } else {
        addClass("darkMode", body);
        saveColorScheme("dark");
    }
}

async function getData() {
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await response.json();

    return data;
}

function addClass(className, elem) {
    if (elem.classList.length === 0) {
        elem.classList.add(className)
    } else {
        const blockName = elem.classList[0];

        elem.classList.add(`${blockName}--${className}`);
    }
}

function removeClass(className, elem) {
    if (elem.classList.length === 1) {
        elem.classList.remove(className)
    } else {
        const blockName = elem.classList[0];

        elem.classList.remove(`${blockName}--${className}`);
    }
}

function saveSelectedCountry(country) {
    sessionStorage.setItem("selectedCountry", country)
}

function saveColorScheme(mode) {
    localStorage.setItem("mode", mode);
}

export { body, isDarkMode, updateTheme, showLoading, hideLoading, toggleTheme, getData, addClass, removeClass, saveSelectedCountry }