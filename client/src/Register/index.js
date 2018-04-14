import React, { Component } from "react";
import './style.css'

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
        <div className="form">
          <h2>Create an account!</h2>

          <div className="form-group">
            <label className="user-label">
              <br />
            <input className="user-box"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            </label>
            <small className="form-text">We'll never share your username with anyone else.</small>
          </div>

          <div className="form-group">
            <label className="pass-label">
              <br />
            <input className="user-box"
              name="username"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            </label>
            <br />
            <button className="register-button">Submit</button>
          </div>

        </div>

      </form>


    )
  }

}

export default Register;
