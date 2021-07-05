import debounce from 'lodash.debounce';
import { notice } from '@pnotify/core';

import countryCard from './country_card.hbs';
import countryList from './country_list.hbs';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchInput: document.querySelector('.country-input'),
  listContainer: document.querySelector('.js-list-container'),
};

const fetchCountries = name => {
  const url = `https://restcountries.eu/rest/v2/name/${encodeURIComponent(name)}`;
  return fetch(url).then(response => response.json());
};

function renderCountryCard(country) {
  const markup = countryCard(country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError() {
  refs.listContainer.style.display = 'none';
  refs.cardContainer.style.display = 'none';
}

const onSearch = e => {
  const searchQuery = e.target.value;

  fetchCountries(searchQuery)
    .then(contries => {
      if (!contries.length) {
        throw new Error('Unexpected response');
      }

      if (contries.length === 1) {
        console.log('xx');
        refs.listContainer.style.display = 'none';
        refs.cardContainer.style.display = 'block';
        renderCountryCard(contries[0]);
      } else if (contries.length > 1 && contries.length <= 10) {
        refs.cardContainer.style.display = 'none';
        refs.listContainer.style.display = 'block';
        const html = countryList(contries);
        refs.listContainer.innerHTML = html;
      } else {
        notice({
          text: 'Too many matches found! Please enter a more specific query',
        });
      }
    })
    .catch(onFetchError);
};

const debouncedOnSearch = debounce(onSearch, 500);
refs.searchInput.addEventListener('input', debouncedOnSearch);
