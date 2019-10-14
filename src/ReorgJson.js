import React, { useEffect, useState } from 'react';
import ReorgTable from "./ReorgTable";


const ReorgJson = (props) => {
    /*
     * Handles all the API requests and returns the raw JSON.
     * Functional component.
     */

    const [data, setData] = useState({});
    const [reorg_data, setReorgData] = useState({});

    async function getData(){
        const res = await fetch(props.request);
        let resJson = await res.json();
        // setData(resJson);
        // console.log(resJson, props.request);
        return resJson;
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
            timestamps: [],
            reorg_length: [],
            names: []
        };

        for (let i = 0; i < data.length; i++){
            reorgs.names.push(data[i].currency_name);
            reorgs.reorg_length.push(data[i].event.removed_blocks.length);
            reorgs.timestamps.push(data[i].event.added_blocks.slice(-1)[0].receipt_time);
        };

        console.log(reorgs);
        setReorgData(reorgs);
    };

    useEffect(() => {
        let getData = async () => {
            const res = await fetch(props.request);
            let resJson = await res.json();
            setData(resJson);
            console.log(resJson); // , props.request);
            // return resJson;
        };

        getData();
        getReorgs();
    }, []);

    useEffect(() => {

        // console.log(data, reorg_data);

        // lifecycle method
        const interval = setInterval( () => {
            getData();
            getReorgs();
        }, 5000);

        // when unmounted, clear the interval
        return () => clearInterval(interval);
    });

    return <ReorgTable data = {reorg_data} />;
    // return <div>{JSON.stringify(reorg_data)}</div>;
};

export default ReorgJson;