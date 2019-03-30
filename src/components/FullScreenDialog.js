import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ObservationDetails from './ObservationDetails'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  handleClose = () => {
    this.props.history.push(this.props.match.url)
  }

  render() {
    const { pathname } = this.props.location;
    const entryType = pathname.replace(this.props.match.url + '/', '')
    const isOpen = [
      'add-new',
      'modify'
    ].includes(entryType)

    return (
      <div>
        <Dialog
          fullScreen
          open={isOpen}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <ObservationDetails
            handleClose={this.handleClose}
            entryType={entryType}
          />
        </Dialog>
      </div>
    );
  }
}

export default FullScreenDialog;
