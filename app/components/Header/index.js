/**
*
* Header
*
*/

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// images
import logo from 'img/logo.png';

const styles = {
  appBar: {
    zIndex: 1301,
  },
};

const Menu = (props, context) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem
      primaryText="Create Category"
      onTouchTap={context.handelCategorieModal}
    />
    <MenuItem
      primaryText="Sign out"
      onTouchTap={context.logout}
    />
  </IconMenu>
);

Menu.contextTypes = {
  logout: React.PropTypes.func,
  handelCategorieModal: React.PropTypes.func,
};

Menu.muiName = 'IconMenu';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    handleLogout: React.PropTypes.func,
  }
  render() {
    return (
      <div>
        <AppBar
          title="My expenses"
          style={styles.appBar}
          iconElementLeft={<Avatar src={logo} />}
          iconElementRight={<Menu />}
        />
      </div>
    );
  }
}

Header.contextTypes = {
  username: React.PropTypes.string,
};

export default Header;
