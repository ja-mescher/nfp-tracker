import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
// import Typography from '@material-ui/core/Typography'


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

import Paper from '@material-ui/core/Paper'

import ObservationColorSelect from './ObservationColorSelect'

const styles = theme => ({
  paperContainers: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
  }
})

const ObservationDetails = ({classes, fullScreen, isOpen, cancel}) => (
  <div>
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={this.handleClose}
      aria-labelledby="observation-details-title"
    >
      <DialogTitle id="bservation-details-title">{"New Observation Record"}</DialogTitle>
      <DialogContent>
        <Paper className={classes.paperContainers}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Flow Amount</FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={'female'}
              onChange={this.handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Disabled option)"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper className={classes.paperContainers}>
          <ObservationColorSelect />
        </Paper>
        <Paper className={classes.paperContainers}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Consistency</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={() => {}}
                    value="gilad" />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={() => {}}
                    value="jason" />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={() => {}}
                    value="antoine"
                  />
                }
                label="Antoine Llorca"
              />
            </FormGroup>
          </FormControl>
        </Paper>
        <Paper className={classes.paperContainers}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Color</FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              className={classes.group}
              value={'female'}
              onChange={this.handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Disabled option)"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={cancel}>
          Cancel
        </Button>
        <Button color="primary" variant="outlined" autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

ObservationDetails.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default compose(withStyles(styles), withMobileDialog())(ObservationDetails);
