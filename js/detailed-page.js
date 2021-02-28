import * as header from "./header.js"; 
import * as global from "./global.js";

header.loadHeader();
getSelectedCountry();

const container = document.querySelector("#country-container");
let borderCountries = [];

function getSelectedCountry() {
    const selectedCountry = sessionStorage.getItem("selectedCountry");

    getCountryInfo(selectedCountry)
}

async function getCountryInfo(countryName) {
    const allCountries = await global.getData();
    const countryInfo = allCountries.find(country => country.name === countryName);

    renderCountryInfo(countryInfo);
}  

async function renderCountryInfo(country) {
    const languages = country.languages.map(lang => lang.name).join(", ");
    const currencies = country.currencies.map(currency => currency.name).join(", ");
    const topLevelDomain = country.topLevelDomain.join(", ");
    const borderCountriesName = await getBorderCountriesName();
    const borderCountriesMarkUp = borderCountriesName.map(border => {
        return `
        <button class="button button--country">${border}</button>
        `
    }).join("");

    async function getBorderCountriesName() {
        const borderCountriesCode = country.borders;
        const allCountries = await global.getData();
        
        allCountries.filter(country => {
            borderCountriesCode.forEach(border => {
                if (border === country.alpha3Code) {
                    borderCountries.push(country.name);
                    return borderCountries;
                }
            })
        })

        return borderCountries;
    }

    container.innerHTML = `
    <img class="country__flag" src="${country.flag}" alt="country">

    <div class="country__details">
        <h2 class="country__name">${country.name}</h2>

        <div class="grid grid--two">
            <div class="wrapper">
                <div class="country__detail">Native Name:
                    <p class="country__data" id="native-name">${country.name}</p>
                </div>
                <div class="country__detail">Population:
                    <p class="country__data" id="population">${country.population}</p>
                </div>
                <div class="country__detail">Region:
                    <p class="country__data" id="region">${country.region}</p>
                </div>
                <div class="country__detail">Sub Region:
                    <p class="country__data" id="sub-region">${country.subregion}</p>
                </div>
                <div class="country__detail">Capital:
                    <p class="country__data" id="capital">${country.capital}</p>
                </div>
            </div>

            <div class="wrapper">
                <div class="country__detail">Top Level Domain:
                    <p class="country__data" id="top-level-domain">${topLevelDomain}</p>
                </div>
                <div class="country__detail">Currencies:
                    <p class="country__data" id="currencies">${currencies}</p>
                </div>
                <div class="country__detail">Languages:
                    <p class="country__data" id="languages">${languages}</p>
                </div>
            </div>
        </div>
        <div class="flex-wrapper">
            <h3 class="country__border-text">Border Countries:</h3>

            <div class="country__border-countries">
                ${borderCountriesMarkUp}
            </div>
        </div>
    </div>
    `
}