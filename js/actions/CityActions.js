import superagent from 'superagent';
import * as CityActionTypes from '../constants/ActionTypes';
import ApiDefaultParams from '../constants/ApiDefaultParams';

const CityActions = {
  addCity: (city) => ({ type: CityActionTypes.ADD_CITY, city }),
  addCities: (cities) => ({ type: CityActionTypes.ADD_CITIES, cities }),
  addWeatherData: (city, weather) => ({ type: CityActionTypes.ADD_WEATHER_DATA, city, weather }),
  searchingFor: (city) => ({ type: CityActionTypes.SEARCHING_FOR, city }),
  failFetching: (city) => ({ type: CityActionTypes.FAIL_FETHCHING, city }),
  removeCity: (city) => ({ type: CityActionTypes.REMOVE_CITY, city }),
  removeLastCity: (city) => ({ type: CityActionTypes.REMOVE_LAST_CITY }),
  getWeather: (city) => {
    return dispatch => {
      // dispatch(CityActions.searchingFor(city));
      superagent
        .get('http://api.openweathermap.org/data/2.5/weather')
        .query({...ApiDefaultParams, q: city})
        .then(
          (response) => {
            dispatch(CityActions.addWeatherData(city, response.body));
          },
          (response) => {
            dispatch(CityActions.failFetching(city));
          }
        )
    }
  }
}

export default CityActions;
