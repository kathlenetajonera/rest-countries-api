export function addClass(className, elem) {
    if (elem.classList.length === 0) {
        elem.classList.add(className)
    } else {
        const blockName = elem.classList[0];

        elem.classList.add(`${blockName}--${className}`);
    }
}

export function removeClass(className, elem) {
    if (elem.classList.length === 1) {
        elem.classList.remove(className)
    } else {
        const blockName = elem.classList[0];

        elem.classList.remove(`${blockName}--${className}`);
    }
}
