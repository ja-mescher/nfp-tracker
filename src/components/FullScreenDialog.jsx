import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { Route, Switch } from "react-router-dom";
import ObservationDetails from '../containers/ObservationDetails'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  handleClose = () => {
    this.props.history.push(this.props.match.url)
  }

  render() {
    const { pathname } = this.props.location;
    const isOpen = [
      `${this.props.match.url}/add-new`
    ].includes(pathname)

    return (
      <div>
        <Dialog
          fullScreen
          open={isOpen}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <Switch>
            <Route
              path={`${this.props.match.url}/add-new`}
              render={(props) => <ObservationDetails {...props} handleClose={this.handleClose} />}
            />
          </Switch>
        </Dialog>
      </div>
    );
  }
}

export default FullScreenDialog;
