import React from 'react'
import LineChart from './LineChart';

export default function InOutData({ topicMetrics }): JSX.Element {
  return (
    topicMetrics.isLoading ? 
    <>Loading</> : 
    <ul>
      <li>Total Bytes In: {topicMetrics.data.data.totalBytesIn/1000} KBs</li>
      <li>Total Bytes Out: {topicMetrics.data.data.totalBytesOut/1000} KBs</li>
      <li>Total Bytes Rejected: {topicMetrics.data.data.bytesRejected/1000} KBs</li>
      <li><LineChart title={'Bytes In Per Topic'} metrics={topicMetrics.data}/></li>
    </ul>
  );
}
