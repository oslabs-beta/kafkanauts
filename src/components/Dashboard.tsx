import React from 'react';
import GenericMetric from './GeneralMetric';
import Sidebar from './Sidebar';
import { Col, Row, Container } from '@themesberg/react-bootstrap';

const Dashboard = () => {

  return (
    <Container fluid>
      <h2>Kafka Monitor Dashboard</h2>
      <Row className='row flex-nowrap'>
        <Col className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <Sidebar />
        </Col>
        <Col>
          <main>
            <GenericMetric />
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
