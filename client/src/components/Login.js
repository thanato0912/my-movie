import React, {Component} from 'react';
import axios from 'axios';




export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user =  {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:5000/users/login', user)
         .then(res => {
           //console.log()
           if(res.data.errors !== undefined) {
             alert(res.data.errors[0].msg);
           }else {
             window.location = '/';
             alert("Login Sucess!");
           }
         });
  }
  render() {
    const div_style = {
      paddingLeft: "20%",
      paddingRight: "20%",
      paddingTop: "4%"
    }


    return(
      <div style={div_style}>
        <h3 style={{textAlign:"center"}}>Login Page</h3>
        <form>
          <div className='form-group'>
            <lable>Email: </lable>
            <input type='text'
                   className='form-control'
                   required
                   value={this.state.email}
                   onChange={this.onChangeEmail}/>

          </div>
          <div className='form-group'>
            <lable>Password: </lable>
            <input type='password'
                    className='form-control'
                   required
                   value={this.state.password}
                   onChange={this.onChangePassword}/>
          </div>


          <div className='form-group'>
            <button type="submit"  onClick={this.onSubmit} className="btn btn-dark btn-lg btn-block">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
