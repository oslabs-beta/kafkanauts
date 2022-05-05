import React from 'react';
import { Row, Col, Card, Container, Alert } from '@themesberg/react-bootstrap';

import Code from "../components/sub-components/Code";

export default () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2" id="quick-start">Quick Start</h1>
              <p className="fs-5 fw-light">This guide will help you get started with <b>Kafkanauts</b>.</p>

              <p>
                <b>Kafkanauts</b> requires a <Card.Link href="https://kafka.apache.org/" target="_blank">Kafka cluster</Card.Link> that exposes a <a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer">Prometheus port</a>.
              </p>
              
              <p>Please follow these steps to install the required technologies:</p>
              
              <h2 className="fs-5 mt-4" id="using-npm">Using <code>npm</code></h2>
              <ol className="ps-4 docs-list">
                <li>
                  Install npm from <Card.Link href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" target="_blank">their official page</Card.Link>.
                </li>
                <li>
                  <p>After installing npm, open a terminal and run <code>npm install</code> in the main <code>directory</code> folder to download all project dependencies.</p>
                  <Code code="$ npm install" language="bash" />
                </li>
                <li>
                  <p>Then, build the required files by running <code>npm run build</code>.</p>
                  <Code code="$ npm run build" language="bash" />
                </li>
                <li>
                  <p>Then start the app in development mode by running the following command in terminal:</p>
                  <Code code="$ npm run start:dev" language="bash" />
                </li>
                <li>
                  If it doesn't automatically open, go to <Card.Link href="http://localhost:3000" target="_blank">http://localhost:3000</Card.Link> to view it in the browser.
                </li>
              </ol>

            </article>
          </Card.Body>
        </Card>
        <br/>
        <Card>
          <Card.Body>
              <article>
                <h1 className="h2" id="explore-kafkanauts">Exploring Kafkanauts</h1>
                <p className="fs-5 fw-light">This section will help explain all of <b>Kafkanauts'</b> functionality.</p>
                <ol className="ps-4 docs-list">
                  <li>Overview</li>
                  <ol style={{listStyleType: 'lower-alpha'}}>
                    <li>These metrics help you trace any performance bottleneck due to network congestion.</li>
                    <li>The common issues that may impact the network throughput of Kafka Brokers are a slow network, high number of consumers, data synchronization for replication after a lag, etc.</li>
                  </ol>
                  <li>Partition</li>
                  <ol style={{listStyleType: 'lower-alpha'}}>
                    <li>Topics are partitioned, meaning a topic is spread over a number of "buckets" located on different Kafka brokers.</li>
                    <li>The partition of topics is replicated on every Broker node.</li>
                    <li>When a Broker becomes unavailable, the value of UnderReplicatedPartitions is increased, and an alert will be generated as soon as the value is greater than zero.</li>
                  </ol>
                  <li>Consumer</li>
                  <ol style={{listStyleType: 'lower-alpha'}}>
                    <li>Requests per second is calculated as a total of the request rates of producers, consumers, and followers.</li>
                    <li>For fetch requests, Purgatory size is high if not enough data is available for consumers to fetch because you've set a large value for either fetch.min.bytes or fetch.wait.max.ms.</li>
                  </ol>
                  <li>Producer</li>
                  <ol style={{listStyleType: 'lower-alpha'}}>
                    <li>For producer requests, this is usually a non-zero value if Producers use ack=all.</li>
                    <li>If Producers set acks=-1, then all the produce requests will be kept in the Purgatory until the leader of the Partition gets an acknowledgment from all of its followers.</li>
                  </ol>
                  <li>Topics</li>
                  <ol style={{listStyleType: 'lower-alpha'}}>
                    <li>It is very important to keep an eye on disk usage since Kafka saves data on the disk; if the disk is full, Kafka will not work.</li>
                    <li>Each topic in Kafka is configurable based on how much data needs to be saved before an automatic expiry.</li>
                  </ol>
                  <li>Zookeeper</li>
                  <ol style={{listStyleType: 'lower-alpha'}}>
                    <li>Along with Kafka metrics, you need to monitor the health of ZooKeeper as well as its communication with Kafka about any state transition of ZooKeeper or disconnects.</li>
                  </ol>
                  <li>Create Cluster</li>
                  <ol style={{listStyleType: 'lower-alpha'}}>
                    <li>The client must be configured with one or more brokers.</li>
                    <li>The brokers on the list are considered to be seed brokers and are only used to bootstrap the client and start the initial metadata.</li>
                  </ol>
                </ol>
              </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
