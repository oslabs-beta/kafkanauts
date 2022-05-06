import React, { useState } from 'react';
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
import OverviewData from '../chart_components/OverviewData';
import CreateCluster from '../chart_components/CreateCluster'
import NavBar from './sub-components/NavBar'
import Footer from './sub-components/Footer'
import Documentation from '../chart_components/Documentation';
import ScrollToTop from './sub-components/ScrollToTop'
// import TopicData from '../chart_components/TopicData';
import './Dashboard.scss';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

const Dashboard = () => {

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') !== 'false'
  }
  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', showSettings === true ? 'false' : 'true');
  }

  const endpoints: string[] = [
    '/partition/total-count',
    '/partition/offline-count',
    '/partition/under-replicated',
    '/partition/active-controller',
    '/partition/request-latency',
    // '/producer/total-request-count',
    '/producer/total-failed-count',
    '/topic/total-count',
    '/producer/producerMetrics',
    '/topic/metrics',
    '/consumer/consumer-lag',
    //'/consumer/consumer-total-time',
    '/zookeeper/avg-latency',
    '/zookeeper/health',
    '/overview/overview-metrics',
    // add endpoint here and destructure result from the invocation of "useQueries" function below
  ]

  const queries: Queries[] = endpoints.map(endpoint => ({
    queryKey: endpoint,
    queryFn: () => axiosClient.get(endpoint).then(res => res.data),
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  }))

  const [
    partitionTotalCount,
    partitionOfflineCount,
    partitionUnderreplicated,
    partitionActiveController,
    partitionReqLatency,
    // producerTotalReqCount,
    producerTotalFailCount,
    topicTotalCount,
    producerMetrics,
    topicMetrics,
    consumerLag,
    //consumerTotalTime,
    avgLatency,
    zookeeperHealth,
    overviewMetrics,
    // destructure result here
  ] = useQueries(queries)

  return (
    <Container fluid>
      <Sidebar />

      <main className="content">
        <NavBar />
        <ScrollToTop />
      
        <div className='content-wrap' >
          <Routes>
            <Route path="/partition" element={
              partitionTotalCount.isLoading && partitionOfflineCount.isLoading && partitionUnderreplicated.isLoading && partitionActiveController.isLoading && partitionReqLatency.isLoading
                ? <>Loading</>
                : <PartitionData
                  partitionTotalCount={partitionTotalCount.data}
                  partitionOfflineCount={partitionOfflineCount.data}
                  partitionUnderreplicated={partitionUnderreplicated.data}
                  partitionActiveController={partitionActiveController.data}
                  partitionReqLatency={partitionReqLatency.data}
                />
            } />

            <Route path="/producer" element={
              producerMetrics.isLoading && producerTotalFailCount.isLoading
                ? <>Loading</>
                : <ProducerData
                  producerTotalFailCount={producerTotalFailCount}
                  producerMetrics={producerMetrics}
                />
            } />

            <Route path="/topic" element={
              topicMetrics.isLoading && topicTotalCount.isLoading
                ? <>Loading</>
                : <InOutData
                  topicMetrics={topicMetrics.data}
                  topicTotalCount={topicTotalCount.data}
                />
            } />

            <Route path="/consumer" element={
              consumerLag.isLoading
                ? <>Loading</>
                : <ConsumerData
                  consumerLag={consumerLag}
                />
            } />
            <Route path="/overview" element={
              overviewMetrics.isLoading
                ? <>Loading</>
                : <OverviewData
                  overviewMetrics={overviewMetrics.data}
                />
            } />

            <Route path="/zookeeper" element={
              avgLatency.isLoading
                ? <>Loading</>
                : <ZookeeperData
                  avgLatency={avgLatency.data}
                  health={zookeeperHealth.data}
                />
            } />

            <Route path="/cluster" element={
              avgLatency.isLoading
                ? <>Loading</>
                : <CreateCluster />
            } />
            <Route path="/docs" element={
              avgLatency.isLoading
                ? <>Loading</>
                : <Documentation />
            } />
          </Routes>
        </div>
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </Container>
  );
};

export default Dashboard;