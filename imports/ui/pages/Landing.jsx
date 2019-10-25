import React from 'react';
import {Container, Grid, Header, Table} from 'semantic-ui-react';
import {withTracker} from 'meteor/react-meteor-data';
import FreeList from '../components/FreeList';
import { Stuffs } from '../../api/stuff/Stuff';
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
    renderList() {
        return this.props.stuffs.map((stuff) => (
            <FreeList key={stuff._id} stuff={stuff} />
        ));
    }

  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={8}>
            <h1>EIT CLASS OF 2020 List</h1>
              {/* eslint-disable-next-line max-len */}
              <p>You can add the new EIT from <a href="meltwater.org">MEST</a> in this platform , for manage them better</p>
          </Grid.Column>
            <Container>
                <Header as="h2" textAlign="center">List of EIT </Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>First name</Table.HeaderCell>
                            <Table.HeaderCell>Surname</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Country</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.renderList()}
                    </Table.Body>
                </Table>
            </Container>

        </Grid>

    );
  }
}


/** Require an array of Stuff documents in the props. */
export default withTracker(() => {
    return {
        stuffs: Stuffs.find({}).fetch(),
    };
})(Landing);