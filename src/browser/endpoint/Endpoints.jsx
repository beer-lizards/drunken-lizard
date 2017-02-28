import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
 } from 'material-ui/Table';
import {
   Card,
   CardActions,
   CardHeader,
   CardText,
} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { blue50, grey200 } from 'material-ui/styles/colors';

import {
  deleteEndpoints,
  expandEndpoint,
  fetchEndpoints,
  nextEndpoints,
  previousEndpoints,
  selectEndpoints,
} from '../../common/endpoints/actions';

import Endpoint from './Endpoint';

const styles = {
  div: {
    width: '100%',
    height: '48px',
    lineHeight: '48px',
  },
  menu: {
    height: '48px',
    position: 'absolute',
    right: '24px',
  },
  selectedText: {
    display: 'inline-block',
    fontSize: '20px',
    height: '48px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'top',
  },
  tableActionHeader: {
    height: '48px',
    padding: '0 0 0 16px',
  },
};

class Endpoints extends React.Component {

  static propTypes = {
    endpoints: PropTypes.object.isRequired,
    onDeleteSelected: PropTypes.func.isRequired,
    onEndpointExpand: PropTypes.func.isRequired,
    onEndpointSelected: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    onRefreshEndpoints: PropTypes.func.isRequired,
    selected: PropTypes.arrayOf(
      PropTypes.number,
    ),
    sort: PropTypes.string,
    token: PropTypes.string.isRequired,
  }

  static defaultProps = {
    selected: [],
    sort: 'crawledDate',
  }

  static styles = {

  }

  onDelete() {
    const { onDeleteSelected, selected, token } = this.props;
    onDeleteSelected(null, token, selected);
  }

  onNext() {
    const { onNextPage } = this.props;
    onNextPage();
  }

  onPrevious() {
    const { onPreviousPage } = this.props;
    onPreviousPage();
  }

  onRefresh() {
    const { onRefreshEndpoints, token } = this.props;
    onRefreshEndpoints(token);
  }

  onSelection(obj) {
    const { onEndpointSelected } = this.props;
    const endpoints = this.sortEndpoints();

    if (obj === 'all') {
      // TODO: Impleent select all.
    } else if (obj.length === 0) {
      onEndpointSelected([]);
    } else {
      const endpointIds = obj.map(key => endpoints.get(key).endpointId);
      onEndpointSelected(endpointIds);
    }
  }

  sortEndpoints() {
    const { endpoints } = this.props;
    return endpoints.toList().sortBy(item => item.lastCrawled);
  }

  render() {
    const { endpoints, onEndpointExpand } = this.props;

    const page = 1;
    const total = endpoints.size;

    if (!endpoints.size) {
      return (
        <Card
          style={{
            backgroundColor: `${grey200}`,
            minHeight: '600px',
          }}
          zDepth={0}
        />
      );
    }

    return (
      <Card
        style={{
          backgroundColor: `${grey200}`,
          minHeight: '600px',
        }}
        zDepth={0}
      >
        <CardHeader
          title="Endpoints"
          subtitle="Manage the endpoints in your ecosystem."
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText style={{ paddingTop: '0px' }}>
          <Paper zDepth={1}>
            {(this.props.selected.length !== 0) ?
              <CardActions
                style={Object.assign({
                  backgroundColor: `${blue50}`,
                }, styles.tableActionHeader)}
              >
                <div
                  style={Object.assign({
                    backgroundColor: `${blue50}`,
                  }, styles.div)}
                >
                  <span style={styles.selectedText}>
                    {`${this.props.selected.length} Selected`}
                  </span>
                  <IconButton
                    onTouchTap={() => this.onDelete()}
                    iconClassName="material-icons"
                    tooltip="Remove endpoint(s)"
                    style={{
                      height: '48px',
                      position: 'absolute',
                      right: '24px',
                    }}
                  >
                    delete
                  </IconButton>
                </div>
              </CardActions> :
              <CardActions style={styles.tableActionHeader} >
                <div style={styles.div}>
                  <IconButton
                    onTouchTap={() => this.onRefresh()}
                    iconClassName="material-icons"
                    tooltip="Refresh the endpoint list"
                    style={{
                      height: '48px',
                      position: 'absolute',
                      right: '24px',
                    }}
                  >
                    refresh
                  </IconButton>
                </div>
              </CardActions>}
            <Table
              multiSelectable
              onRowSelection={obj => this.onSelection(obj)}
            >
              <TableHeader
                adjustForCheckbox
                displaySelectAll
                enableSelectAll
              >
                <TableRow>
                  <TableHeaderColumn>Id</TableHeaderColumn>
                  <TableHeaderColumn>Version</TableHeaderColumn>
                  <TableHeaderColumn>Crawled Date</TableHeaderColumn>
                  <TableHeaderColumn>Last Seen</TableHeaderColumn>
                  <TableHeaderColumn>MAC Address</TableHeaderColumn>
                  <TableHeaderColumn />
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
                displayRowCheckbox
                showRowHover
              >
                {this.sortEndpoints().map(endpoint => (
                  <Endpoint
                    key={endpoint.endpointId}
                    endpoint={endpoint}
                    selected={this.props.selected.includes(endpoint.endpointId)}
                    onExpanding={onEndpointExpand}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
          <CardActions style={{ textAlign: 'right' }}>
            <div
              style={{
                display: 'inline-block',
                height: '48px',
                lineHeight: '48px',
                verticalAlign: 'top' }}
            >
              {`${page} - ${total}`}
            </div>
            <IconButton
              onTouchTap={() => this.onPrevious()}
              iconClassName="material-icons"
              tooltip="Previous page"
            >
              navigate_before
            </IconButton>
            <IconButton
              onTouchTap={() => this.onNext()}
              iconClassName="material-icons"
              tooltip="Next page"
            >
              navigate_next
            </IconButton>
          </CardActions>
        </CardText>
      </Card>
    );
  }
}

export default connect(state => ({
  endpoints: state.endpoints.map,
  selected: state.endpoints.selected,
  token: state.authorization.authorization.token,
}), dispatch => ({
  onDeleteSelected: (location, token, endpointIds) => {
    dispatch(deleteEndpoints(location, token, endpointIds));
  },
  onEndpointExpand: (endpointId) => {
    dispatch(expandEndpoint(endpointId));
  },
  onEndpointSelected: (endpointIds) => {
    dispatch(selectEndpoints(endpointIds));
  },
  onNextPage: () => {
    dispatch(nextEndpoints());
  },
  onPreviousPage: () => {
    dispatch(previousEndpoints());
  },
  onRefreshEndpoints: (token) => {
    dispatch(fetchEndpoints({ token }));
  },
}))(Endpoints);
