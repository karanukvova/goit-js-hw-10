import Notiflix from "notiflix"
export default function fetchCountries(data) {
    return fetch(`https://restcountries.com/v3.1/name/${data}?fields=name,capital,population,flags,languages`)
        .then(
    (response) => {
      if (!response.ok) {
        Notiflix.Notify.failure("Oops, there is no country with that name")
      }
      return response.json();
    }
  );
}