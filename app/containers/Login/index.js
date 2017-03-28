/*
 *
 * Login
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectLogin from './selectors';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// images
import background from 'img/flat_background.png';

const styles = {
  wrapper: {
    position: 'absolute',
    background: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  paper: {
    width: 400,
    margin: '20vh auto',
    padding: 40,
  },
  input: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
}

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={styles.wrapper}>
        <Paper style={styles.paper} zDepth={1} >
          <TextField
            style={styles.input}
            hintText="Login"
            fullWidth
          />
          <TextField
            style={styles.input}
            hintText="Password"
            fullWidth
          />
        <RaisedButton label="Login" primary style={styles.button} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = selectLogin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
