import React, { Component } from "react";
import './style.css'
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
        <div className="form-class">
          <h2 className="welcome">Welcome back!</h2>
          <div className="form-group">
            <label className="user-label">
              <medium className="form-text">Please enter your information below.</medium>
              <br />
            <input className="user-box"
              name="username"
              placeholder="Enter your username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            </label>
          </div>

          <div className="form-group">
            <label className="pass-label">
              <br />
            <input className="user-box"
              name="username"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            </label>
            <br />
            <button className="submit-button">Submit</button>
          </div>

        </div>

      </form>


    )
  }

}

export default Login;
