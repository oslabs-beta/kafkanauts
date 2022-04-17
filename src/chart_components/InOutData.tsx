import React from 'react'

export default function InOutData({ topicMetrics }): JSX.Element {
  return (
    topicMetrics.isLoading ? 
    <>Loading</> : 
    <ul>
      <li>Total Bytes In: {topicMetrics.data[0][0].value[1]/1000} KBs</li>
      <li>
        Total Bytes Out: {topicMetrics.data[1][0].value[1]/1000} KBs
      </li>
      <li>
        Total Bytes Rejected:{' '}
        {topicMetrics.data[2][0].value[1]} KBs
      </li>
      {/* <li><RealTimeChart metrics={metrics} /></li> */}
    </ul>
  );
}
