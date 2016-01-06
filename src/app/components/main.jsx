import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Paper from 'material-ui/lib/paper';

import DomainView from './tag';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';

const TEST_DATA = {
    id: "bc419dea-b410-11e5-8769-0cc47a0f7eea",
    root: "/",
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

  addSubdomain(subdomain) {
    console.log("add a sub domain", subdomain);
    var subdomains = this.state.subdomains;
    subdomains.push(subdomain);
    this.setState({subdomains: subdomains});
  },

  render() {
    var subdomainsList = [(<DomainView key={TEST_DATA.id} domain={TEST_DATA} addSubdomain={this.addSubdomain}/>)];
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
          {subdomainsList}
        </Paper>

        
      </div>
    );
  },
});

export default Main;
