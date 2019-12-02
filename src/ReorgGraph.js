import React, { useState } from "react";
import '../node_modules/react-vis/dist/style.css';
import {
    FlexibleXYPlot,
    VerticalBarSeries,
    Hint,
    VerticalGridLines,
    HorizontalGridLines,
    YAxis,
    XAxis,
    ChartLabel,
} from 'react-vis';


const ReorgGraph = (props) => {
    /*
     * Generates the graph using reorg data in d3.
     */

    let data = props.data.map((entry) => {
        return {
            x: entry.timestamp,
            y: entry.reorg_length,
            name: entry.name,
        };
    });

    let [hovered, setHovered] = useState(null);

    // let generateHints = (data) => {
    //
    // };

    console.log(data);

    return (
      <FlexibleXYPlot xType="time">
          {/*<VerticalGridLines />*/}
          {/*<HorizontalGridLines />*/}
          <XAxis
              tickFormat = {d => new Date(d).toLocaleTimeString("en-US")}
              tickLabelAngle={45}
          />
          <YAxis />
          <VerticalBarSeries
              data={data}
              animation='gentle'
              barWidth={0.9}
              opacity={1}
              onValueMouseOver={datapoint => datapoint.x && datapoint.y ? setHovered(datapoint) : setHovered(null)}
              onValueMouseOut={datapoint => setHovered(null)}
          />

          {hovered ?
              <Hint value={hovered}>
                  Currency: {hovered.name}
                  <br/>
                  Reorg Length: {hovered.y}
                  <br/>
                  Timestamp of Reorg: {new Date(hovered.x).toLocaleDateString("en-US")} {new Date(hovered.x).toLocaleTimeString("en-US")}
              </Hint>
              : null }
              
      </FlexibleXYPlot>
    );
};

export default ReorgGraph;