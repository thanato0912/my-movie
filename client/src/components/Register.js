import React, {Component} from 'react';
import axios from 'axios';



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: 'male',
      email: '',
      password: '',
      warning: '',
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
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
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user =  {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:5000/users/register', user)
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
        <h3 style={{textAlign:"center"}}>Registration</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <lable>First Name: </lable>
            <input type='text'
                   className='form-control'
                   required
                   value={this.state.firstName}
                   onChange={this.onChangeFirstName}/>

          </div>
          <div className='form-group'>
            <lable>Last Name: </lable>
            <input type='text'
                    className='form-control'
                   required
                   value={this.state.lastName}
                   onChange={this.onChangeLastName}/>
          </div>
          <div className='form-group'>
            <label for="gender">Choose your gender:</label>
            <select className='form-control' id="gender" name="gender" onChange={this.onChangeGender} value={this.state.gender}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="do not want to specify">Do not want to specify</option>
            </select>
          </div>
          <div className='form-group'>
            <lable>Email: </lable>
            <input type='text'
                   className='form-control'
                   required
                   value={this.state.email}
                   onChange={this.onChangeEmail}/>

            <span class="label label-danger">{this.state.error}</span>
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
            <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
