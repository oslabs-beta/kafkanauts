import React from 'react';
import axios from 'axios';
import { useQueries } from 'react-query';
import Sidebar from './Sidebar';
import { Col, Row, Container } from '@themesberg/react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { Queries } from '../../types'
import PartitionData from '../chart_components/PartitionData';
import InOutData from '../chart_components/InOutData';
import ProducerData from '../chart_components/ProducerData';
import ZookeeperData from '../chart_components/ZookeeperData';
import ConsumerData from '../chart_components/ConsumerData';
// import TopicData from '../chart_components/TopicData';


const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

const Dashboard = () => {

  const endpoints: string[] = [
    '/partition/total-count',
    '/partition/offline-count',
    '/producer/total-request-count',
    '/producer/total-failed-count',
    // '/topic/total-count',
    '/topic/metrics',
    '/consumer/consumer-lag',
    //'/consumer/consumer-total-time',
    '/zookeeper/avg-latency',
    // add endpoint here and destructure result from the invocation of "useQueries" function below
  ]

  const queries: Queries[] = endpoints.map(endpoint => ({
    queryKey: endpoint,
    queryFn: () => axiosClient.get(endpoint).then(res => res.data),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  }))

  const [
    partitionTotalCount,
    partitionOfflineCount,
    producerTotalReqCount,
    producerTotalFailCount,
    // topicTotalCount,
    topicMetrics,
    consumerLag,
    //consumerTotalTime,
    avgLatency,
    // destructure result here
  ] = useQueries(queries)

  return (
    <Container fluid>
      <Row className='row flex-nowrap'>
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <Routes>
            <Route path="/partition" element={
              partitionTotalCount.isLoading && partitionOfflineCount.isLoading
              ? <>Loading</>
              : <PartitionData
                  partitionTotalCount={partitionTotalCount}
                  partitionOfflineCount={partitionOfflineCount}
              />
            }/>

            <Route path="/producer" element={
              producerTotalReqCount.isLoading && producerTotalFailCount.isLoading
              ? <>Loading</>
              : <ProducerData
                  producerTotalReqCount={producerTotalReqCount}
                  producerTotalFailCount={producerTotalFailCount}
              />
            }/>

            <Route path="/topic" element={
              topicMetrics.isLoading/* && topicTotalCount.isLoading*/
              ? <>Loading</>
              : <InOutData
                  topicMetrics={topicMetrics.data}
                  // topicTotalCount={topicTotalCount.data}
              />
            }/>

            <Route path="/consumer" element={
              consumerLag.isLoading
              ? <>Loading</>
              : <ConsumerData
                  consumerLag={consumerLag}
              />
            }/>

            <Route path="/zookeeper" element={
              avgLatency.isLoading
              ? <>Loading</>
              : <ZookeeperData
                  avgLatency={avgLatency}
              />
            }/>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;