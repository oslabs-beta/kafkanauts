import React from 'react'

export default function ProducerData({ producerTotalReqCount, producerTotalFailCount }): JSX.Element {
  return (
    <ul>
      <li>
      {
        producerTotalReqCount.isLoading ? 
        'Loading' : 
        'Total Producer Requests: ' + producerTotalReqCount.data[0].value[1]
      }
      </li>
      <li>
        {
          producerTotalFailCount.isLoading ? 
          'Loading' : 
          'Total Failed Producer Requests: ' + producerTotalFailCount.data[0].value[1]
        }
      </li>
    </ul>
  );
}
