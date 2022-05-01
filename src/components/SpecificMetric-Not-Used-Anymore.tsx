import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useQueries } from 'react-query';
import RealTimeChart from "../chart_components/RealTimeChart";
import './SpecificMetric.css'
import PartitionData from '../chart_components/PartitionData';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
});
// const fetchOptions = {
//   refetchInterval(data) {
//     // https://stackoverflow.com/questions/69027427/react-query-can-i-use-react-query-for-polling-until-i-get-certain-data
//     return !data || data.progress < 100 ? 1000 : false
//   },
//   refetchIntervalInBackground: true
// }

//create another state to store the array and control
//implement Que to store the data? of Array?
const SpecificMetric = ({ metricName }: { metricName: string }) => {

  const endpoints: string[] = [
    '/partition/total-count',
    '/partition/offline-count',
    // '/producer/total-request-count',
    '/producer/total-failed-count',
    '/topic/total-count',
    '/topic/metrics',
    // add endpoint here and destructure result from the invocation of "useQueries" function below
  ]
  const queries = endpoints.map(endpoint => ({
    queryKey: endpoint,
    // queryFn: async () => {
    //   const { data } = await axiosClient.get(endpoint)
    //   return data
    // },
    queryFn: () => axiosClient.get(endpoint).then(({ data }) => data),
    refetchInterval: data => {
      // https://stackoverflow.com/questions/69027427/react-query-can-i-use-react-query-for-polling-until-i-get-certain-data
      return !data || data.progress < 100 ? 5000 : false
    },
    refetchIntervalInBackground: true,
  }))

  const [
    partitionTotalCount,
    partitionOfflineCount,
    // producerTotalReqCount,
    producerTotalFailCount,
    topicTotalCount,
    topicMetrics,
    // destructure result here
  ] = useQueries(queries)

  
    return (
      <>
        {((metricName) => {
          switch (metricName) {
            case 'Partition':
              return (
                <div className='container'>
                  <div>
                    <div>Total Partition Count:{' '}</div>
                      {
                      partitionTotalCount.isLoading ?
                      <>Loading</> :
                      <div className={partitionTotalCount.data[0].value[1] <= 0 ? 'rectangle-red' : 'rectangle-green'} >
                        {partitionTotalCount.data[0].value[1]}
                      </div>
                    }
                  </div>
                  <div>
                    <div>Offline Partition Count:{' '}</div>
                    <div style={{display: "grid"}}>
                      {
                        partitionOfflineCount.isLoading ?
                        <>Loading</> : 
                        <div className={partitionOfflineCount.data[0].value[1] >= 3 ? 'rectangle-red' : 'rectangle-green'} style={{position: "relative"}}>
                          {partitionOfflineCount.data[0].value[1]}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              );
            case 'Producer':
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
            case 'Topic':
              return (
                topicTotalCount.isLoading ? 
                <>Loading</> : 
                <ul>
                  <li>
                    Total Topic Count: {topicTotalCount.data[0].value[1]}
                  </li>
                  {/* <li>Total Topic Metrics: </li> */}
                </ul>
              );
            case 'Consumer':
              return <p>Coming Soon!!!</p>;

            case 'In/Out':
              return (
                topicMetrics.isLoading ? 
                <>Loading</> : 
                <ul>
                  <li>Total Bytes In: {topicMetrics.data[0][0].value[1]/1000} KBs</li>
                  <li>
                    Total Bytes Out: {topicMetrics.data[1][0].value[1]/1000} KBs
                  </li>
                  <li>
                    Total Bytes Rejected:{' '}
                    {topicMetrics.data[2][0].value[1]} KBs
                  </li>
                  {/* <li><RealTimeChart metrics={metrics} /></li> */}
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
