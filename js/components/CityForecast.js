import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import CityActions from '../actions/CityActions';
// import EmptyCity from './EmptyCity';

class CityForecast extends Component {
  constructor(props) {
    super(props);
    this.artionsCreator = bindActionCreators(CityActions, props.dispatch);
  }

  componentWillMount() {
    const {city} = this.props;
    if (city.weather === null) {
      this.artionsCreator.getWeather(city.title);
    }
  }

  render() {
    const {city} = this.props;
    const {weather} = city;
    if (weather === null){
      return (
        <div className='b-city-forecast'>
          <div className='b-city-forecast__title-wrap'>
            <h6>{city.title}</h6>
          </div>
          <div className='b-city-forecast__info'>
          </div>
        </div>
      );
    }

    return (
      <div className='b-city-forecast'>
        <div className='b-city-forecast__info b-city-forecast__title-wrap'>
          <h6 className='b-city-forecast__title'>{city.title}</h6>
          <span className='h-mini-grey'>{weather.date}</span>
        </div>
        <div className='b-city-forecast__info b-city-forecast__main'>
          <div className='b-city-forecast__main-temparature'>{weather.temparature}</div>
          <div className='b-city-forecast__main-desc h-mini-grey'>{weather.description}</div>
        </div>
        <div className='b-city-forecast__info b-city-forecast__additional'>
          <div className='b-city-forecast__additional-humidity h-mini-grey'>
            Humidity: {weather.humidity}%
          </div>
          <div className='b-city-forecast__additional-wind h-mini-grey'>
            Wind: {weather.wind}km/h
          </div>
        </div>
      </div>
    );
  }
}


export default connect()(CityForecast);
