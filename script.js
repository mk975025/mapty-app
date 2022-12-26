'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//gather and set user coordinates via geolocation api with google maps
function success(pos) {
  const { latitude, longitude } = pos.coords;

  const map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxBoundsViscosity: 1.0,
    noWrap: true,
  }).addTo(map);

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

  map.setMaxBounds([
    [-90, -180],
    [90, 180],
  ]);

  map.options.minZoom = 3;
}

function error() {
  alert('Could not get your position');
}

navigator.geolocation?.getCurrentPosition(success, error);
