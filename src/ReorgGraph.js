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
            y: entry.reorg_length
        };
    });

    let [hovered, setHovered] = useState(null);

    // let generateHints = (data) => {
    //
    // };

    console.log(data);

    return (
      <FlexibleXYPlot>
          {/*<VerticalGridLines />*/}
          {/*<HorizontalGridLines />*/}
          <XAxis
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

          {/*{data.map((ele) =>*/}
          {/*    <Hint value={ele}></Hint>,*/}
          {/*)}*/}

          {hovered ?
              <Hint value={hovered}></Hint>
              : null }

          {/*<Hint value={}>*/}

          {/*</Hint>*/}

          {/*<ChartLabel*/}
          {/*    text='Time'*/}
          {/*    className="alt-x-label"*/}
          {/*    xPercent={0.9}*/}
          {/*    yPercent={0.65}*/}
          {/*    style={{*/}
          {/*        transform: 'rotate(90)',*/}
          {/*        textAnchor: 'end'*/}
          {/*    }}*/}
          {/*/>*/}
          {/*<Hint>*/}
          {/*    */}
          {/*</Hint>*/}
      </FlexibleXYPlot>
    );
};

export default ReorgGraph;