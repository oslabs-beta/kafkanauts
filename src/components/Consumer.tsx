import React from "react";
import Sidebar from './Sidebar';
import { Col, Row, Container } from '@themesberg/react-bootstrap';

const Consumer = () => {

  return (
    <Container fluid>
      <Row className='row flex-nowrap'>
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <h1>This is the Consumer Page</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Consumer;
