import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Port, Nickname } from '../../types';
//import { StringDecoder } from 'string_decoder';

interface HomeState {
  port: Port,
  nickname: Nickname,
  //setState: React.Dispatch<React.SetStateAction<State>>;
}


const Home: React.FC = () => {

  const [ input, setInput ] = useState<HomeState>({
    port: null,
    nickname: null
  })

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    //console.log(state);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    //console.log('You clicked handleSubmit!')
    e.preventDefault();

    axios
      .post('http://localhost:8080/api/prom-port', {
        port: input.port,
        nickname: input.nickname,
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
          Nickname:
          <input
            className="form-control user-input"
            type="text"
            name="nickname"
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
