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
      <JsonHook request="http://hubris.media.mit.edu:5000/reorgs?limit=50"/>
      {/*<JsonHook request="http://localhost:5000"/>*/}
    </div>
  );
}

const JsonHook = (props) => {
  /*
   * Handles all the API requests and returns the raw JSON.
   * Functional component.
   */

  // instantiate a state to store the JSON; parameter is what to store it in
  // called a hook
  const [data, setData] = useState({});

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

    // console.log(reorgs);
    return reorgs;

  }

  useEffect(() => {
    // getData();
    // getReorgs(data);
  });

  getData();
  // return the table here or something
  return <div>{JSON.stringify(getReorgs())}</div>;
};

const Table = (props) => {
  /*
   * Generates the table based on the data passed into it.
   */
}

export default App;
