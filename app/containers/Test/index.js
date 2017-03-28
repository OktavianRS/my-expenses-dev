/*
 *
 * Test
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectTest from './selectors';
import axios from 'axios';

export class Test extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    axios({
      method: 'get',
      url: '/list-users',
    })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = selectTest();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
