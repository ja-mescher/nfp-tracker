import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ObservationDetails from './ObservationDetails'

import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  handleClose = () => {
    this.props.history.push(this.props.match.url)
  }

  render() {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);

    const observationDate = parse(
      params.get('observation'),
      'yyyy-MM-dd',
      new Date()
    )

    const isOpen = isValid(observationDate)

    return (
      <div>
        <Dialog
          fullScreen
          open={isOpen}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          { isOpen ?
            <ObservationDetails
              observationDate={observationDate}
              handleClose={this.handleClose}
            />
          : <div>Closed</div>
          }

        </Dialog>
      </div>
    );
  }
}

export default FullScreenDialog;
