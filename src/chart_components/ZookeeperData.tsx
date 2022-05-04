import React from 'react'

export default function ZookeeperData({ avgLatency }): JSX.Element {
  return (
    avgLatency.isLoading ? 
    <>Loading</> : 
    <ul>
      <li title={'zk-latency'} >Zookeeper Average Latency: {avgLatency.data[0].value[1]} ms</li>
      {/* <li><RealTimeChart metrics={metrics} /></li> */}
    </ul>
  );
}