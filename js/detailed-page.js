import * as common from "./common js/header&footer.js"; 
import * as global from "./common js/global.js";

const mainContainer = document.querySelector(".main");
const container = document.querySelector("#country-container");

common.loadHeader();
common.loadFooter();
global.updateTheme();

getSelectedCountry();

mainContainer.addEventListener("click", e => {
    const target = e.target;
    const backBtn = target.classList.contains("button--back");
    const borderCountry = target.classList.contains("button--country");

    if (backBtn) {
        window.location = "/";
    } else if (borderCountry) {
        const borderName = target.dataset.country;

        global.saveSelectedCountry(borderName);
        getSelectedCountry();
    }
})

function getSelectedCountry() {
    const selectedCountry = sessionStorage.getItem("selectedCountry");

    container.innerHTML = "";
    global.showLoading(container);

    getCountryInfo(selectedCountry)
}

async function getCountryInfo(countryName) {
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}`);
    const countryInfo = await response.json();

    renderCountryInfo(countryInfo[0]);
} 

async function renderCountryInfo(country) {
    const numberFormat = new Intl.NumberFormat("en");
    const languages = country.languages.map(lang => lang.name).join(", ");
    const currencies = country.currencies.map(currency => currency.name).join(", ");
    const topLevelDomain = country.topLevelDomain.join(", ");
    const borderCountriesName = await getBorderCountriesName(country.borders);
    const borderCountriesMarkUp = borderCountriesName.map(border => {
        return `
        <button class="button button--country" data-country="${border}">${border}</button>
        `
    }).join("");

    global.hideLoading(container);

    container.innerHTML = `
    <img class="country__flag" src="${country.flag}" alt="country">

    <div class="country__details">
        <h2 class="country__name">${country.name}</h2>

        <div class="grid grid--two-inner">
            <div class="wrapper">
                <div class="country__detail">Native Name:
                    <p class="country__data">${country.name}</p>
                </div>
                <div class="country__detail">Population:
                    <p class="country__data">${numberFormat.format(country.population)}</p>
                </div>
                <div class="country__detail">Region:
                    <p class="country__data">${country.region}</p>
                </div>
                
                ${ !country.subregion ? "" :  `
                <div class="country__detail">Sub Region:
                    <p class="country__data">${country.subregion}</p>
                </div>
                `}

                ${ !country.capital ? "" :  `
                <div class="country__detail">Capital:
                    <p class="country__data">${country.capital}</p>
                </div>
                `}

            </div>

            <div class="wrapper">
                <div class="country__detail">Top Level Domain:
                    <p class="country__data">${topLevelDomain}</p>
                </div>
                <div class="country__detail">Currencies:
                    <p class="country__data">${currencies}</p>
                </div>
                <div class="country__detail">Languages:
                    <p class="country__data">${languages}</p>
                </div>
            </div>
        </div>

        ${ borderCountriesName.length === 0 ? "" : `
        <div class="flex-wrapper">
            <h3 class="country__border-text">Border Countries:</h3>
            <div class="country__border-countries">
                ${borderCountriesMarkUp}
            </div>
        </div>
        ` }
    </div>
    `
}

async function getBorderCountriesName(borderCodes) {
    const allCountries = await global.getAllCountries();
    let borderCountries = [];
    
    allCountries.filter(country => {
        borderCodes.forEach(border => {
            if (border === country.alpha3Code) {
                borderCountries.push(country.name);
                return borderCountries;
            }
        })
    })
    
    return borderCountries;
}
