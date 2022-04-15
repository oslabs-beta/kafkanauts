import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RealTimeChart from "../chart_components/RealTimeChart";
import './SpecificMetric.css'

const client = axios.create({
  baseURL: 'http://localhost:8080/api/',
});


//create another state to store the array and control
//implement Que to store the data? of Array?
const SpecificMetric = ({ metricName }: { metricName: any }) => {
  const [metrics, setMetrics] = useState({
    kafka_server_brokertopicmetrics_bytesin_total: -Infinity,
    kafka_server_brokertopicmetrics_bytesout_total: -Infinity,
    kafka_server_brokertopicmetrics_bytesrejected_total: -Infinity,
    kafka_controller_kafkacontroller_globalpartitioncount: -Infinity,
    kafka_controller_kafkacontroller_globaltopiccount: -Infinity,
    kafka_controller_kafkacontroller_offlinepartitionscount: -Infinity,
    kafka_server_brokertopicmetrics_failedproducerequests_total: -Infinity,
    kafka_server_brokertopicmetrics_totalproducerequests_total: -Infinity,
  });

  // console.log('this is metrics1', metrics.kafka_server_brokertopicmetrics_totalproducerequests_total);

  useEffect(() => {
    (async function () {
      try {
        const metricsRequests = [
          client.get('/partition/total-count'),
          client.get('/partition/offline-count'),
          // client.get('/partition/under-replicated'),
          client.get('/producer/total-request-count'),
          client.get('/producer/total-failed-count'),
          client.get('/topic/total-count'),
        ];
        const metricsResponses = await Promise.all(metricsRequests);
        const metricsResponsesParse = metricsResponses.reduce((acc: any, curr: any) => {
          const { data } = curr;
          acc[data[0].metric.__name__] = data[0].value[1];
          return acc;
        }, {});

        const { data } = await client.get('/topic/metrics');

        const byteMetrics = data.reduce((acc: any, curr: any) => {
          const index = curr[0];
          acc[index.metric.__name__] = index.value[1];
          return acc;
        }, {});

        setMetrics({ ...byteMetrics, ...metricsResponsesParse });
      } catch (e) {
        return <p>Error in retrieving metrics</p>;
      }
    })()
  }, [])

  console.log("test", metrics.kafka_controller_kafkacontroller_globalpartitioncount)

  return (
    <>
      {((metricName) => {
        switch (metricName) {
          case 'Partition':
            return (

              <div className='container'>
                <div>
                  <div>Total Partition Count:{' '}</div>
                  <div className={metrics.kafka_controller_kafkacontroller_globalpartitioncount <= 0 ? 'rectangle-red' : 'rectangle-green'} >
                    {metrics.kafka_controller_kafkacontroller_globalpartitioncount}
                  </div>
                </div>
                <div>
                  <div>Offline Partition Count:{' '}</div>
                  <div style={{display: "grid"}}>
                  <div className={metrics.kafka_controller_kafkacontroller_offlinepartitionscount <= 0 ? 'rectangle-red' : 'rectangle-green'} style={{position: "relative"}}>
                    {metrics.kafka_controller_kafkacontroller_offlinepartitionscount}
                    </div>
                  </div>
                </div>
              </div>

            );
          case 'Producer':
            return (
              <ul>
                <li>
                  Total Producer Requests:{' '}
                  {metrics.kafka_server_brokertopicmetrics_totalproducerequests_total}
                </li>
                <li>
                  Total Failed Producer Requests:{' '}
                  {metrics.kafka_server_brokertopicmetrics_totalproducerequests_total}
                </li>
              </ul>
            );
          case 'Topic':
            return (
              <ul>
                <li>
                  Total Topic Count: {metrics.kafka_controller_kafkacontroller_globaltopiccount}
                </li>
                {/* <li>Total Topic Metrics: </li> */}
              </ul>
            );
          case 'Consumer':
            return <p>Coming Soon!!!</p>;
          case 'In/Out':
            return (
              <ul>
                <li>Total Bytes In: {metrics.kafka_server_brokertopicmetrics_bytesin_total} KBs</li>
                <li>
                  Total Bytes Out: {metrics.kafka_server_brokertopicmetrics_bytesout_total} KBs
                </li>
                <li>
                  Total Bytes Rejected:{' '}
                  {metrics.kafka_server_brokertopicmetrics_bytesrejected_total} KBs
                </li>
                <li><RealTimeChart metrics={metrics} /></li>
              </ul>
            );
          default:
            return <h6>Loading...</h6>;
        }
      })(metricName)}
    </>
  );
};

export default SpecificMetric;
