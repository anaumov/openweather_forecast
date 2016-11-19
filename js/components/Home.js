import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from '../../css/app.css';

import CitiesList from './CitiesList';
import Forecasts from './Forecasts';

class Home extends Component {
  render() {
    const {title, dispatch} = this.props;
    return (
      <main className='b-forecasts__main'>
        <header className='b-header'>
          <CitiesList />
        </header>
        <Forecasts />
      </main>
    );
  }
}

export default connect(state => state.Cities)(Home)
