import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FreeList extends React.Component {
    render() {
        return (
            <Table.Row>
                {/* eslint-disable-next-line react/no-string-refs */}
                <Table.Cell>{this.props.stuff.name}</Table.Cell>
                <Table.Cell>{this.props.stuff.surname}</Table.Cell>
                <Table.Cell>{this.props.stuff.age}</Table.Cell>
                <Table.Cell>{this.props.stuff.country}</Table.Cell>
            </Table.Row>
        );
    }
}

/** Require a document to be passed to this component. */
FreeList.propTypes = {
    stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> Reœact Router element. */
export default withRouter(FreeList);
