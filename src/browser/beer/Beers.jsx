import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { grey200 } from 'material-ui/styles/colors';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';

import Beer from './Beer';

class Beers extends React.Component {

  static propTypes = {
    beer: PropTypes.shape({
      beers: PropTypes.arrayOf(
        PropTypes.shape({
          beerId: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          consumed: PropTypes.bool.isRequired,
        }),
      ).isRequired,
      showAll: PropTypes.bool.isRequired,
    }).isRequired,
    onToggleShowAll: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
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
    const { onRefresh } = this.props;
    onRefresh();
  }

  onToggleShowAll(event, checked) {
    const { onToggleShowAll } = this.props;
    onToggleShowAll(checked);
  }

  render() {
    const { beers, showAll } = this.props.beer;

    const page = 0;
    const total = 0;

    if (!beers.length) {
      return (
        <Card
          style={{
            backgroundColor: `${grey200}`,
          }}
          zDepth={0}
        />
      );
    }

    return (
      <Card
        style={{
          backgroundColor: `${grey200}`,
        }}
        zDepth={0}
      >
        <CardHeader
          title="Beers"
          subtitle="You drink loads."
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText style={{ paddingTop: '0px' }}>
          <Paper zDepth={1}>
            <CardActions style={{ textAlign: 'right' }}>
              <Toggle
                label="Show All"
                onToggle={
                  (event, checked) => this.onToggleShowAll(event, checked)
                }
                toggled={showAll}
              />
            </CardActions>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Description</TableHeaderColumn>
                  <TableHeaderColumn>Consumed</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                showRowHover
              >
                {beers.filter(beer => (showAll) ? true : beer.consumed)
                  .slice(0, 10)
                  .map(beer => (
                    <Beer
                      key={beer.beerId}
                      beer={beer}
                    />
                  ))
                }
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

export default Beers;
