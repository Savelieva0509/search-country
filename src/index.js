import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkupCard,createMarkupList  } from './createMarkup';
import { fetchCountries } from './fetch';

const debounce = require('lodash.debounce');


const countryCard = document.querySelector('.country-info');
const countryList = document.querySelector ('.country-list')
const inputRef = document.querySelector('#search-box');


function fetchCountries(name) {
    const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(URL).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
   )
}  

const handleInput = (event) => {
    event.preventDefault();
    const userText = event.target.value.trim().toLowerCase();
  
    if (!userText) {
        return;
    }
    
    fetchCountries(userText).then(onSuccess).catch(onError);
    }


function onSuccess(countries) {
       if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = "";
        countryCard.innerHTML = "";
        return;
    }

    if(countries.length >= 2  && countries.length <= 10) {
    const markup = countries.map(country => createMarkupList(country))
        countryList.innerHTML = markup.join('');
        countryCard.innerHTML = "";
    }

    if (countries.length === 1) {
        const markup = createMarkupCard(countries);
        countryCard.innerHTML = markup;
        countryList.innerHTML = "";
    }
}

function onError(error) {
    console.log(error);
    Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = "";
    countryCard.innerHTML = "";
}

inputRef.addEventListener('input', debounce(handleInput,300))
