import './sass/main.scss';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from "./js/fetchCountries.js"
import cardList from "./partials/countriesList.hbs";
import countryCard from "./partials/countryCard.hbs";

const input = document.querySelector('#input');
const container = document.querySelector('.container-country');

input.addEventListener('input', debounce(writeInput, 500));

function writeInput() {
    if (!input.value) {
        return markUpContries(0);
    }
    fetchCountries(input.value).then(data => {
        if (!data.length) {
            markUpContries(0);
            return errMessage('Введите название страны')
        }
        if (data.length > 10) {
            errMessage('Пожалуйста, введите более конкретный запрос!');
        } else if (data.length >= 2 && data.length <= 10) {
            markUpContries(cardList(data));
        } else {
            markUpContries(countryCard(data[0]));
        }
        return;
    })

    function markUpContries(markup) {
        container.innerHTML = '';
        if (markup) container.insertAdjacentHTML('afterbegin', markup);
        return;
    }
}


function errMessage(message) {
    return error({
      text: message,
      delay: 2000,
      closer: false,
      title: 'ОШИБКА!',
      icon: false,
      width: '250px',
      sticker: false,
      addClass: 'error-box',
    });
  }
