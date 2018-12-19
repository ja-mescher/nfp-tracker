import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import BackIcon from '@material-ui/icons/NavigateBefore';
import Slide from '@material-ui/core/Slide';
import { Route, Switch } from "react-router-dom";

import ObservationDetails from '../containers/ObservationDetails'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  handleClose = () => {
    this.props.history.push(this.props.match.url)
  }

  handleBack = () => {
    this.props.history.push(this.props.location.pathname)
  }

  capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  render() {
    const { classes } = this.props;
    const { pathname, search } = this.props.location;
    let params = new URLSearchParams(search);
    const edit = params.get("edit")
    const isOpen = [
      `${this.props.match.url}/add-new`
    ].includes(pathname)
    console.warn(this.props)

    let navigateButton = null
    let dialogTitle = null
    if(edit) {
      navigateButton = (
        <IconButton
          color="inherit"
          onClick={this.handleBack}
          aria-label="Back"
        >
          <BackIcon />
        </IconButton>
      )
      dialogTitle = this.capitalize(edit)
    } else {
      navigateButton = (
        <IconButton
          color="inherit"
          onClick={this.handleClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      )
      dialogTitle = "New Observation"
    }

    return (
      <div>
        <Dialog
          fullScreen
          open={isOpen}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              {navigateButton}
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {dialogTitle}
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path={`${this.props.match.url}/add-new`} component={ObservationDetails} />
          </Switch>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
