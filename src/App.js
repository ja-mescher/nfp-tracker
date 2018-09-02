import React, { Component } from 'react';
import Home from './containers/Home'
import ObservationDetails from './containers/ObservationDetails'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ObservationDetails />
        <Home />
      </div>
    );
  }
}

export default App;
