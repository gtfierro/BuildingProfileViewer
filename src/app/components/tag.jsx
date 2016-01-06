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
    Colors.teal100,
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
            selectedSubdomain: -1,
        }
    },

    handleSubdomainSelect(e, subdomain) {
        this.setState({selectedSubdomain: subdomain});
    },

    openSubdomain(subdomain) {
        this.props.addSubdomain(subdomain);
    },

    render() {
        var self = this;
        var title = (<b>Path: {this.props.domain.root}</b>);
        var subtitle = (<b>ID: {this.props.domain.id}</b>);
        var subdomains = _.map(this.props.domain.subdomains, function(sub) {
            return <ListItem value={sub.id} key={sub.id} path={sub.path} onTouchTap={self.openSubdomain.bind(null, sub)}>{sub.path}</ListItem>
        });
        return (
            <div>
              <Card>
                <CardHeader style={{backgroundColor: Colors.teal100}} title={title} subtitle={subtitle} />
                <Divider />
                <CardText>
                    <h3>Subdomains</h3>
                    <SelectableList valueLink={{value: this.state.selectedSubdomain, requestChange: this.handleSubdomainSelect}}>
                        {subdomains}
                    </SelectableList>
                </CardText>
              </Card>
            </div>
        )
    },
});

export default DomainView;
