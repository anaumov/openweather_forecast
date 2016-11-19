import superagent from 'superagent';
import * as CityActionTypes from '../constants/ActionTypes';
import ApiDefaultParams from '../constants/ApiDefaultParams';

const CityActions = {
  addCity: (city) => ({ type: CityActionTypes.ADD_CITY, city }),
  addCities: (cities) => ({ type: CityActionTypes.ADD_CITIES, cities }),
  addWeatherData: (city, weather) => ({ type: CityActionTypes.ADD_WEATHER_DATA, city, weather }),
  removeCity: (city) => ({ type: CityActionTypes.REMOVE_CITY, city }),
  removeLastCity: (city) => ({ type: CityActionTypes.REMOVE_LAST_CITY }),
  getWeather: (city) => {
    return dispatch => {
      superagent
        .get('http://api.openweathermap.org/data/2.5/weather')
        .query({...ApiDefaultParams, q: city})
        .then(
          (response) => {
            dispatch(CityActions.addWeatherData(city, response.body));
          },
          (response) => {
            // console.log('fail');
            // dispatch(AuthActions.signInRequired());
          }
        )
    }
  }
}

export default CityActions;
