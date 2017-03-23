import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Beers from './Beers';
import fetch from '../../common/components/fetch';
import { fetchBeers, toggleShowAll } from '../../common/beer/actions';

const BeerPage = ({ msg, ...otherProps }) => (
  <div>
    <Helmet title={msg.beer.title} />
    <Beers {...otherProps} />
  </div>
);

BeerPage.propTypes = {
  msg: PropTypes.shape({
    beer: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const fetchedBeerPage = fetch(fetchBeers)(BeerPage);

export default connect(state => ({
  beer: state.beer,
  msg: {
    beer: state.intl.msg.beer,
  },
  token: state.authorization.authorization.token,
}), dispatch => ({
  onToggleShowAll: (checked) => {
    dispatch(toggleShowAll(checked));
  },
}))(fetchedBeerPage);
