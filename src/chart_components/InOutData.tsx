import React, { useState, useEffect } from 'react'
import RealTimeChart from './RealTimeChart'

export default function InOutData({ topicMetrics }): JSX.Element {


  //setting the first element in array to 0
  //change label based on what you want the new labels to be
  const [chartData, setChartData] = useState([
    { data: [{primary: new Date(new Date().getTime()),secondary:0}], label: "Total Bytes Out" },
    { data: [{primary: new Date(new Date().getTime()),secondary:0}], label: "Total Bytes In" },
    { data: [{primary: new Date(new Date().getTime()),secondary:0}], label: "Total Bytes Rejected" }]);


    //push element into chartData - and shift it after it reaches 10 length.
    //Data comes in the form of a string so needs to be parsed to a number
  useEffect(() => {
    if (topicMetrics.data) {
      for (let i = 0; i < topicMetrics.data.length; i++) {
        if (chartData[i].data.length === 10) {
          chartData[i].data.shift()
        }
        chartData[i].data.push(
          {
            primary: new Date(topicMetrics.data[i][0].value[0] * 1000),
            secondary: parseInt(topicMetrics.data[i][0].value[1])
          }
        )
      }
      setChartData(chartData)
    }
  }, [topicMetrics.data]);


  return (
    topicMetrics.isLoading ?
      <>Loading</> :
      <ul>
        <li>Total Bytes In: {topicMetrics.data[0][0].value[1] / 1000} KBs</li>
        <li>
          Total Bytes Out: {topicMetrics.data[1][0].value[1] / 1000} KBs
        </li>
        <li>
          Total Bytes Rejected:{' '}
          {topicMetrics.data[2][0].value[1]} KBs
        </li>
        <li><RealTimeChart metrics={chartData} /></li>
      </ul>
  );
}
