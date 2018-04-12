import React, { Component } from "react";

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      clickedRegister: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }


  handleInputChange(evt) {
    console.log(evt.target);
    this.setState({
      [evt.target.name]: evt.target.value
    })
  };

  handleRegisterSubmit(evt) {
    evt.preventDefault();
    console.log('you clicked button');
    this.setState({
      clickedLogin: true
    })
  };

  render() {
    return (

      <form onSubmit={this.handleRegisterSubmit}>
      <div>
        <label>
          Username
          <input
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <br />
        </label>
        <label>
          Password
          <input
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </label>
        </div>
        <button>Register</button>
      </form>

    )
  }

}

export default Register;
