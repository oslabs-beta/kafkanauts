import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    port: '',
    shellName: '',
  });

  const handleOnChange = (e:any) => {
    setState({ ...state, [e.target.name]: e.target.value });
    //console.log(state);
  };

  const handleSubmit = (e:any) => {
    //console.log('You clicked handleSubmit!')
    e.preventDefault();

    axios
      .post('http://localhost:8080/api/prom-port', {
        port: state.port,
        shellName: state.shellName,
      })
      .then((res) => {
        console.log(res);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home-page">
      <h1>Kafka Monitor: Your Metrics in a Nutshell</h1>
      <h2>
        Enter your Prometheus port and a name for your new metrics shell to get
        started!
      </h2>
      <form id="userInput-form">
        <label>
          Prometheus Port:
          <input
            className="form-control user-input"
            type="text"
            name="port"
            onChange={handleOnChange}
            required
          ></input>
        </label>
        <label>
          <br />
          Shell Name:
          <input
            className="form-control user-input"
            type="text"
            name="shellName"
            onChange={handleOnChange}
            required
          ></input>
        </label>
        <br />
        <br />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      {/* <br />
      <p>Want to create an online account to keep track of all your shells?</p>
      <br />
      <button
        className='btn btn-primary'
        type='submit'
        onClick={() => navigate('/signup')}
      >Click here to create an account!
      </button> */}
    </div>
  );
};

export default Home;
