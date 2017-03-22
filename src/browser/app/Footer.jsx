import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedHTMLMessage } from 'react-intl';
import { darkWhite, lightWhite, grey900 } from 'material-ui/styles/colors';

import FullWidthSection from './FullWidthSection';

const styles = {
  a: {
    color: darkWhite,
  },
  p: {
    margin: '0 auto',
    padding: 0,
    color: lightWhite,
    maxWidth: 356,
  },
  section: {
    backgroundColor: grey900,
    textAlign: 'center',
  },
};

const Footer = ({ msg, viewer }) => (
  (!viewer) ?
    <FullWidthSection /> :
    <FullWidthSection style={styles.section}>
      <p style={styles.p}>
        {msg.madeBy}
        <br />
        <a
          href="http://www.drinkinglizards.com"
          style={styles.a}
        >
          {msg.name}
        </a>
      </p>
    </FullWidthSection>
);

Footer.propTypes = {
  msg: PropTypes.shape({
    madeBy: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  viewer: PropTypes.object,
};

Footer.defaultProps = {
  viewer: null,
};

export default connect(state => ({
  msg: state.intl.msg.app.footer,
  viewer: state.users.viewer,
}))(Footer);
