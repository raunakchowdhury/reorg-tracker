import React, { useEffect, useState } from "react";

const ReorgTable = (props) => {
  console.log(props.data);
  let table_array = [
    <tr key="header-row">
      <th key="time">Time</th>
      <th key="name">Name</th>
      <th key="length">Length of Reorg</th>
    </tr>
  ];

  for (let row = 0; row < props.data.length; row++){
    table_array.push(
      <tr key="header_{row}">
        <td key="timestamp_{row}">{props.data.timestamps[row]}</td>
        <td key="name_{row}">{props.data.names[row]}</td>
        <td key="reorg_{row}">{props.data.reorg_length[row]}</td>
      </tr>
    );
  };
 return (
   <table>
     <tbody>{table_array}</tbody>
   </table>
 );

};

export default ReorgTable;
