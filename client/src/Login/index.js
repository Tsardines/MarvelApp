import React, { Component } from "react";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      clickedLogin: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }


  handleInputChange(evt) {
    console.log(evt.target);
    this.setState({
      [evt.target.name]: evt.target.value
    })
  };

  handleLoginSubmit(evt) {
    evt.preventDefault();
    console.log('you clicked button');
    this.setState({
      clickedLogin: true
    })
  };

  render() {
    return (

      <form onSubmit={this.handleLoginSubmit}>
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
        <button>Login</button>
      </form>

    )
  }

}

export default Login;
