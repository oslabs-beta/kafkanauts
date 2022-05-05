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
import BlankUser from '../assets/blank_user.png'
// import { CircleChart, BarChart, SalesValueChart, SalesValueChartphone } from "./Charts";

export const CounterWidget = (props) => {
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

export const ProfileCardWidget = () => {
  return (
    <Card border="light" className="text-center p-0 mb-4">
      <div style={{ backgroundImage: `url(${BlankUser})` }} className="profile-cover rounded-top" />
      <Card.Body className="pb-5">
        <Card.Img src={BlankUser} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
        <Card.Title>admin</Card.Title>
        <Card.Subtitle className="fw-normal">Current uptime:</Card.Subtitle>
        <Card.Text className="text-gray mb-4">1:34 hours</Card.Text>

        <Button variant="primary" size="sm" className="me-2">
          <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Add topic
        </Button>
        <Button variant="secondary" size="sm">Pause</Button>
      </Card.Body>
    </Card>
  );
};

export const ChoosePhotoWidget = (props) => {
  const { title, photo } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={photo} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Attach settings</div>
                  <div className="text-gray small">.yaml, .yml or .json. Max size of 800K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

