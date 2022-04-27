import React from 'react';
import GenericMetric from './GeneralMetric';
import Sidebar from './Sidebar';
import { Col, Row, Container } from '@themesberg/react-bootstrap';
import CounterWidget from './Widgets';

const Dashboard = () => {

  return (
    <Container fluid>
      <Row className='row flex-nowrap'>
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <GenericMetric />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
