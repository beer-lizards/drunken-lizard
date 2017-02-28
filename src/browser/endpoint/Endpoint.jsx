import moment from 'moment';
import React, { PropTypes } from 'react';
import {
   CardExpandable,
} from 'material-ui/Card';
import {
  TableRow,
  TableRowColumn,
 } from 'material-ui/Table';

const Endpoint = ({ endpoint, selected, onExpanding, ...otherProps }) => (
  <TableRow
    selected={selected}
    {...otherProps}
  >
    {otherProps.children[0]}
    <TableRowColumn>{endpoint.endpointId}</TableRowColumn>
    <TableRowColumn>{endpoint.endpointVersion}</TableRowColumn>
    <TableRowColumn>
      {moment(endpoint.lastCrawled).format('lll')}
    </TableRowColumn>
    <TableRowColumn>{moment(endpoint.lastCheckInDate).startOf().fromNow()}</TableRowColumn>
    <TableRowColumn>{endpoint.macAddress}</TableRowColumn>
    <TableRowColumn>
      <div
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <CardExpandable
          onExpanding={() => {
            onExpanding(endpoint.endpointId);
          }}
          style={{
            position: 'relative',
            float: 'right',
          }}
        />
      </div>
    </TableRowColumn>
  </TableRow>
);

Endpoint.propTypes = {
  endpoint: PropTypes.shape({
    endpointId: PropTypes.number.isRequired,
    endpointVersion: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
    lastCheckInDate: PropTypes.string.isRequired,
    lastCrawled: PropTypes.string.isRequired,
    macAddress: PropTypes.string.isRequired,
    operatingSystem: PropTypes.string.isRequired,
  }).isRequired,
  onExpanding: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Endpoint;
