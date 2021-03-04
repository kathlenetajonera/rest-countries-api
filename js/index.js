import * as common from "./common js/header&footer.js"; 
import * as global from "./common js/global.js";

const filterSelection = document.querySelector(".filter");
const customSelect = document.querySelector(".filter__custom-select");
const filterOptions = document.querySelector(".filter__select-options");
const searchBar = document.querySelector(".search__field");
const countriesContainer = document.querySelector("#countries-container");
let searchedCountry;

common.loadHeader();
common.loadFooter();
global.updateTheme();

filterCountries("all");

global.body.addEventListener("click", e => {
    const target = e.target;
    const filterSelectionOpen = filterOptions.classList.contains("filter__select-options--active");

    if (filterSelectionOpen) {
        if (!target.classList.contains("filter__custom-select")) {
            global.removeClass("active", filterOptions);
        }
    }
})

filterSelection.addEventListener("click", e => {
    const clickedElement = e.target;
    const select = clickedElement.classList.contains("filter__custom-select");
    const option = clickedElement.classList.contains("filter__select-option");

    if (select) {
        toggleFilterSelection();
    } else if (option) {
        const allOptions = document.querySelectorAll(".filter__select-option");
        const optionValue = clickedElement.dataset.value;

        allOptions.forEach(option => option.setAttribute("data-selected", false));
        clickedElement.setAttribute("data-selected", true);

        customSelect.textContent = optionValue;
        filterCountries("region");

        //resets the search field
        searchBar.value = "";
    }
})

searchBar.addEventListener("input", () => {
    searchedCountry = searchBar.value.toLowerCase();

    filterCountries("search");

    //resets the search field
    customSelect.textContent = "Filter By Region";
})

countriesContainer.addEventListener("click", e => {
    const countryCard = e.target.closest(".country--card");
    const countryName = countryCard.dataset.countryName;

    global.saveSelectedCountry(countryName);
    window.location = "/country-details";
})

function toggleFilterSelection() {
    const isOpen = filterOptions.classList.contains("filter__select-options--active");

    if (isOpen) {
        global.removeClass("active", filterOptions);
    } else {
        global.addClass("active", filterOptions);
    }
}

async function filterCountries(filterBy) {

    countriesContainer.innerHTML = "";
    global.showLoading(countriesContainer);

    switch (filterBy) {
        case "all":
            const data = await global.getAllCountries();
            renderCountries(data);
            break;
            
        case "search":
            const allCountries = await global.getAllCountries();
            const searchedCountries = [];

            allCountries.forEach(country => {
                const countryName = country.name;

                if (countryName.toLowerCase().indexOf(searchedCountry) !== -1) {
                    searchedCountries.push(country)
                }
            })

            renderCountries(searchedCountries);
            break;

        case "region":
            const filterValue = document.querySelector("[data-selected='true']").dataset.value;
            const filteredCountries = await global.getCountriesByRegion(filterValue)

            renderCountries(filteredCountries);
            break;
    }
}

function renderCountries(countries) {
    const numberFormat = new Intl.NumberFormat("en");

    global.hideLoading(countriesContainer);
    countriesContainer.innerHTML = "";

    countries.map(country => {
        countriesContainer.insertAdjacentHTML("beforeend", `
        
        <div class="country country--card" data-country-name="${country.name}">

            <div class="country__details">
                <h2 class="country__name">${country.name}</h2>

                <div class="country__detail">Population:
                    <p class="country__data">${numberFormat.format(country.population)}</p>
                </div>
                
                <div class="country__detail">Region:
                    <p class="country__data">${country.region}</p>
                </div>

                <div class="country__detail">Capital:
                    <p class="country__data">${country.capital}</p>
                </div>
            </div>
        </div>        
        `)
    })

    lazyLoadFlags(countries);
}

function lazyLoadFlags(data) {
    const countries = data;
    const countryCard = document.querySelectorAll(".country");
    const fetchFlag = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visibleCountry = entry.target;
                const countryName = visibleCountry.dataset.countryName;
                const countryFlag = countries.find(country => country.name === countryName).flag;

                if (!visibleCountry.firstElementChild.classList.contains("country__flag")) {
                    visibleCountry.insertAdjacentHTML("afterbegin", `
                    <img class="country__flag" src="${countryFlag}" alt="${countryName}"></img>
                    `)
                }

                observer.unobserve(visibleCountry);
            }
        })
    }
    const observer = new IntersectionObserver(fetchFlag)

    countryCard.forEach(country => {
        observer.observe(country);
    })
}
