import debounce from 'lodash.debounce';
import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import fetchCountries from './js/fetchCountries.js';
import isEmptyString from './js/isEmptyString';
import listTpl from './templates/countries-list.hbs';
import countryTpl from './templates/specificCountry.hbs';

const { error } = require('@pnotify/core');
const { defaults } = require('@pnotify/core');

defaults.type = 'error';
defaults.sticker = false;
defaults.delay = 3000;

const refs = {
  input: document.querySelector('#filter'),
  form: document.querySelector('.js-form'),
  container: document.querySelector('.js-container'),
  countryContainer: document.querySelector('.country-container'),
};
let markUp = null;

refs.input.addEventListener('input', debounce(handleInput, 500));

async function handleInput(event) {
  refs.countryContainer.innerHTML = '';
  const query = event.target.value;

  if (isEmptyString(query)) {
    refs.container.classList.remove('shown');
    error({
      text: 'Please, enter something!!!',
    });
  } else {
    try {
      const data = await fetchCountries(query);

      if (data.length > 10) {
        refs.container.classList.remove('shown');
        const tooManyMatches = error({
          text: 'Too many matches found! Please, enter a more specific query!',
        });
      }
      // else if (2 <= data.length && data.length <= 10) {
      //   markUp = listTpl(data);
      //   refs.container.innerHTML = markUp;
      // } else {
      //   markUp = countryTpl(...data);
      //   refs.container.innerHTML = markUp;
      // }
      else {
        markUp = listTpl(data);
        refs.container.innerHTML = markUp;
        refs.container.classList.add('shown');
      }
    } catch {
      const tooManyMatches = error({
        text: 'Please, enter the correct country name!',
      });
    }
  }
}

refs.container.addEventListener('click', handleCountryClick);

async function handleCountryClick(event) {
  const countryToShow = event.target.textContent;
  refs.container.classList.remove('shown');
  try {
    const data = await fetchCountries(countryToShow);
    markUp = countryTpl(...data);
    refs.countryContainer.innerHTML = markUp;
  } catch (er) {
    alert(er);
    const countryError = error({
      text: er,
    });
  }
}
