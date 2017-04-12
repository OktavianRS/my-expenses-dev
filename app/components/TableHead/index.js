/**
*
* TableHead
*
*/

import React from 'react';
import { TableHeader, TableHeaderColumn, TableRow }
  from 'material-ui/Table';


const TableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHeaderColumn colSpan="1" tooltip="Super Header" style={{ textAlign: 'center' }}>
          Super Header
        </TableHeaderColumn>
        <TableHeaderColumn colSpan="1" tooltip="Super Header" style={{ textAlign: 'center' }}>
          Super Header
        </TableHeaderColumn>
        <TableHeaderColumn colSpan="1" tooltip="Super Header" style={{ textAlign: 'center' }}>
          Super Header
        </TableHeaderColumn>
      </TableRow>
    </TableHeader>
  );
};

export default TableHead;
