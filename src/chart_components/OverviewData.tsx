import React, { useState, useEffect } from 'react'
import RealTimeChart from './RealTimeChart'

export default function OverviewData({ overviewMetrics }): JSX.Element {

    const initialTime = new Date(new Date().getTime() - 100000)
    console.log('overviewMetrics', overviewMetrics);
    
    const [chartData, setChartData] = useState([
        { data: [{ primary: initialTime, secondary: 0 }], label: "ApiVersions" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "CreateTopics" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "Fetch" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "FetchConsumer" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "FindCoordinator" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "Heartbeat" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "JoinGroup" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "LeaderAndIsr" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "Metadata" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "OffsetCommit" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "OffsetFetch" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "Produce" },
        { data: [{ primary: initialTime, secondary: 0 }], label: "SyncGroup" },
    ]);

    useEffect(() => {
        if (overviewMetrics.data) {
            
            for (let i = 0; i < 10 && i < overviewMetrics.data.length; i++) {
                if (chartData[i].data.length === 10) {
                    chartData[i].data.shift()
                }
                chartData[i].data.push(
                    {
                        primary: new Date(overviewMetrics.data[i].value[0] * 1000),
                        secondary: parseInt(overviewMetrics.data[i].value[1])
                    }
                )
                // console.log('this is ow', chartData[i]);
                // console.log('this is ow', chartData[i].data.length);
            }
            setChartData([...chartData])
            
        }
    }, [overviewMetrics.data]);
    // return <>hi</>
    return (
        <ul>
          <li>
            {
              overviewMetrics.isLoading ? 
              'Loading' : 
              'Total Failed Producer Requests: ' 
            }
          </li>
          <li><RealTimeChart metrics={chartData} /></li>
        </ul>
      );
}