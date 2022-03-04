import React, { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

const SpecificMetric = ({ metricName }) => {
  const [metrics, setMetrics] = useState({
    topicCount: 6,
  });

  useEffect(async () => {
    try {
      const metricsRequests = [
        // client.get('/partition/total-count'),
        // client.get('/partition/offline-count'),
        client.get('/producer/total-request-count'),
        client.get('/producer/total-failed-count'),
        client.get('/topic/total-count'),
        // client.get('/topic/metrics'),
      ];
      // const metricsResponses = await Promise.all(metricsRequests);
      const { data } = await client.get('/topic/metrics');
      console.log(data);
      const byteMetrics = data.reduce((acc, curr) => {
        const index = curr[0];
        acc[index.metric.__name__] = index.value[1];
        return acc;
      }, {});
      console.log('this is bytemetrics', byteMetrics);
      // metricsResponses.map((res) => console.log(res));
    } catch (e) {
      return <p>Error in retrieving metrics</p>;
    }
  }, []);

  // console.log(metrics);

  return (
    <>
      {(() => {
        switch (metricName) {
          case 'Partition':
            return (
              <ul>
                <li>Total Partition Count: </li>
                <li>Offline Partition Count: </li>
              </ul>
            );
          case 'Producer':
            return (
              <ul>
                <li>Total Producer Requests: </li>
                <li>Total failed producer requests: </li>
              </ul>
            );
          case 'Topic':
            return (
              <ul>
                <li>Total Topic Count: {metrics.topicCount}</li>
                <li>Total Topic Metrics: </li>
              </ul>
            );
          case 'Consumer':
            return <p>Coming Soon!!!</p>;
          case 'In/Out':
            return (
              <ul>
                <li>Total Bytes In: KBs</li>
                <li>Total Bytes Out: KBs</li>
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
