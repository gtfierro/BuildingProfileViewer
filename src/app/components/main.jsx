var _ = require('lodash');
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';

import DomainView from './tag';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import FlatButton from 'material-ui/lib/flat-button';

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
    Colors.green100,
    Colors.lightGreen100,
    Colors.lime100,
    Colors.yellow100,
    Colors.amber100,
    Colors.orange100,
    Colors.deepOrange100,
];

const TEST_DATA = {
    id: "bc419dea-b410-11e5-8769-0cc47a0f7eea",
    path: "/",
    subdomains: [
      {
       path: "Properties",
       id: "f25a7500-b410-11e5-8769-0cc47a0f7eea"
      },
      {
        path: "Actuator",
        id: "15bc3394-b411-11e5-8769-0cc47a0f7eea"
      },
      {
        path: "Metadata",
        id: "1cc5dbe0-b411-11e5-8769-0cc47a0f7eea"
      }
    ]
};

const Main = React.createClass({

  getInitialState() {
    return {
        subdomains: [],
    };
  },

  componentWillMount() {
  },

  _menuItemPressed(e, item) {
    console.log("item", item);
  },

  render() {
    var self = this;
    var subdomainsList = _.map(this.state.subdomains, function(sub) {
        return <DomainView key={sub.id} domain={sub} color={getColor()} />;
    });
    return (
      <div>
        <AppBar 
            title="Building Profile Viewer"
            iconElementLeft={
                <IconMenu
                    iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="Home" onTouchTap={this._menuItemPressed} />
                </IconMenu>
                
            }
        />
        <br />
        <Paper zdepth={2}>
          <DomainView key={TEST_DATA.id} domain={TEST_DATA} parentPath=""/>
          {subdomainsList}
        </Paper>

        
      </div>
    );
  },
});

export default Main;
