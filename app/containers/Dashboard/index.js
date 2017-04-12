/*
 *
 * Dashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboard from './selectors';
import SideBarNewExpense from 'components/SideBarNewExpense';
import Chart from 'components/Chart';
import ExpensesTable from 'components/ExpensesTable';

const styles = {
  container: {
    paddingLeft: 300,
  },
};

export class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <SideBarNewExpense />
        <div style={styles.container}>
          <ExpensesTable />
          <Chart />
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectDashboard();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
