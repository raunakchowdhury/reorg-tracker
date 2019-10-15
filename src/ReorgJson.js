import React, { useEffect, useState } from 'react';
import ReorgTable from "./ReorgTable";


const ReorgJson = (props) => {
    /*
     * Handles the reorg API request and generates the data for the reorgs.
     * Functional component.
     */

    const [reorg_data, setReorgData] = useState([]);

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

        const res = await fetch(props.request);
        let data = await res.json();


        let reorgs = [];

        for (let i = 0; i < data.length; i++){
            reorgs.push({
                id: i,
                name: data[i].currency_name,
                reorg_length: data[i].event.removed_blocks.length,
                timestamp: data[i].event.added_blocks.slice(-1)[0].receipt_time * 1000
            });
        };

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
            <div key={reorg_data}>
                <ReorgTable data = {reorg_data} />
            </div>
        </>

    );
};

export default ReorgJson;