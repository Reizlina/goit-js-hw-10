const apiCountries = `?fields=name,capital,population,flags,languages`;

export const fetchCountries = name => {
  fetch(`https://restcountries.com/v3.1/name/${name}${apiCountries}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(err => {
  //   console.error(err);
  // });
};
