import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const divCountry = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchResult, DEBOUNCE_DELAY));

function searchResult() {
  const searchQuery = input.value.trim().toLowerCase();
  divCountry.innerHTML = '';
  list.innerHTML = '';

  if (searchQuery.length > 0) {
    fetchCountries(searchQuery)
      .then(countries => {
        console.log(countries);
        if (countries.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countries.length >= 2 && countries.length < 10) {
          renderCountries(countries);
        } else {
          renderCountry(countries);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
      });
  }
}

function renderCountry(countries) {
  const markup = countries
    .map(country => {
      return `
          <p style="font-weight: 700;">Name: ${country.name.official}</p>
          <p style="font-weight: 700;">Capital: ${country.capital}</p>
          <p style="font-weight: 700;">Population: ${country.population}</p>
          <p style="font-weight: 700; margin-bottom: 30px">Languages: ${Object.values(
            country.languages
          )}</p>
          <img src="${country.flags.svg}" alt="flag of ${country.name}" width="200">`;
    })
    .join('');
  return (divCountry.innerHTML = markup);
}

function renderCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li style="display: flex; align-items: center;"><img src="${country.flags.svg}" alt="flag of ${country.name.official}" height="40" width="70"">
        <p style="font-weight: 500;">Name: ${country.name.official}</p></li>`;
    })
    .join('');
  return (list.innerHTML = markup);
}
