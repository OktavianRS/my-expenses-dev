/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

// Material-ui theme configs
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  notified,
  getUser,
  logout,
  createCategory,
} from './actions';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { createStructuredSelector } from 'reselect';
import { makeSelectNotification, makeSelectUser } from './selectors';
import Header from 'components/Header';
import CategorieModal from 'components/CategorieModal';

const styles = {
  snack: {
    bottom: 'none',
    top: 0,
  },
};

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
    username: React.PropTypes.string,
    notification: React.PropTypes.shape({
      notify: React.PropTypes.bool,
      message: React.PropTypes.string,
    }),
    disableNotification: React.PropTypes.func,
    logout: React.PropTypes.func,
    createCategory: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isCategoriesModalOpened: false,
    };
  }

  getChildContext() {
    return {
      username: this.props.username,
      openCategorieModal: this.state.isCategoriesModalOpened,
      logout: this.props.logout,
      handelCategorieModal: this.handelCategorieModal.bind(this),
      createCategory: this.props.createCategory,
    };
  }

  handelCategorieModal() {
    this.setState({
      isCategoriesModalOpened: !this.state.isCategoriesModalOpened,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Header />
          {React.Children.toArray(this.props.children)}
          <Snackbar
            open={this.props.notification.notify || false}
            message={this.props.notification.message || ''}
            autoHideDuration={4000}
            onRequestClose={this.props.disableNotification}
            style={styles.snack}
            action="close"
          />
          <CategorieModal />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  username: React.PropTypes.string,
  openCategorieModal: React.PropTypes.bool,
  logout: React.PropTypes.func,
  handelCategorieModal: React.PropTypes.func,
  createCategory: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
  username: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    disableNotification: () => {
      dispatch(notified());
    },
    getUserProfile: () => {
      dispatch(getUser());
    },
    logout: () => {
      dispatch(logout());
    },
    createCategory: (data) => {
      dispatch(createCategory(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
