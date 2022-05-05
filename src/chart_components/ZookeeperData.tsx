import React, { useState, useEffect } from 'react'
import RealTimeChart from './RealTimeChart'
import { CounterWidget } from '../components/Widget';

export default function ZookeeperData({ avgLatency, health }): JSX.Element {
  const [latencyData, setLatencyData] = useState([]);
  const zkWidgets = []
  for (const name in health.data) {
    zkWidgets.push(<div key={name}>
      <CounterWidget 
        category={name}
        title={`Instance: ${health.instance}`}
        value={health.data[name]}
        percentage={`Job: ${health.job}`}
      />
    </div>)
  }
  useEffect(() => {
    setLatencyData(prev => {
      const shallowCopyOfLat = [...prev]
      const [timeStamp, value] = avgLatency[0].value
      const time = new Date(timeStamp)
      if (shallowCopyOfLat.length === 0) {
        const newLine = {
          label: 'Latency',
          data: [
            {
              primary: time,
              secondary: value,
            }
          ],
        }
        shallowCopyOfLat.push(newLine)
      } else {
        const dataPoint = {
          primary: time,
          secondary: value,
        }
        shallowCopyOfLat[0].data.push(dataPoint)
      }
      return shallowCopyOfLat
    })
  }, [health])
  return (
    <div>
      <div className='content-container'>
        <div>ZooKeeper Latency Graph <RealTimeChart metrics={latencyData}/></div>
      </div>
      <div className='content-container'>
        {zkWidgets}
        {/* <div>
        <CounterWidget
              category='Total Topic Count'
              title={`Instance: ${topicTotalCount.instance}`}
              value={topicTotalCount.data.numOfTopics}
              percentage={`Job: ${topicTotalCount.job}`}
            />
            </div> */}
        {/* <div>Total Topic Count: {topicTotalCount.data.numOfTopics}<br/>Instance: {topicTotalCount.instance}<br/>Job: {topicTotalCount.job}<br/></div> */}
        {/* <div>Total Bytes In: {(topicMetrics.data.totalBytesIn/1000).toLocaleString()} KBs</div>
        <div>Total Bytes Out: {(topicMetrics.data.totalBytesOut/1000).toLocaleString()} KBs</div>
        <div>Total Bytes Rejected: {(topicMetrics.data.bytesRejected/1000).toLocaleString()} KBs</div> */}
      </div>
    </div>
  );
}