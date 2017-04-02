/*
 *
 * Login
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import selectLogin from './selectors';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { tryLogin } from './actions';

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
  container: {
    marginTop: 20,
    color: '#ccc',
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
  header: {
    fontWeight: 100,
  },
};

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleLogin(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(tryLogin({
      username: e.target.login.value,
      password: e.target.password.value,
    }));
  }
  render() {
    return (
      <div style={styles.wrapper}>
        <Paper style={styles.paper} zDepth={1} >
          <h2 style={styles.header}>SignIn</h2>
          <form onSubmit={this.handleLogin.bind(this)}>
            <TextField
              style={styles.input}
              hintText="Login"
              name="login"
              fullWidth
            />
            <TextField
              name="password"
              style={styles.input}
              hintText="Password"
              fullWidth
            />
            <RaisedButton
              label="SignIn"
              primary
              style={styles.button}
              type="submit"
              fullWidth
            />
            <div style={styles.container}>
              <span>Already have account ? </span>
              <Link to="/registration">Sign Up</Link>
            </div>
          </form>
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
