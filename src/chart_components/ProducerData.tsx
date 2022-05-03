import React, {useState, useEffect } from 'react'
import RealTimeChart from './RealTimeChart'

export default function ProducerData({ producerTotalFailCount, producerMetrics }): JSX.Element {

  const initialTime = new Date(new Date().getTime() - 100000)

  const [chartData, setChartData] = useState([
    { data: [{primary: initialTime,secondary:0}], label: "Total Producer Requests" },
    { data: [{primary: initialTime,secondary:0}], label: "Total Producer Time" }]);


    useEffect(() => {
      if (producerMetrics.data) {
        for (let i = 0; i < producerMetrics.data.length; i++) {
          if (chartData[i].data.length === 10) {
            chartData[i].data.shift()
          }
          chartData[i].data.push(
            {
              primary: new Date(producerMetrics.data[i][0].value[0] * 1000),
              secondary: parseInt(producerMetrics.data[i][0].value[1])
            }
          )
        }
        setChartData([...chartData])
      }
    }, [producerMetrics.data]);

  return (
    <ul>
      <li>
        {
          producerTotalFailCount.isLoading ? 
          'Loading' : 
          'Total Failed Producer Requests: ' + producerTotalFailCount.data[0].value[1]
        }
      </li>
      <li><RealTimeChart metrics={chartData} /></li>
    </ul>
  );
}
