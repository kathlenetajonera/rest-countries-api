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

export { getData, addClass, removeClass }