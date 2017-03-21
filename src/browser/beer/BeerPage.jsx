import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Beers from './Beers';
import fetch from '../../common/components/fetch';
import {
  fetchBeers,
} from '../../common/beers/actions';

const BeerPage = ({ ...otherProps }) => (
  <div className="mdl-grid">
    <Helmet title="Beers" />
    <Beers {...otherProps} />
  </div>
);

BeerPage.propTypes = {
  token: PropTypes.string.isRequired,
};

const beerPage = fetch(fetchBeers)(BeerPage);

export default connect(state => ({
  beers: state.beers.beers,
  token: state.authorization.authorization.token,
}))(beerPage);
