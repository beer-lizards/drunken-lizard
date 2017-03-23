import { Card, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { grey200 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import React, { PropTypes } from 'react';

const styles = {
  card: {
    backgroundColor: `${grey200}`,
    margin: '0 auto',
  },
};

const NotFoundPage = ({ msg }) => (
  <Paper style={{ backgroundColor: `${grey200}` }} zDepth={0}>
    <Helmet title={msg.title} />
    <Card
      style={styles.card}
      zDepth={0}
    >
      <CardTitle>
        <h1>Not Found</h1>
      </CardTitle>
      <CardText>
        <p>{msg.message}</p>
        <Link to="/">{msg.continueMessage}</Link>
      </CardText>
    </Card>
  </Paper>
);

NotFoundPage.propTypes = {
  msg: PropTypes.shape({
    continueMessage: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(state => ({
  msg: state.intl.msg.notFound,
}))(NotFoundPage);
