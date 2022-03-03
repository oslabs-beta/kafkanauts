import React, { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
});

const SpecificMetric = ({ metricName }) => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    (async function getMetrics() {
      const response = await client.get('/topics');
      console.log(response.data);
      setMetrics(response.data);
    })();
  }, []);

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
                <li>Total Topic Count: </li>
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
