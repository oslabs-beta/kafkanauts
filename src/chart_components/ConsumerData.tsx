import React, { useState, useEffect } from 'react'
import RealTimeChart from './RealTimeChart'

export default function ConsumerData({ consumerLag }): JSX.Element {
  
  const initialTime = new Date(new Date().getTime() - 100000)
  const [chartData, setChartData] = useState([

    
    { data: [{primary: initialTime,secondary:0}], label: "Consumer Lag" },
  ]);

  useEffect(() => {
    if (consumerLag.data) {
     
      for (let i = 0; i < consumerLag.data.length; i++) {
        if (chartData[i].data.length === 100 ) {
          chartData[i].data.shift()
        }
        chartData[i].data.push(
          {
            primary: new Date(consumerLag.data[i].values[0][0] * 1000),
            secondary: parseInt(consumerLag.data[i].values[0][1])
          }
        )
      }
      setChartData([...chartData])  
    }
  }, [consumerLag.data]);
  
  return (
    consumerLag.isLoading ? 
    <>Loading</> : 
    <div className='content-container'>
      <RealTimeChart metrics={chartData} title={'Consumer Lag'}/>
    </div>
  );
}