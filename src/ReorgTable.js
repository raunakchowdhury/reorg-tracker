import React from "react";

const ReorgTable = (props) => {
    /*
     * Generates the table based on the data passed into it.
     */

    let jsx_data = [
        <tr key="header-row">
            <th key="time">Time</th>
            <th key="name">Name</th>
            <th key="length">Length of Reorg</th>
        </tr>
    ];

    for (let row = 0; row < props.data.length; row++){
        // console.log(props.data[row].timestamp, props.data[row].name, props.data[row].reorg_length);
        jsx_data.push(
            <tr key={`header_${row}`}>
                <td key={`timestamp_${row}`}>{`${new Date(props.data[row].timestamp).toLocaleDateString("en-US")} ${new Date(props.data[row].timestamp).toLocaleTimeString("en-US")}`}</td>
                <td key={`name_${row}`}>{props.data[row].name}</td>
                <td key={`reorg_${row}`}>{props.data[row].reorg_length}</td>
            </tr>
        );
    };


    return (
        <table>
            <tbody>{jsx_data}</tbody>
        </table>
    );

};

export default ReorgTable;