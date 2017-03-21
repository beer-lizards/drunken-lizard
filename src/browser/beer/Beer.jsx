import React, { PropTypes } from 'react';
import {
  TableRow,
  TableRowColumn,
 } from 'material-ui/Table';

const Beer = ({ beer, ...otherProps }) => (
  <TableRow
    {...otherProps}
  >
    {otherProps.children[0]}
    <TableRowColumn>{beer.name}</TableRowColumn>
    <TableRowColumn>{beer.description}</TableRowColumn>
    <TableRowColumn>{(beer.consumed) ? 'true' : 'false'}</TableRowColumn>
  </TableRow>
);

Beer.propTypes = {
  beer: PropTypes.shape({
    beerId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    consumed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Beer;
