import React, { Component } from 'react';
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    fields: {}
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />

        </div>
      </Router>
    );
  }
  }

//   render() {
//     return (
//       <div className="App">
//         <Navbar />
//         <Register onChange={fields => this.onChange(fields)} />
//         <p>
//           {JSON.stringify(this.state.fields, null, 2)}
//         </p>
//
//         <Login onChange={fields => this.onChange(fields)} />
//         <p>
//           {JSON.stringify(this.state.fields, null, 2)}
//         </p>
//       </div>
//     );
//   }
// }

export default App;
