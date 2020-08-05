import React, { useState } from 'react';
import axios from 'axios';
import { imageURL, BASE_URL } from '../../config';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      email: email,
      password: password,
    };
    axios
      .post(`${BASE_URL}users/register`, user, {
        withCredentials: true,
        mode: 'cors',
      })
      .then(
        (res) => {
          if (res.data.errors !== undefined) {
            alert(res.data.errors[0].msg);
          } else {
            if (!res.data.loginSuccess) {
              alert(JSON.stringify(res.data.message));
            } else window.location = '/';
          }
        },
        (error) => {
          alert(JSON.stringify(error));
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
      <h3 style={{ textAlign: 'center' }}>Registration</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <lable>First Name: </lable>
          <input
            type='text'
            className='form-control'
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <lable>Last Name: </lable>
          <input
            type='text'
            className='form-control'
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label for='gender'>Choose your gender:</label>
          <select
            className='form-control'
            id='gender'
            name='gender'
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='do not want to specify'>
              Do not want to specify
            </option>
          </select>
        </div>
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
          <button type='submit' className='btn btn-dark btn-lg btn-block'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
