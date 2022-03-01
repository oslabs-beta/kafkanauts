import React, { useState } from 'react';
import axios from 'axios';

function Home() {

  const [userInput, setUserInput] = useState({
    port: '',
    shellName: '',
  });


  const handleOnChange = e => {
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    axios.post('/api', {
      port: userInput.port,
      shellName: userInput.shellName
    })
    .then((res) => {
      console.log(res);
      sessionStorage.setItem('port', userInput.port);
      sessionStorage.setItem('shellName', userInput.shellName);
      window.location.href = '/dashboard';
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className='home-page'>
      <h1>Akorn: Your Metrics in a Nutshell</h1>
      <h2>Enter your Prometheus port and a name for your new metrics shell to get started!</h2>
      <form id='userInput-form'>
        <label>
          Prometheus Port:
          <input 
          className='form-control user-input'
          type='text'
          name='port'
          onChange={handleOnChange}
          required>
          </input>
        </label>
        <label>
          Shell Name:
          <input
          className='form-control user-input'
          type='text'
          name='shellName'
          onChange={handleOnChange}
          required>
          </input>
          <input>
          </input>
        </label>
        <button
          className='btn btn-primary'
          type='submit'
          onClick={handleSubmit}
        >Submit
        </button>
      </form>
    </div>
  );

}

export default Home;