import * as header from "./header.js"; 
import * as global from "./global.js";

const filterSelection = document.querySelector(".filter");
const searchBar = document.querySelector(".search__field");
const mainContainer = document.querySelector("#main-container");
let searchedCountry;

header.loadHeader();
filterCountries("all");

filterSelection.addEventListener("click", e => {
    const clickedElement = e.target;
    const select = clickedElement.classList.contains("filter__custom-select");
    const option = clickedElement.classList.contains("filter__select-option");

    if (select) {
        toggleFilterSelection();
    } else if (option) {
        const allOptions = document.querySelectorAll(".filter__select-option");

        allOptions.forEach(option => option.setAttribute("data-selected", false));
        clickedElement.setAttribute("data-selected", true);

        filterCountries("region");
    }
})

searchBar.addEventListener("input", () => {
    searchedCountry = searchBar.value.toLowerCase();

    filterCountries("search");
})

mainContainer.addEventListener("click", e => {
    const countryCard = e.target.closest(".country--card");
    const countryName = countryCard.dataset.countryName;

    global.saveSelectedCountry(countryName);
    window.location = "/country-details.html";
})

function toggleFilterSelection() {
    const options = document.querySelector(".filter__select-options");
    const isOpen = options.classList.contains("filter__select-options--active");

    if (isOpen) {
        global.removeClass("active", options);
    } else {
        global.addClass("active", options);
    }
}

async function filterCountries(filterBy) {
    const data = await global.getData();

    switch (filterBy) {
        case "all":
            renderCountries(data);
            break;
            
        case "search":
            const searchedCountries = [];

            data.forEach(country => {
                const countryName = country.name;

                if (countryName.toLowerCase().indexOf(searchedCountry) !== -1) {
                    searchedCountries.push(country)
                }
            })

            renderCountries(searchedCountries);
            break;

        case "region":
            const filterValue = document.querySelector("[data-selected='true']").dataset.value;
            const filteredCountries = data.filter(country => country.region === filterValue);
            
            renderCountries(filteredCountries);
            break;
    }
}

function renderCountries(countries) {
    mainContainer.innerHTML = "";

    countries.map(country => {
        mainContainer.insertAdjacentHTML("beforeend", `
        
        <div class="country country--card" data-country-name="${country.name}">
            <img class="country__flag" src="${country.flag}" alt="${country.name}">

            <div class="country__details">
                <h2 class="country__name">${country.name}</h2>

                <div class="country__detail">Population:
                    <p class="country__data" id="population">${country.population}</p>
                </div>
                
                <div class="country__detail">Region:
                    <p class="country__data" id="region">${country.region}</p>
                </div>

                <div class="country__detail">Capital:
                    <p class="country__data" id="capital">${country.capital}</p>
                </div>
            </div>
        </div>        
        `)
    })
}