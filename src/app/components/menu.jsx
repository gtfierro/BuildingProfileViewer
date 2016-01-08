var _ = require('lodash');
var YAML = require('yamljs');
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import {Link} from 'react-router';

const Menu = React.createClass({
    render() {
        return (
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
                  <MenuItem linkButton containerElement={<Link to='/home' />} primaryText="Home" />
                  <MenuItem linkButton containerElement={<Link to='/about' />} primaryText="About" />
                </IconMenu>
                
            }
        />);
    }
});

export default Menu;
