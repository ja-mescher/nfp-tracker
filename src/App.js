import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import PrivateRoute from "./components/auth/PrivateRoute"

import RegisterUser from './components/auth/RegisterUser'
import SignIn from './components/auth/SignIn'
import ResetPassword from './components/auth/ResetPassword'
import FullScreenDialog from './components/FullScreenDialog'
import Calendar from './components/Calendar'

const NoMatch = ({ location }) => (
  <div>
    <h3>
      404: No match for <code>{location.pathname}</code>
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
            <Route exact path="/(index.html)?" component={SignIn} />
            <Route exact path="/register" component={RegisterUser} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <PrivateRoute path="/:profileId/observations" component={Calendar} />
            <Route component={NoMatch} />
          </Switch>
          <Route path="/:profileId/observations" component={FullScreenDialog} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
