import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      withCredentials: true,
    };

    axios
      .post('/users/login', user, {
        withCredentials: true,
        mode: 'cors',
      })
      .then(
        (res) => {
          window.localStorage.setItem('loginSuccess', true);
          window.localStorage.setItem('userId', res.data.userId);
          window.localStorage.setItem('token', res.data.token);
          window.location = '/';
        },
        (error) => {
          let errors = error.response.data.errors;
          let msg = '';
          for (var err of errors) {
            msg += err.msg + '\n';
          }
          alert(msg);
        }
      );
  };

  const div_style = {
    paddingLeft: '20%',
    paddingRight: '20%',
    paddingTop: '4%',
  };

  return (
    <div style={div_style}>
      <h3 style={{ textAlign: 'center' }}>Login Page</h3>
      <form>
        <div className='form-group'>
          <label>Email: </label>
          <input
            type='text'
            className='form-control'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Password: </label>
          <input
            type='password'
            className='form-control'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <button
            type='submit'
            onClick={handleSubmit}
            className='btn btn-dark btn-lg btn-block'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
