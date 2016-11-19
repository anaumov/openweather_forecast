import React from 'react';

const City = ({city, removeCity}) => {
  const handleClick = () => removeCity(city.title)
  return(
    <div className='b-cities__item'>
      {city.title}
      <button className='b-cities__item_close' onClick={handleClick}>
        &times;
      </button>
    </div>
  );
}

export default City;
