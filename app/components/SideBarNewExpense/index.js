/**
*
* SideBarNewExpense
*
*/

import React from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
// images

const styles = {
  list: {
    overflowY: 'auto',
    paddingTop: 60,
  },
};

function SideBarNewExpense() {
  return (
    <div>
      <Drawer
        open
        width={300}
      >
        <List
          style={styles.list}
        >
          <Subheader>Categories</Subheader>
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Notifications"
            secondaryText="Allow notifications"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Sounds"
            secondaryText="Hangouts message"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Video sounds"
            secondaryText="Hangouts video call"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Notifications"
            secondaryText="Allow notifications"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Sounds"
            secondaryText="Hangouts message"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Video sounds"
            secondaryText="Hangouts video call"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Notifications"
            secondaryText="Allow notifications"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Sounds"
            secondaryText="Hangouts message"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Video sounds"
            secondaryText="Hangouts video call"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Notifications"
            secondaryText="Allow notifications"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Sounds"
            secondaryText="Hangouts message"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Video sounds"
            secondaryText="Hangouts video call"
          />
          <Divider />
        </List>
      </Drawer>
    </div>
  );
}

export default SideBarNewExpense;
