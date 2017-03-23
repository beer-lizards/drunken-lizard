import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
   Card,
   CardTitle,
   CardText,
} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';

import Header from '../app/Header';

const LoadingPage = ({ msg, store }) => (
  <Paper style={{ backgroundColor: `${grey200}` }} zDepth={0}>
    <Helmet title={msg.title} />
    <Header store={store} />
    <Card style={{ backgroundColor: `${grey200}`, width: '512px', margin: '0 auto' }} zDepth={0}>
      <CardTitle>
        <h1>Loading</h1>
      </CardTitle>
      <CardText>
        <p>Please wait...</p>
      </CardText>
    </Card>
  </Paper>
);

LoadingPage.propTypes = {
  msg: PropTypes.shape({
    header: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  store: PropTypes.object.isRequired,
};

export default connect(state => ({
  msg: state.intl.msg.loading,
}))(LoadingPage);
