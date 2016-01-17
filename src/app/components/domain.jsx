var _ = require('lodash');
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

const DOMAIN_DATA = require('../../www/domains.json');

const TagDomain = React.createClass({
    getInitialState() {
        return {empty: false}
    },

    reinitializeState() {
        this.setState({
            id: null,
            exhaustive: null,
            reference: null,
            values: null,
            mapping: null
        });
    },

    componentWillMount() {
        this.setState({empty: this.props.domain == null});
        if (this.state.empty) {
            return;
        }
        this.getTerminalData(this.props.domain);
    },

    componentWillReceiveProps(nextProps) {
        this.reinitializeState();
        this.setState({empty: nextProps.domain == null});
        this.getTerminalData(nextProps.domain);
    },

    getTerminalData(domain) {
        // find the actual data defining the Tag's domain
        var tagData = _.filter(DOMAIN_DATA, function(doc) {
            return doc.id == domain;
        });
        // we should have an array of length 1 if there is a tag domain to render
        if (tagData.length == 1) {
            console.log("term", tagData[0]);
            this.setState(tagData[0]);
        }
    },

    render() {
        var contents = (<p>Unrestricted Domain</p>);
        if (!this.state.empty) {
            contents = (
                <div>
                    <p>
                        <b>ID</b>: {this.state.id}
                    </p>
                    <p>
                        <b>Exhaustive</b>: {this.state.exhaustive ? "True" : "False"}
                    </p>
                    <p>
                        <b>Reference</b>: {this.state.reference}
                    </p>
                    {this.state.values != null ? <ValuesTable values={this.state.values} mapping={this.state.mapping} /> : null}
                </div>
            );
        }
        return (
            <Card style={{width: "40%"}}>
                <CardHeader title={"Terminal: "+ this.props.name}/>
                <Divider />
                <CardText>
                    {contents}
                </CardText>
            </Card>
        );

    }
});

const ValuesTable = React.createClass({
    render() {
        var self = this;
        console.log("props", this.props);
        var values = _.map(this.props.values, function(val) {
            var mapping = self.props.mapping;
            return (
                <TableRow key={val}>
                    <TableRowColumn style={{width: "40%"}}>{val}</TableRowColumn>
                    <TableRowColumn style={{width: "60%"}}>{mapping != null ? mapping[val] : null}</TableRowColumn>
                </TableRow>
            );
        });
        return (
            <Table enableSelectAll={false} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{width: "40%"}}>Value</TableHeaderColumn>
                        <TableHeaderColumn style={{width: "60%"}}>Meaning</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={false}>
                    {values}
                </TableBody>
            </Table>
        );
    },
});

export default TagDomain;
