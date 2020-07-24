import React, {Component} from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component{
  render() {
    const mystyle = {
      float:"right",
    };
    return(
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <Link to="/" className="navbar-brand">My-Movie</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Exercise</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Exercise Log</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">Create User</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="navbar-item" style={{mystyle}}>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="navbar-item" style={{mystyle}}>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

/*


*/
