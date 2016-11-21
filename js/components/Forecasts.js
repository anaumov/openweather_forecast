import React from 'react';
import {connect} from 'react-redux';
import CityForecast from './CityForecast';

const Forecasts = ({cities}) => {

  if (cities.length == 0) {
    return (
      <h1 className='b-city-forecasts__empty-title'>Type for searching forecast.</h1>
    )
  }

  return (
    <div className='b-city-forecasts'>
      {cities.map((city) =>
        <CityForecast key={city.title} city={city} /> )
      }
    </div>
  );
}

// Forecasts.propTypes = {
//   cities: React.PropTypes.object.isRequired
// }

export default connect(state => state.Cities)(Forecasts);
