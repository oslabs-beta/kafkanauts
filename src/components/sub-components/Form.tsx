import React from "react";
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';

export const GeneralInfoForm = ({ setShowAlert }) => {
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Cluster information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="clusterName">
                <Form.Label>Cluster Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter cluster name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="topicName">
                <Form.Label>Topic Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter topic name" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Port</Form.Label>
                <Form.Control required type="number" placeholder="Enter port number" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="instance">
                <Form.Label>Instance Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter instance name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="job">
                <Form.Label>Job name</Form.Label>
                <Form.Control required type="text" placeholder="Enter job name" />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Settings</h5>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Group id="scrape">
                <Form.Label>Scrape Interval</Form.Label>
                <Form.Control required type="number" placeholder="Seconds" />
              </Form.Group>
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Group id="zookeeper">
                <Form.Label>Zookeeper port</Form.Label>
                <Form.Control required type="number" placeholder="Zookeeper Port" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="kafka">
                <Form.Label>Kafka port</Form.Label>
                <Form.Control required type="number" placeholder="Kafka Port" />
              </Form.Group>
            </Col>
            <Col sm={8}>
              <Form.Group id="factor">
                <Form.Label>Offsets Topic Replication Factor</Form.Label>
                <Form.Control required type="number" placeholder="Replication Factor" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit" onClick={() => {setShowAlert(true); window.scrollTo({ top: 0, left: 0, behavior: "smooth" });}}>Create</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
