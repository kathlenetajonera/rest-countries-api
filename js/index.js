import * as header from "./header.js"; 
import * as global from "./global.js";

const filterBtn = document.querySelector(".filter__custom-select");
const filterSelection = document.querySelector(".filter__select-options");
const mainContainer = document.querySelector("#main-container");

header.loadHeader();
renderCountries();

filterBtn.addEventListener("click", toggleFilterSelection);

function toggleFilterSelection() {
    const isOpen = filterSelection.classList.contains("filter__select-options--active");

    if (isOpen) {
        global.removeClass("active", filterSelection)
    } else {
        global.addClass("active", filterSelection);
    }
}

// async function getData() {
//     const response = await fetch("https://restcountries.eu/rest/v2/all");
//     const data = await response.json();

//     return data;
// }

async function renderCountries() {
    const allCountries = await global.getData();

    allCountries.map(country => {
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

mainContainer.addEventListener("click", e => {
    const countryCard = e.target.closest(".country--card");
    const countryName = countryCard.dataset.countryName;

    saveSelectedCountry(countryName);
    window.location = "/country-details.html";
})

function saveSelectedCountry(country) {
    sessionStorage.setItem("selectedCountry", country)
}