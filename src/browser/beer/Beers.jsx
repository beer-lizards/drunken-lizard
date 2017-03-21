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
   CardHeader,
   CardText,
} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';

import Beer from './Beer';

class Beers extends React.Component {

  static propTypes = {
    beers: PropTypes.arrayOf(
      PropTypes.shape({
        beerId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        consumed: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }

  render() {
    const { beers } = this.props;

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
                {beers.map(beer => (
                  <Beer
                    key={beer.beerId}
                    beer={beer}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default Beers;
