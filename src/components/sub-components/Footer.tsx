import React from "react";
import { Row, Col, Card, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faDownload, faRocket } from "@fortawesome/free-solid-svg-icons";
import GitHubButton from 'react-github-btn';

export default (props) => {
  const currentYear = new Date().getFullYear()
  const showSettings = props.showSettings;

  const toggleSettings = (toggle) => {
    props.toggleSettings(toggle);
  }

  return (
    <div>
      {showSettings ? (
        <Card className="theme-settings">
          <Card.Body className="pt-4">
            <Button className="theme-settings-close" variant="close" size="sm" aria-label="Close" onClick={() => { toggleSettings(false) }} />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="m-0 mb-1 me-3 fs-7">Made with open source <span role="img" aria-label="gratitude">💙</span></p>
              <GitHubButton href="https://github.com/oslabs-beta/kafkanauts" data-size="large" data-show-count="true" aria-label="Star os-labs/kafkanauts on GitHub">Star</GitHubButton>
            </div>
            <Button href="https://github.com/oslabs-beta/kafkanauts" target="_blank" variant="primary" className="mb-3 w-100"><FontAwesomeIcon icon={faDownload} className="me-1" /> Download</Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="theme-settings theme-settings-expand" onClick={() => { toggleSettings(true) }}>
          <Card.Body className="p-3 py-2">
            <span className="fw-bold h6"><FontAwesomeIcon icon={faCogs} className="me-1 fs-7" /> Settings</span>
          </Card.Body>
        </Card>
      )}
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2021-{`${currentYear} `}
              <Card.Link href="https://www.kafkanauts.com" target="_blank" className="text-blue text-decoration-none fw-normal">
                Kafkanauts
              </Card.Link>
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://www.kafkanauts.com" target="_blank">
                  About
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="/dashboard/docs" target="_blank">
                  Docs
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://www.kafkanauts.com" target="_blank">
                  Blog
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://www.kafkanauts.com/contact" target="_blank">
                  Contact
                </Card.Link>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
