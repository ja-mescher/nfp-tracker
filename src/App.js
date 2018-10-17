import React, { Component } from 'react';
import RegisterUser from './containers/RegisterUser'
import SignIn from './containers/SignIn'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import PrivateRoute from "./containers/PrivateRoute"
// import ObservationDetails from './containers/ObservationDetails'

const NoMatch = ({ location }) => (
  <div>
    <h3>
      404: No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

const AppContent = ({ location }) => (
  <div>
    <h3>
      App Content HERE
    </h3>
  </div>
);

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={AppContent} />
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={RegisterUser} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
