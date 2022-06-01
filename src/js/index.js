import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const divCountry = document.querySelector('.country-info');

input.addEventListener('input', searchResult);

// ! _.debounce(func, [wait=0], [options={}])

function searchResult() {
  const searchQuery = input.value.trim();
  if (searchQuery.length > 2) {
    fetchCountries(searchQuery)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length > 2 && countries.length < 10) {
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
          <p>Name: ${country.name}</p>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <img src="${country.flags}" alt="flag of ${country.name}">
          <p>Languages: ${country.languages}</p>`;
    })
    .join('');
  return (divCountry.innerHTML = markup);
}

function renderCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li><img src="${country.flags}" alt="flag of ${country.name}">
        <p>Name: ${country.name}</p></li>`;
    })
    .join('');
  return (list.innerHTML = markup);
}