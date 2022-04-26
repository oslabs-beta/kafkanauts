import React from 'react'

export default function ConsumerData({ consumerLag, consumerTotalTime }): JSX.Element {

  const dataObjArr = [ consumerLag.data, consumerTotalTime.data ];

  
  let consumerMetrics = [];

  for (let i = 0; i < dataObjArr.length; i += 1) {
    for (let prop in dataObjArr[i]) {
      if (dataObjArr[i].hasOwnProperty(prop)) {
        consumerMetrics.push(dataObjArr[i][prop].values[0][1]);
      }
    }
  }

  
  return (
    consumerLag.isLoading ? 
    <>Loading</> : 
    <ul>
      <li>Consumer Lag: {consumerMetrics[0]} </li>
      {/* <li><RealTimeChart metrics={metrics} /></li> */}
      <li>Consumer Total Time: {consumerMetrics[1]} </li>
      {/* <li><RealTimeChart metrics={metrics} /></li> */}
    </ul>
  );
}