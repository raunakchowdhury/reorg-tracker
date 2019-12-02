import React, { useEffect, useState } from 'react';

import ReorgTable from "./ReorgTable";
import ReorgGraph from "./ReorgGraph";


const ReorgJson = (props) => {
    /*
     * Handles the reorg API request and generates the data for the reorgs.
     * Functional component.
     */

    const [reorg_data, setReorgData] = useState([]);
    // keep track of window height


    async function getData() {
        /*
         * Returns the reorgs of the data in the form of a list.
         * Returned list mapping:
         * [
         *  timestamp : [ list of timestamps ]
         *  reorg_length: [ list of reorg lengths ]
         *  name: [ list of networks affected by the reorg ]
         * ]
         */

        const url = `http://hubris.media.mit.edu:5000/reorgs?limit=${props.number}`;
        // const url = `http://127.0.0.1:5000/${props.number}`;
        console.log(url);
        const res = await fetch(url);
        let data = await res.json();

        // double spends; potential issue with latency
        // const

        let reorgs = [];

        for (let i = 0; i < data.length; i++){
            let timestamp = data[i].event.added_blocks.slice(-1)[0].receipt_time * 1000;
            let parsed_time = `${new Date(timestamp).toLocaleDateString("en-US")} 
                ${new Date(timestamp).toLocaleTimeString("en-US")}`;

            reorgs.push({
                id: i,
                name: data[i].currency_name,
                reorg_length: data[i].event.removed_blocks.length,
                timestamp: timestamp
            });
        };
        // console.log(reorgs);
        setReorgData(reorgs);
    };

    useEffect(() => {

        // effect triggers once, on mount
        getData();

        // lifecycle method
        const interval = setInterval( () => {
            getData();
        }, 5000);

        // when unmounted, clear the interval
        return () => clearInterval(interval);
    }, []);

    return (
        // add multiple elements to DOM
        <>
            <div key='reorg_graph' style={{ height: '40em'}}>
                <ReorgGraph data = {reorg_data}/>
            </div>
            <div key='reorg_table'>
                <ReorgTable data = {reorg_data} />
            </div>
        </>

    );
};

export default ReorgJson;