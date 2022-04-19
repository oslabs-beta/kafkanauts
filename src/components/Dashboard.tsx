import React from 'react';
import GenericMetric from './GeneralMetric';
import Sidebar from './Sidebar';

const Dashboard = () => {

  return (
    <>
      <h2>Kafka Monitor Dashboard</h2>
      <Sidebar />
      <main>
        <GenericMetric />
      </main>
    </>
  );
};

export default Dashboard;
