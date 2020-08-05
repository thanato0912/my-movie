import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config';
function RightMenu(props) {
  const [isLogin, setLogin] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    axios
      .get(`${BASE_URL}users/auth`, {
        withCredentials: true,
        mode: 'cors',
      })
      .then(
        (res) => {
          if (res.data.loginSuccess) {
            setLogin(true);
            setToken(res.data.token);
          } else {
            setLogin(false);
            setToken('');
          }
        },
        (err) => {
          console.log(JSON.stringify(err) + ' ' + `${BASE_URL}users/auth`);
          setLogin(false);
        }
      );
  }, []);

  const logoutHandler = () => {
    axios
      .post(
        `${BASE_URL}users/logout`,
        { token: token },
        {
          withCredentials: true,
          mode: 'cors',
        }
      )
      .then(
        (res) => {
          window.location = '/';
        },
        (error) => {
          alert(error);
        }
      );
  };

  if (!isLogin || token === '') {
    return (
      <React.Fragment>
        <li className='navbar-item' style={props.mystyle}>
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        </li>
        <li className='navbar-item' style={props.mystyle}>
          <Link to='/register' className='nav-link'>
            Register
          </Link>
        </li>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <li
          onClick={logoutHandler}
          className='navbar-item'
          style={props.mystyle}
        >
          <Link to='/logout' className='nav-link'>
            Log Out
          </Link>
        </li>
      </React.Fragment>
    );
  }
}

export default RightMenu;
