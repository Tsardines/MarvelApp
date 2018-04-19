import React, { Component } from "react";
import './style.css';
import TokenService from "../services/TokenService";

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
      this.createUser = this.createUser.bind(this);
    }


    handleInputChange(evt) {
      console.log(evt.target);
      this.setState({
        [evt.target.name]: evt.target.value
      })
    };

    handleRegisterSubmit(evt) {
      evt.preventDefault();
      console.log('you clicked register button');
      const { username, password } = this.state;
      const body = {
        username: username,
        password: password
      };

      this.createUser(body)
      .then(response => {
        TokenService.test(); //says hello in console.
        TokenService.save(response.token)
      })
      .catch(err => console.log(`err: ${err}`));

      // this.setState({
      //   clickedLogin: true
      // })
    };

    createUser(data) {
      return fetch(`/api/user/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
       .then(response => { return response.json() });
    }

    render() {
      return (

      <form onSubmit={this.handleRegisterSubmit}>
        <div className="form">
          <h2 className="create-account">Create an account!</h2>

          <div className="form-group">
            <label className="user-label">
              <medium className="form-text">We'll never share your username with anyone else.</medium>
              <br />
            <input className="user-box"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            </label>
          </div>

          <div className="form-group">
            <label className="pass-label">
              <br />
            <input className="user-box"
              name="password"
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
