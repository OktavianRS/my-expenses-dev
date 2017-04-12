/*
 *
 * Registration
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectRegistration from './selectors';
import { Link } from 'react-router';

import { tryRegister } from './actions';

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
  }
};

export class Registration extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleRegistration(e) {
    e.preventDefault();
    this.props.register({
      username: e.target.login_expense.value,
      password: e.target.password_expense.value,
    });
  }
  render() {
    return (
      <div style={styles.wrapper}>
        <Paper style={styles.paper} zDepth={1} >
          <h2 style={styles.header}>SignUp</h2>
          <form onSubmit={this.handleRegistration.bind(this)}>
            <TextField
              style={styles.input}
              hintText="Login"
              name="login_expense"
              fullWidth
            />
            <TextField
              name="password_expense"
              style={styles.input}
              hintText="Password"
              fullWidth
              type="password"
            />
            <RaisedButton
              label="SignUP"
              primary
              style={styles.button}
              type="submit"
              fullWidth
            />
            <div style={styles.container}>
              <span>Don't have an account ? </span>
              <Link to="/login">Sign In</Link>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

Registration.propTypes = {
  register: React.PropTypes.func,
};

const mapStateToProps = selectRegistration();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    register: (data) => {
      dispatch(tryRegister(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
