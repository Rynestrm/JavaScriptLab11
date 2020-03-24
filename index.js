const endpoint =
"http://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json";
// "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))


function findMatches(wordToMatch, cities) {
return cities.filter(place => {
  const regex = new RegExp(wordToMatch, 'gi');
  return place.city.match(regex) || place.name.match(regex)
});
}

function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
const matchArray = findMatches(this.value, cities)
const html = matchArray.map(place => {
  const regex = new RegExp(this.value, 'gi');
  const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
  const airportName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
  return `
  <li>
    <span class="name">${cityName}, ${airportName}</span>
    <span class="population">${numberWithCommas(place.code)}</span>
  </li>
  `;
}).join('');
suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
