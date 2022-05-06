import React, { useState, useEffect } from 'react'
import RealTimeChart from './RealTimeChart'

export default function OverviewData({ overviewMetrics }): JSX.Element {
    const [chartData, setChartData] = useState([
        { data: [{ primary: new Date(), secondary: 0 }], label: "ApiVersions" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "CreateTopics" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "Fetch" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "FetchConsumer" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "FindCoordinator" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "Heartbeat" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "JoinGroup" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "LeaderAndIsr" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "Metadata" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "OffsetCommit" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "OffsetFetch" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "Produce" },
        { data: [{ primary: new Date(), secondary: 0 }], label: "SyncGroup" },
    ]);

        if (overviewMetrics.data) {
            console.log('this is ow', overviewMetrics.data);
        }

        //overviewMetrics.data[0].value

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
            }
            setChartData(chartData)
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