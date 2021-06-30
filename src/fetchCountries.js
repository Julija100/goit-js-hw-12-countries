// fetchCountries(searchQuery);

//Страны с https://restcountries.eu/#api-endpoints-name

fetch('https://restcountries.eu/#api-endpoints-name')
  //   .then(r => r.json())
  .then(name => {
    console.log(name);
  })
  .catch(error => console.log(error));
