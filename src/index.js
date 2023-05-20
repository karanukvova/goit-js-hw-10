import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const refs = {
    input : document.getElementById("search-box"),
    countryList: document.getElementsByClassName("country-list"),
    countryInfo : document.getElementsByClassName("country-info")
}
refs.input.addEventListener("input", debounce(inputName, DEBOUNCE_DELAY))
function inputName() {
    const value = refs.input.value.trim()
    if (value === "") return
    fetchCountries(value)
        .then((result) => checkResult(result))
}
function checkResult(check) {
    if(check.length > 10) {
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (check.length === 1) {
        const string = renderContryInfo(check)
        refs.countryInfo.insertAdjacentHTML("beforeend", string)
    }
}
function renderContryInfo(countries) {
    return countries.reduce((acc, { name: { official }, capital, population, flags, languages }) => {
        languages = Object.values(languages).join(', ');
        return (acc + `
            <img src="${flags.svg}" width="50"/>
            <h1>${official}</h1>
            <h2>Capital: ${capital}</h2>
            <p>Population: ${population}</p>
            <p>Languages: ${languages}</p>
        `);
    }, '')
}