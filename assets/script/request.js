import { select, selectAll, print, onEvent } from './utils.js';

const cityURL = './assets/script/cities.json';
const movieURL = './assets/script/movies.json';
const movieList = select('section');

function listMovies(array) {
  movieList.innerHTML = '';
  let movies = '';

  if (array.length > 0) {
    array.forEach(movie => {
      movies += `<div><img src="${movie.img}"><p>${movie.title}</p></div>`;
    });
  } else {
    movies += `<p>Movies not found</p>`;
  }

  movieList.innerHTML = `${movies}`;
}

//fetch function 
const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  mode: 'cors'
};

const movieDropdown = select("#movie-dropdown");
const cityDropdown = select("#city-dropdown");
const movieInput = select("#name");
const cityInput = select("#cities");

async function getMovies() {
  try {
    const response = await fetch(movieURL, options);

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    const data = await response.json();

    print(data.movies);
    listMovies(data.movies);
    const movieTitles = data.movies.map(movie => movie.title);
    print(movieTitles);
    autocomplete(movieInput, movieDropdown, movieTitles);

    return data; // return the data object
  } catch (error) {
    print(error.message);
  }
}

getMovies();

async function getCities() {
  try {
    const response = await fetch(cityURL, options);
    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }
    const data = await response.json();
    const cityNames = data.cities.map(city => city.name);
    print(cityNames);
    autocomplete(cityInput, cityDropdown, cityNames);

    return data;
  } catch (error) {
    print(error.message);
  }
}

getCities();

  
function autocomplete(input, dropdown, array) {
    onEvent('keyup', input, function () {
      let temp = input.value.toLowerCase().trim();
      dropdown.innerHTML = '';
      let count = 0;
      let items = '';
      if (temp.length > 1) {
        array.forEach((element) => {
          const name = element;
          const lowerName = name.toLowerCase();
          if (lowerName.includes(temp)) {
            items += `<div>${name}</div>`;
            count++;
          }
        });
        if (count === 0) {
          items = `<div>Not found</div>`;
        }
        dropdown.innerHTML = `${items}`;
        const dropdownItems = selectAll(`${dropdown.tagName} > div`);
        for (let i = 0; i < dropdownItems.length; i++) {
          dropdownItems[i].addEventListener('click', () => {
            input.value = dropdownItems[i].innerText;
            dropdown.innerHTML = '';
          });
        }
      }
    });
  }