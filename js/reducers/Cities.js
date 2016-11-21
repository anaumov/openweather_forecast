import _ from 'lodash';
import moment from 'moment';
import * as ActionTypes from '../constants/ActionTypes';

const capitalize = (s) => {
  const trimmed = s.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};
const buildCity = (cityTitle, state='idle') => ({
  title: capitalize(cityTitle),
  state: state,
  weather: null
});

const defaultState = {cities: []};
const mpsToKph = (speed) => Math.round(speed * 3.6 * 10) / 10

const parsedData = (rawData) => ({
  description: rawData.weather[0].description,
  date: moment().format("MMMM Do"),
  humidity: rawData.main.humidity,
  temparature: Math.round(rawData.main.temp),
  wind: mpsToKph(rawData.wind.speed)
})

const updateCityWeather = (cities, cityTitle, rawWeatherData) => {
  const updated = _.reject(cities, { title: cityTitle });
  return [...updated, { title: cityTitle, state: 'done', weather: parsedData(rawWeatherData) }];
}

const updateCityState = (cities, cityTitle, state) => {
  const updated = _.reject(cities, { title: cityTitle });
  return [...updated, buildCity(cityTitle, 'fail')];
}

const CitiesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CITY:
      if (_.find(state.cities, {title: action.city})) {
        return state;
      }
      return { ...state, cities: [...state.cities, buildCity(action.city)] };
    case ActionTypes.SEARCHING_FOR:
      return {...state, cities: updateCityState(state.cities, action.city, 'fetching')}
    case ActionTypes.FAIL_FETHCHING:
      return {...state, cities: updateCityState(state.cities, action.city, 'fail')}
    case ActionTypes.ADD_CITIES:
      const newCities = _.reject(
        action.cities,
        (city) => city.length == 0 || state.cities.indexOf(city) > -1
      );
      const buildedCities = _.map(newCities, (city) => buildCity(city));

      return {
        ...state,
        cities: [...state.cities, ...buildedCities]
      };
    case ActionTypes.REMOVE_CITY:
      return {
        ...state,
        cities: _.reject(state.cities, { title: action.city })
      };
    case ActionTypes.REMOVE_LAST_CITY:
      return {
        ...state,
        cities: state.cities.slice(0, state.cities.length - 1)
      };
    case ActionTypes.ADD_WEATHER_DATA:
      return {
        ...state,
        cities: updateCityWeather(state.cities, action.city, action.weather)
      }
    default:
      return state;
  }
}

export default CitiesReducer;
