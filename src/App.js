import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import PrivateRoute from "./containers/PrivateRoute"

import RegisterUser from './containers/RegisterUser'
import SignIn from './containers/SignIn'
import FullScreenDialog from './components/FullScreenDialog'
import Profiles from './containers/Profiles'
import Observations from './components/Observations'

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
      <div>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/register" component={RegisterUser} />
              <PrivateRoute exact path="/profiles" component={Profiles} />
              <PrivateRoute path="/profiles/:profileId/observations" component={Observations} />
              <Route component={NoMatch} />
            </Switch>
            <Route path="/profiles/:profileId/observations" component={FullScreenDialog} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
