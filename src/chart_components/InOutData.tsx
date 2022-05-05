import React, { useState, useEffect } from 'react'
import RealTimeChart from './RealTimeChart'
import { Col } from '@themesberg/react-bootstrap';
import { CounterWidget } from '../components/Widget';

export default function InOutData({ topicMetrics, topicTotalCount }): JSX.Element {
  const [inData, setInData] = useState([]);
  const [outData, setOutData] = useState([]);
  useEffect(() => {
    setInData(prev => {
      const shallowCopyOfInData = [...prev]
      for (let i = 0; i < topicMetrics.data.bytesIn.length; i++) {
        const [topicName, bytes] = topicMetrics.data.bytesIn[i]
        const dateOfMetric = new Date(topicMetrics.time)
        const indexOfTopic = prev.findIndex(el => el.label === topicName)
        if (indexOfTopic < 0) {
          // if topic line doesnt exist in graph, then push the new line into "inData"
          const newLine = {
            label: topicName,
            data: [
              {
                primary: dateOfMetric,
                secondary: bytes,
              }
            ],
          }
          shallowCopyOfInData.push(newLine)
        } else {
          // if topic line already exists in graph, then just push new data point into "inData"
          const dataPoint = {
            primary: dateOfMetric,
            secondary: bytes,
          }
          shallowCopyOfInData[indexOfTopic].data.push(dataPoint)
  
          if (shallowCopyOfInData[indexOfTopic].data.length > 10) {
            shallowCopyOfInData[indexOfTopic].data.shift()
          }
        }
      }
      return shallowCopyOfInData
    })

    setOutData(prev => {
      const shallowCopyOfOutData = [...prev]
      for (let i = 0; i < topicMetrics.data.bytesOut.length; i++) {
        const [topicName, bytes] = topicMetrics.data.bytesOut[i]
        const dateOfMetric = new Date(topicMetrics.time)
        const indexOfTopic = prev.findIndex(el => el.label === topicName)
        if (indexOfTopic < 0) {
          // if topic line doesnt exist in graph, then push the new line into "inData"
          const newLine = {
            label: topicName,
            data: [
              {
                primary: dateOfMetric,
                secondary: bytes,
              }
            ],
          }
          shallowCopyOfOutData.push(newLine)
        } else {
          // if topic line already exists in graph, then just push new data point into "inData"
          const dataPoint = {
            primary: dateOfMetric,
            secondary: bytes,
          }
          shallowCopyOfOutData[indexOfTopic].data.push(dataPoint)
  
          if (shallowCopyOfOutData[indexOfTopic].data.length > 10) {
            shallowCopyOfOutData[indexOfTopic].data.shift()
          }
        }
      }
      return shallowCopyOfOutData
    })
  }, [topicMetrics]);


  return (
    <div>
      <div className='content-container'>
        <RealTimeChart metrics={inData} title='Bytes In Graph'/>
        <RealTimeChart metrics={outData} title='Bytes Out Graph' />
      </div>
      <div className='content-container'>
        <div>
        <CounterWidget
              category='Total Topic Count'
              title={`Instance: ${topicTotalCount.instance}`}
              value={topicTotalCount.data.numOfTopics}
              percentage={`Job: ${topicTotalCount.job}`}
            />     
            </div>
            <div>
        <CounterWidget
              category='Total Bytes In'
              title={`Instance: ${topicTotalCount.instance}`}
              value={(topicMetrics.data.totalBytesIn/1000).toLocaleString()}
              percentage={`Job: ${topicTotalCount.job}`}
            />     
            </div>
            <div>
        <CounterWidget
              category='Total Bytes Out'
              title={`Instance: ${topicTotalCount.instance}`}
              value={(topicMetrics.data.totalBytesOut/1000).toLocaleString()}
              percentage={`Job: ${topicTotalCount.job}`}
            />     
            </div>
            <div>
        <CounterWidget
              category='Total Bytes Rejected'
              title={`Instance: ${topicTotalCount.instance}`}
              value={(topicMetrics.data.bytesRejected/1000).toLocaleString()}
              percentage={`Job: ${topicTotalCount.job}`}
            />     
            </div>
        {/* <div>Total Topic Count: {topicTotalCount.data.numOfTopics}<br/>Instance: {topicTotalCount.instance}<br/>Job: {topicTotalCount.job}<br/></div> */}
        {/* <div>Total Bytes In: {(topicMetrics.data.totalBytesIn/1000).toLocaleString()} KBs</div>
        <div>Total Bytes Out: {(topicMetrics.data.totalBytesOut/1000).toLocaleString()} KBs</div>
        <div>Total Bytes Rejected: {(topicMetrics.data.bytesRejected/1000).toLocaleString()} KBs</div> */}
      </div>
    </div>
  );
}
