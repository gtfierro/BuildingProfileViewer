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

var SelectableList = SelectableContainerEnhance(List);

var _colorIndex = 0;
function getColor() {
    var ret = _colorIndex;
    _colorIndex = (_colorIndex + 1) % colorCycle.length;
    return colorCycle[ret];
}

const colorCycle = [
    Colors.red100,
    Colors.pink100,
    Colors.purple100,
    Colors.deepPurple100,
    Colors.indigo100,
    Colors.blue100,
    Colors.lightBlue100,
    Colors.cyan100,
    //Colors.teal100,
    Colors.green100,
    Colors.lightGreen100,
    Colors.lime100,
    Colors.yellow100,
    Colors.amber100,
    Colors.orange100,
    Colors.deepOrange100,
];

const DomainView = React.createClass({
    getInitialState() {
        return {
            fullPath: this.props.parentPath + '/' + this.props.domain.root,
            selectedSubdomain: -1,
            childDomain: (<span></span>),
        }
    },

    handleSubdomainSelect(e, subdomain) {
        this.setState({selectedSubdomain: subdomain});
    },

    openSubdomain(subdomain) {
        // find the domain
        var actualDoc = _.filter(MORE_DATA, function(doc) {
            return doc.id === subdomain.id;
        });
        if (actualDoc.length == 1) {
          console.log("FOUND", actualDoc[0]);
          var child = <DomainView key={subdomain.id} parentPath={this.state.fullPath} domain={actualDoc[0]} color={getColor()} />;
          this.setState({childDomain: child});
        } else {
        }
    },

    render() {
        var self = this;
        var title = (<b>Path: {this.state.fullPath}</b>);
        var subtitle = (<b>ID: {this.props.domain.id}</b>);
        var subdomains = _.map(this.props.domain.subdomains, function(sub) {
            return <ListItem value={sub.id} key={sub.id} path={sub.path} onTouchTap={self.openSubdomain.bind(null, sub)}>{sub.path}</ListItem>
        });
        return (
            <div style={{paddingTop: 20, paddingLeft: 20}}>
              <Card>
                <CardHeader style={{backgroundColor: this.props.color == null ? Colors.teal100 : this.props.color }} title={title} subtitle={subtitle} />
                <Divider />
                <CardText>
                    <h3>Terminals</h3>
                        {this.props.domain.terminals != null ? <TerminalTable terminals={this.props.domain.terminals} /> : <p>None</p>}
                    <h3>Subdomains</h3>
                    <SelectableList valueLink={{value: this.state.selectedSubdomain, requestChange: this.handleSubdomainSelect}}>
                        {subdomains}
                    </SelectableList>
                </CardText>
              </Card>
              <br />
              {this.state.childDomain}
            </div>
        )
    },
});

const TerminalTable = React.createClass({
    render() {
        var terminals = _.map(this.props.terminals, function(term) {
            return (
                <TableRow key={term.name}> 
                    <TableRowColumn style={{width: "10%"}}>{term.name}</TableRowColumn>
                    <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>{term.description}</TableRowColumn>
                    <TableRowColumn style={{width: "10%"}}>{term.required ? "True" : "False"}</TableRowColumn>
                    <TableRowColumn>{term.domain == null ? "Unrestricted" : term.domain}</TableRowColumn>
                </TableRow>
            );
        });
        return (
        <Table showRowHover={true} enableSelectAll={false}>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn style={{width: "10%"}}>Name</TableHeaderColumn>
                    <TableHeaderColumn>Description</TableHeaderColumn>
                    <TableHeaderColumn style={{width: "10%"}}>Required</TableHeaderColumn>
                    <TableHeaderColumn>Domain</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {terminals}
            </TableBody>
        </Table>
        );
    },
});

const MORE_DATA = [
    {
        "terminals": [
            {
                "required": true,
                "name": "UnitofMeasure",
                "description": "Engineering units for the stream\n"
            },
            {
                "default": "ms",
                "domain": "c677c8f6-b411-11e5-8769-0cc47a0f7eea",
                "required": false,
                "name": "UnitofTime",
                "description": "The units for the stream's timestamps.\n"
            },
            {
                "domain": "25fc8d20-b412-11e5-8769-0cc47a0f7eea",
                "required": true,
                "name": "StreamType",
                "description": "The data type of the stream. Numeric is any integer (signed or unsigned) or float. An Object is any JSON-serializable construct\n"
            },
            {
                "default": "UTC",
                "domain": "85ed1664-b412-11e5-8769-0cc47a0f7eea",
                "required": false,
                "name": "Timezone",
                "description": "The timezone of this stream's timestamps\n"
            }
        ],
        "root": "Properties",
        "id": "f25a7500-b410-11e5-8769-0cc47a0f7eea"
    },
    {
        "terminals": [
            {
                "required": true,
                "name": "SourceName",
                "description": "This is the top-level name used by the plotter to index the data sources\n"
            }
        ],
        "root": "Metadata",
        "id": "d47c01aa-b412-11e5-8769-0cc47a0f7eea",
        "subdomains": [
            {
                "path": "Location",
                "id": "e7264c48-b412-11e5-8769-0cc47a0f7eea"
            },
            {
                "path": "Point",
                "id": "ec5b1ef0-b412-11e5-8769-0cc47a0f7eea"
            },
            {
                "path": "Device",
                "id": "ef6af0c0-b412-11e5-8769-0cc47a0f7eea"
            }
        ]
    },
    {
        "terminals": [
            {
                "required": false,
                "name": "Building",
                "description": "The name of the building containing the stream. Use the full name of the building\n"
            },
            {
                "required": false,
                "name": "Floor",
                "description": "The name of the floor containing the stream. Use a number whenever possible\n"
            },
            {
                "required": false,
                "name": "Room",
                "description": "The name of the room containing the stream. Use a number whenever possible\n"
            },
            {
                "domain": "cd6aa1d6-b413-11e5-8769-0cc47a0f7eea",
                "required": false,
                "name": "Exposure",
                "description": "The cardinal direction this stream is concerned with\n"
            }
        ],
        "root": "Location",
        "id": "e7264c48-b412-11e5-8769-0cc47a0f7eea"
    },
    {
        "terminals": [
            {
                "domain": "6a8e4670-b414-11e5-8769-0cc47a0f7eea",
                "required": true,
                "name": "Type",
                "description": "Describes at a high level the role of the stream\n"
            },
            {
                "domain": "47857292-b415-11e5-8769-0cc47a0f7eea",
                "required": false,
                "name": "Sensor",
                "description": "What the transducer associated with this stream measures\n"
            },
            {
                "required": false,
                "name": "State",
                "description": "What device setting this stream reflects\n"
            },
            {
                "required": false,
                "name": "Setpoint",
                "description": "Which writable setting this stream influences\n"
            },
            {
                "required": false,
                "name": "Command",
                "description": "Which writable setting this stream can actuate\n"
            }
        ],
        "root": "Point",
        "id": "ec5b1ef0-b412-11e5-8769-0cc47a0f7eea"
    },
    {
        "terminals": [
            {
                "required": false,
                "name": "Manufacturer",
                "description": "The name of the manufacturer for this device\n"
            },
            {
                "required": false,
                "name": "Model",
                "description": "The model of the device\n"
            }
        ],
        "root": "Device",
        "id": "ef6af0c0-b412-11e5-8769-0cc47a0f7eea"
    }
]

export default DomainView;
