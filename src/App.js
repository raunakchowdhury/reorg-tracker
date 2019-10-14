import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      <ReorgJson request="http://hubris.media.mit.edu:5000/reorgs?limit=50"/>
    </div>
  );
}

const ReorgJson = (props) => {
  /*
   * Handles all the API requests and returns the raw JSON.
   * Functional component.
   */

  const [data, setData] = useState({});
  const [reorg_data, setReorgData] = useState({});
  const [wait_time, setWaitTime] = useState(0);

  async function getData(){
    const res = await fetch(props.request);
    // console.log(res);
    res
        .json()
        .then(res => setData(res))
        .catch(console.log)
  };

  function getReorgs(){
    /*
     * Returns the reorgs of the data in the form of a dictionary.
     * Returned dict mapping:
     * {
     *  timestamps : [ list of timestamps ]
     *  reorg_lengths: [ list of reorg lengths ]
     *  names: [ list of networks affected by the reorg ]
     * }
     * Index mapping is used to keep all the reorgs in order (so timestamps[i], reorg_lengths[i], names[i] all refer to the same reorg).
     */
    let reorgs = {
      "timestamps": [],
      "reorg_length": [],
      "names": []
    };

    for (let i = 0; i < data.length; i++){
      reorgs.names.push(data[i].currency_name);
      reorgs.reorg_length.push(data[i].event.removed_blocks.length);
      reorgs.timestamps.push(data[i].event.added_blocks.slice(-1)[0].receipt_time);
    };

    console.log(reorgs);
    setWaitTime(5000);
    setReorgData(reorgs);
  };

  useEffect(() => {

    // lifecycle method
    const timer = setTimeout( () => {
      getData().then(() => getReorgs);
      // getReorgs();
    }, wait_time);

    // when unmounted, clear the interval
    return () => clearTimeout(timer);
  });

  return <ReorgTable data = {reorg_data} />;
};

const ReorgTable = (props) => {
  /*
   * Generates the table based on the data passed into it.
   */

  const [jsx_data, changeData] = useState([]);

  useEffect(() => {
    generate();
  }, []);

  function generate(){
    /*
     * Generates the JSX array.
     */

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

    changeData(table_array);
  };

  // generate();
  return (
      <table>
        <tbody>{jsx_data}</tbody>
      </table>
  );

};

export default App;
