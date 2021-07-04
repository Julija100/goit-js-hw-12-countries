import countryCard from './country_card.hbs';

const refs = {
  cardContainer: document.querySelector('.'),
};

fetchCountries('latvia')
  .then(renderCountryCard)
  .catch(error => console.log(error));
function fetchCountries(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function renderCountryCard(country) {
  const markup = countryCard(country);
  refs.cardContainer.innerHTML = markup;
}
