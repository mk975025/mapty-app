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

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    navigator.geolocation?.getCurrentPosition(
      this._loadMap.bind(this),
      this._error
    );
  }

  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    const bounds = [
      [-90, -180],
      [90, 180],
    ];

    this.#map = L.map('map', { maxBoundsViscosity: 1 }).setView(
      [latitude, longitude],
      13
    );

    L.marker([latitude, longitude])
      .addTo(this.#map)
      .bindPopup({ maxWidth: 250 })
      .setPopupContent('Your location')
      .openPopup();

    L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.#map);
    this.#map.setMaxBounds(bounds);
    this.#map.options.minZoom = 3;
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    //Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup({
        maxWidth: 250,
        minWidth: 100,
      })
      .setPopupContent('Workouts')
      .openPopup();
  }

  _error() {
    alert('Could not get your position');
  }
}

const app = new App();

//gather and set user coordinates via geolocation api with google maps
