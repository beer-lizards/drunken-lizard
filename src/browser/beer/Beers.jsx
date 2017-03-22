import React, { PropTypes } from 'react';
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
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';

import Beer from './Beer';

class Beers extends React.Component {

  static propTypes = {
    beers: PropTypes.shape({
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
  }

  toggleShowAll(event, checked) {
    const { onToggleShowAll } = this.props;
    onToggleShowAll(checked);
  }

  render() {
    const { beers, showAll } = this.props.beers;

    if (!beers.length) {
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
                  (event, checked) => this.toggleShowAll(event, checked)
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
        </CardText>
      </Card>
    );
  }
}

export default Beers;
