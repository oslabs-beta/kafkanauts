import React, { useState, useEffect } from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts/1',
});

const SpecificMetric = ({ metricName }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(client.baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  return (
    <>
      {(() => {
        switch (metricName) {
          case 'Partition':
            return (
              <ul>
                <li>Total Partition Count: {post.title}</li>
                <li>Offline Partition Count: {post.body}</li>
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
