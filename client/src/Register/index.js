import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect
// } from "react-router-dom";


class Register extends React.Component {
  state = {
    username: "",
    password: ""
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      username: "",
      password: ""
    });
    this.props.onChange({
      username: "",
      password: ""
    });
  }

  render() {
    return (

      <form>
        <input
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Create Account</button>
      </form>

    )
  }

}

export default Register;
