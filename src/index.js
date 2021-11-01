import './sass/main.scss';
import debounce from 'lodash';
import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from "./js/fetchCountries.js"
import cardList from "./partials/countriesList.hbs";

const input = document.querySelector('#input');
const container = document.querySelector('.container-country');

input.addEventListener('input', debounce(writeInput, 500));

function writeInput() {
    fetchCountries(input.value).then(data => {
        if (data.lengtrh > 10) {
            console.log('Error');
        } else if (data.length > 2 && data.length < 10) {
            markUpContries(cardList(data));
        } else {
            console.log('Wow');
        }
        return;
    })

    function markUpContries(markup) {
        container.innerHTML = '';
        if (markup) container.insertAdjacentHTML('afterbegin', markup);
        return;
    }
}