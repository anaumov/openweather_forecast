import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import City from './City';
import CityActions from '../actions/CityActions';
const ENTER_KEY = 13;
const BACKSPACE_KEY = 8;

class CitiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {inputStyle: {width: '1rem'}};
    this.actionsCreator = bindActionCreators(CityActions, props.dispatch);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.removeCity = this.removeCity.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.textInput.focus();
    this.setState({focused: true});
  }

  render() {
    const {cities} = this.props;
    const {inputStyle} = this.state;
    const inputClasses = this.state.focused ? 'b-cities b-cities--focused' : 'b-cities'
    return(
      <div
        className={inputClasses}
        onClick={this.handleClick}
        ref={(div) => {this.wrapper = div;}}
      >
        {cities.map((city) =>
          <City key={city.title} removeCity={this.removeCity} city={city} />)
        }
        <input
          style={inputStyle}
          className='b-cities__item_input'
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={(input) => { this.textInput = input; }}
        />
      </div>
    )
  }

  handleFocus() {
    this.setState({focused: true});
  }

  handleBlur() {
    this.setState({focused: false});
  }

  handleClick(event) {
    if (event.target == this.wrapper) {
      this.textInput.focus();
    }
    this.setState({focused: true});
  }

  handleChange(event) {
    const {value} = event.target;
    if (value.indexOf(',') > -1) {
      this.actionsCreator.addCities(value.split(','));
      event.target.value = null;
      return;
    }

    const updatedWidth = 9 * value.length;
    this.setState({inputStyle: {width: `${updatedWidth}px`}});
  }

  handleKeyPress(event) {
    const inputValue = event.target.value.trim();
    switch (event.keyCode) {
      case ENTER_KEY:
        if (inputValue.length > 0) {
          this.actionsCreator.addCity(inputValue);
          event.target.value = null;
        }
        break;
      case BACKSPACE_KEY:
        if (inputValue.length == 0) {
          this.actionsCreator.removeLastCity();
        }
        break;
    }
  }

  removeCity(city) {
    this.actionsCreator.removeCity(city);
  }
}

export default connect(state => state.Cities)(CitiesList);
