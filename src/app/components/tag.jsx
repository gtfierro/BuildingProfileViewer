var _ = require('lodash');
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import SelectableContainerEnhance from 'material-ui/lib/hoc/selectable-enhance';
import Colors from 'material-ui/lib/styles/colors';

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import TagDomain from './domain';

const TAGS_DATA = require('../../www/tags.json');

var SelectableList = SelectableContainerEnhance(List);

var _colorIndex = 0;
function getColor() {
    var ret = _colorIndex;
    _colorIndex = (_colorIndex + 1) % colorCycle.length;
    return colorCycle[ret];
}

const colorCycle = [
    Colors.indigo100,
    Colors.blue100,
    Colors.lightBlue100,
    Colors.cyan100,
    Colors.green100,
    Colors.lightGreen100,
    Colors.lime100,
    Colors.yellow100,
    Colors.amber100,
    Colors.orange100,
    Colors.deepOrange100,
    Colors.pink100,
    Colors.purple100,
    Colors.deepPurple100,
    //Colors.teal100,
];

const DomainView = React.createClass({
    getInitialState() {
        var path = this.props.parentPath;
        if (path == '/') {
            path += this.props.domain.root;
        } else {
            path += '/' + this.props.domain.root;
        }
        return {
            fullPath: path,
            selectedSubdomain: -1,
            selectedTerminal: null,
            childDomain: (<span></span>),
        }
    },

    handleSubdomainSelect(e, subdomain) {
        this.setState({selectedSubdomain: subdomain});
    },

    openSubdomain(subdomain) {
        // find the domain
        var actualDoc = _.filter(TAGS_DATA, function(doc) {
            return doc.id === subdomain.id;
        });
        if (actualDoc.length == 1) {
          var child = <DomainView key={subdomain.id} parentPath={this.state.fullPath} domain={actualDoc[0]} color={getColor()} />;
          this.setState({childDomain: child});
        } else {
        }
    },

    displayTerminal(terminal) {
        if (terminal == null || terminal == this.state.selectedTerminal) {
            this.setState({selectedTerminal: null});
        } else {
            this.setState({selectedTerminal: terminal});
        }
    },

    render() {
        var self = this;
        var title = (<b>Path: {this.state.fullPath}</b>);
        var subtitle = (<b>ID: {this.props.domain.id}</b>);
        var subdomains = _.map(this.props.domain.subdomains, function(sub) {
            return <ListItem value={sub.id} key={sub.id} path={sub.path} onTouchTap={self.openSubdomain.bind(null, sub)}>{sub.path}</ListItem>
        });
        var subdomainList = (
            <SelectableList valueLink={{value: this.state.selectedSubdomain, requestChange: this.handleSubdomainSelect}}>
                {subdomains}
            </SelectableList>
        );
        var sortedTerminals = _.sortBy(this.props.domain.terminals, function(t) { return !t.required; });
        return (
            <div style={{paddingTop: 20, paddingLeft: 20}}>
              <Card>
                <CardHeader style={{backgroundColor: this.props.color == null ? Colors.teal100 : this.props.color }} title={title} subtitle={subtitle} />
                <Divider />
                <CardText>
                    <h3>Terminals</h3>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {this.props.domain.terminals != null ? <TerminalTable terminals={sortedTerminals} select={this.displayTerminal}/> : <p>None</p>}
                        {this.state.selectedTerminal != null ? <TagDomain {...this.state.selectedTerminal} /> : null}
                    </div>
                    <h3>Subdomains</h3>
                        {this.props.domain.subdomains != null ? subdomainList : <p>None</p>}
                </CardText>
              </Card>
              <br />
              {this.state.childDomain}
            </div>
        )
    },
});

const TerminalTable = React.createClass({
    getInitialState() {
        return {selectedRow: -1}
    },

    handleRowSelect(index) {
        if (index.length == 0 || this.props.terminals[index[0]].name == this.state.selectedRow) { // unselect
            this.setState({selectedRow: -1});
        } else {
            var rowName = this.props.terminals[index[0]].name;
            this.setState({selectedRow: rowName});
        }
        this.props.select(this.props.terminals[index[0]]);
    },

    render() {
        var self = this;
        var sortedTerminals = _.sortBy(this.props.terminals, function(t) { return !t.required; });
        var terminals = _.map(sortedTerminals, function(term) {
            return (
                <TableRow key={term.name} selected={self.state.selectedRow == term.name}>
                    <TableRowColumn style={{width: "20%"}}>{term.name}</TableRowColumn>
                    <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>{term.description}</TableRowColumn>
                    <TableRowColumn style={{width: "10%"}}>{term.required ? <b>True</b> : "False"}</TableRowColumn>
                    <TableRowColumn>{term.domain == null ? "Unrestricted" : term.domain}</TableRowColumn>
                </TableRow>
            );
        });
        return (
        <Table enableSelectAll={false} selectable={true} onRowSelection={this.handleRowSelect}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn style={{width: "20%"}}>Name</TableHeaderColumn>
                    <TableHeaderColumn>Description</TableHeaderColumn>
                    <TableHeaderColumn style={{width: "10%"}}>Required</TableHeaderColumn>
                    <TableHeaderColumn>Domain</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
                {terminals}
            </TableBody>
        </Table>
        );
    },
});

export default DomainView;
