import React, { useState, useEffect } from 'react'
import RealTimeChart from './RealTimeChart'

export default function ConsumerData({ consumerLag }): JSX.Element {

  // const dataObj = consumerLag.data;
  // let consumerLagMetric;

  // for (let prop in dataObj) {
  //   if (dataObj.hasOwnProperty(prop)) {
  //     //let lastIdx = data
  //     consumerLagMetric = dataObj[prop].values[0][1];
  //   }
  // }

  // console.log('this is consumerlag', consumerLag.data[0].values[1])


  const [chartData, setChartData] = useState([
    { data: [{primary: new Date(new Date().getTime()),secondary:0}], label: "Consumer Lag" },
  ]);

  useEffect(() => {
    if (consumerLag.data) {
      for (let i = 0; i < consumerLag.data.length; i++) {
        // console.log("this is consumerLag", consumerLag.data[0].values[0][1])
        if (chartData[i].data.length === 10) {
          chartData[i].data.shift()
        }
        chartData[i].data.push(
          {
            primary: new Date(consumerLag.data[i].values[0][0] * 1000),
            secondary: parseInt(consumerLag.data[i].values[0][1])
          }
        )
      }
      setChartData(chartData)
    }
  }, [consumerLag.data]);
  
  return (
    consumerLag.isLoading ? 
    <>Loading</> : 
    <ul>
      {/* <li>Consumer Lag: {consumerLagMetric} </li> */}
      <li><RealTimeChart metrics={chartData} /></li>
      {/* <li><RealTimeChart metrics={metrics} /></li> */}
      {/* <li>Consumer Total Time: {consumerTotalTime.data[0].value[1]} </li> */}
      {/* <li><RealTimeChart metrics={metrics} /></li> */}
    </ul>
  );
}