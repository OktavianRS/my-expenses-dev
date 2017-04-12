/**
*
* TableBody
*
*/

import React from 'react';
import { TableBody, TableRow, TableRowColumn }
  from 'material-ui/Table';

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

function TableList() {
  return (
    <TableBody
      displayRowCheckbox={this.state.showCheckboxes}
      deselectOnClickaway={this.state.deselectOnClickaway}
      showRowHover={this.state.showRowHover}
      stripedRows={this.state.stripedRows}
    >
      {tableData.map((row, index) => (
        <TableRow key={index} selected={row.selected}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{row.name}</TableRowColumn>
          <TableRowColumn>{row.status}</TableRowColumn>
        </TableRow>
        ))}
    </TableBody>
  );
}

export default TableList;
