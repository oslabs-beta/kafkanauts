import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faChartArea,
  faChartBar,
  faChartLine,
  faFlagUsa,
  faFolderOpen,
  faGlobeEurope,
  faPaperclip,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
// import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';
// import { CircleChart, BarChart, SalesValueChart, SalesValueChartphone } from "./Charts";

const CounterWidget = (props) => {
  const { category, title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? 'text-danger' : 'text-success';

  return (
    <Card border='light' className='shadow-sm' style={{ width: '18rem', borderWidth: 'medium' }}>
      <Card.Body>
        <Row className='d-block d-xl-flex align-items-center'>
          <Col xs={12} xl={7} className='px-xl-0'>
            <div className='d-none d-sm-block'>
              <h5>{title}</h5>
              <h3 className='mb-1 justify-content-center'>{value}</h3>
            </div>
            <div className='small mt-2'>
              <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
              <span className={`${percentageColor} fw-bold`}>{percentage}%</span>
            </div>
            <h6>{category}</h6>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CounterWidget;