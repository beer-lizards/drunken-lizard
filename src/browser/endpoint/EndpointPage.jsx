import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Endpoints from './Endpoints';
import fetch from '../../common/components/fetch';
import {
  fetchEndpoints,
} from '../../common/endpoints/actions';

const EndpointPage = () => (
  <div className="page__endpoints mdl-grid">
    <Helmet title="Endpoints" />
    <Endpoints />
  </div>
);

EndpointPage.propTypes = {
  token: PropTypes.string.isRequired,
};

const endpointPage = fetch(fetchEndpoints)(EndpointPage);

export default connect(state => ({
  token: state.authorization.authorization.token,
}))(endpointPage);
