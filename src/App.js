import React, { Component } from 'react';
import RegisterUser from './containers/RegisterUser'
import SignIn from './containers/SignIn'
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import PrivateRoute from "./containers/PrivateRoute"
// import ObservationDetails from './containers/ObservationDetails'

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/register" component={RegisterUser} />
          <PrivateRoute path="/app" component={RegisterUser} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
