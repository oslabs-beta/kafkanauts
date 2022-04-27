import React from 'react';
import GenericMetric from './GeneralMetric';
import Sidebar from './Sidebar';
import { Col, Row, Container } from '@themesberg/react-bootstrap';

const Dashboard = () => {

  return (
    <Container>
      <Row className='row flex-nowrap'>
        <Col xs={4}>
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
