import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const divCountry = document.querySelector('.country-info');

input.addEventListener('input', searchResult);

function searchResult() {
  const searchQuery = input.value.trim();
  //   console.log(searchQuery);
  if (searchQuery.length > 2) {
    fetchCountries(searchQuery)
      .then(countries => {
        if (countries.length > 10) {
          console.log(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length > 2 && countries.length < 10) {
          renderCountries(countries);
        } else {
          renderCountry(countries);
        }
      })
      .catch(error => console.log(error));
  }
}

// fetchCountries('poland');

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

// !
// const fetchUsersBtn = document.querySelector('.btn');
// const userList = document.querySelector('.user-list');

// fetchUsersBtn.addEventListener('click', () => {
//   fetchUsers()
//     .then(users => renderUserList(users))
//     .catch(error => console.log(error));
// });

// function fetchUsers() {
//   return fetch('https://jsonplaceholder.typicode.com/users').then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function renderUserList(users) {
//   const markup = users
//     .map(user => {
//       return `<li>
//           <p><b>Name</b>: ${user.name}</p>
//           <p><b>Email</b>: ${user.email}</p>
//           <p><b>Company</b>: ${user.company.name}</p>
//         </li>`;
//     })
//     .join('');
//   userList.innerHTML = markup;
// }
