import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Port, Nickname, Time } from '../../types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
// Be sure to convert react-bootstrap imports to more specified location to decrease imported object size
import { Col, Row, Form, Button, Container, InputGroup } from '@themesberg/react-bootstrap';

interface HomeState {
  port: Port,
  nickname: Nickname,
  time: Time,
}

const Home: React.FC = () => {
  const [ input, setInput ] = useState<HomeState>({
    port: null,
    nickname: null,
    time: null,
  })
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/prom-port', {
        port: input.port,
        nickname: input.nickname,
        time: new Date().toISOString(),
      })
      .then((res) => { navigate('/dashboard') })
      .catch((err) => { console.log(err) });
  };

  return (
    <div className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h3 className="mb-0">Kafka Monitor</h3>
                <h5>Your Metrics in a Nutshell</h5>
              </div>
              <Form className="mt-4">
                <Form.Group id="port-name" className="mb-4">
                  <Form.Label>Enter Prometheus Port</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faFileExport} />
                    </InputGroup.Text>
                    <Form.Control autoFocus required type="text" name="port" placeholder="9090" onChange={handleOnChange}/>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Group id="nickname" className="mb-4">
                    <Form.Label>Cluster Nickname</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUserAstronaut} />
                      </InputGroup.Text>
                      <Form.Control type="text" name="nickname" placeholder="Aekorn" onChange={handleOnChange}/>
                    </InputGroup>
                  </Form.Group>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-2" onClick={handleSubmit}>Submit</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
