import React from 'react'

export default function ConsumerData({ consumerLag }): JSX.Element {

  const dataObj = consumerLag.data;
  let consumerLagMetric;

  for (let prop in dataObj) {
    if (dataObj.hasOwnProperty(prop)) {
      //let lastIdx = data
      consumerLagMetric = dataObj[prop].values[0][1];
    }
  }

  
  return (
    consumerLag.isLoading ? 
    <>Loading</> : 
    <ul>
      <li>Consumer Lag: {consumerLagMetric} </li>
      {/* <li><RealTimeChart metrics={metrics} /></li> */}
      {/* <li>Consumer Total Time: {consumerTotalTime.data[0].value[1]} </li> */}
      {/* <li><RealTimeChart metrics={metrics} /></li> */}
    </ul>
  );
}