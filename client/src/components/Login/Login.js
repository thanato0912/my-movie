import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    axios.post('http://localhost:5000/users/login', user).then(
      (res) => {
        alert('Login Sucess!');
        window.location = '/';
      },
      (error) => {
        console.log(error.response);
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
          <lable>Email: </lable>
          <input
            type='text'
            className='form-control'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <lable>Password: </lable>
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
