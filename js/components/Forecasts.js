import React from 'react';
import {connect} from 'react-redux';
import CityForecast from './CityForecast';

const Forecasts = ({cities}) => {
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
