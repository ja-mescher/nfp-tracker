import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import BackIcon from '@material-ui/icons/NavigateBefore';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {
  observationTypesList,
  observationTypeOptions,
  optionTypes
} from '../../constants'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 3,
    overflow: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
  },
  formControl: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  grid: {
    margin: 'auto',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  textField: {
    marginTop: 0,
    width: '100%',
  },
  wrapper: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  title: {
    marginLeft: theme.spacing.unit,
  }
})

const capitalize = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
}

const fullDescription = (descriptions) => {
  return descriptions['shortDesc'] + " - " + descriptions['longDesc']
}

class Notes extends Component {
  handleChange = event => {
    const { onChange } = this.props;
    onChange(event.target.value)
  };

  render() {
    const {
      value,
      classes,
      label
    } = this.props;

    return (
      <React.Fragment>
        <TextField
          id="notes"
          label="Notes"
          multiline
          rows="4"
          value={value}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
      </React.Fragment>
    )
  }
}

class ChipSelectSingle extends Component {
  handleChange = (option) => {
    const { value, onChange } = this.props;
    if(value === option) {
      onChange(undefined)
    }
    else {
      onChange(option)
    }
  }

  render() {
    const {
      value,
      classes,
      label,
      optionsList,
      optionsDesc
    } = this.props;

    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle1" className={classes.title}>
          {label}
        </Typography>
        {
          optionsList.map(option => (
            <Chip
              key={optionsDesc[option]['shortDesc']}
              variant={value === option ? 'default' : 'outlined'}
              onClick={() => this.handleChange(option)}
              color="primary"
              label={fullDescription(optionsDesc[option])}
              className={classes.chip}
            />
          ))
        }
      </Paper>
    )
  }
}

class ChipSelectMulti extends Component {
  handleChange = (option) => {
    const { value, onChange } = this.props;
    if(value === undefined) {
      onChange([option])
    } else if(value.includes(option)) {
      onChange(value.filter(val => !(val === option)))
    } else {
      onChange([...value, option])
    }
  }

  render() {
    const {
      value,
      classes,
      label,
      optionsList,
      optionsDesc
    } = this.props;

    return (
      <Paper className={classes.wrapper}>
        <Typography variant="subtitle1" className={classes.title}>
          {label}
        </Typography>
        {
          optionsList.map(option => (
            <Chip
              key={optionsDesc[option]['shortDesc']}
              variant={value && value.includes(option) ? 'default' : 'outlined'}
              onClick={() => this.handleChange(option)}
              color="primary"
              label={fullDescription(optionsDesc[option])}
              className={classes.chip}
            />
          ))
        }
      </Paper>
    )
  }
}

class ObservationDetails extends Component {
  constructor(props) {
    super(props);
    const { state: initialParameters } = this.props.location
    console.warn(initialParameters)
    var date = undefined
    var parameters = {}
    if(initialParameters) {
      date = initialParameters.date
      if(initialParameters.data) {
        parameters = initialParameters.data
      }
    }
    this.state = {
      changesMade: false,
      parameters,
      date
    }
  }

  handleChange = name => value => {
    this.setState({
      changesMade: true,
      [name]: value
    })
  }

  render() {
    const { classes, location, entryType } = this.props;
    let params = new URLSearchParams(location.search);
    const edit = params.get("edit")

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
      dialogTitle = capitalize(edit)
    }
    else {
      navigateButton = (
        <IconButton
          color="inherit"
          onClick={this.props.handleClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      )
      if(entryType === 'add-new') {
        dialogTitle = "New Observation"
      }
      else {
        dialogTitle = "Modify Observation"
      }
    }

    return (
      <React.Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar>
            {navigateButton}
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {dialogTitle}
            </Typography>
            <Button color="inherit" disabled={!this.state.changesMade} onClick={this.handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
            >
              <Grid item xs={12} sm={6} className={classes.grid}>
                {observationTypesList.map(type => {
                  if(
                    observationTypeOptions[type]['optionsType'] === optionTypes.SELECT_ONE
                  ) {
                    return (
                      <ChipSelectSingle
                        key={type}
                        classes={classes}
                        value={this.state[type]}
                        onChange={this.handleChange(type)}
                        {...observationTypeOptions[type]}
                      />
                    )
                  }
                  else if(
                    observationTypeOptions[type]['optionsType'] === optionTypes.SELECT_MANY
                  ) {
                    return (
                      <ChipSelectMulti
                        key={type}
                        classes={classes}
                        value={this.state[type]}
                        onChange={this.handleChange(type)}
                        {...observationTypeOptions[type]}
                      />
                    )
                  }
                  else if(
                    observationTypeOptions[type]['optionsType'] === optionTypes.TEXT
                  ) {
                    return (
                      <Notes
                        key={type}
                        classes={classes}
                        value={this.state[type]}
                        onChange={this.handleChange(type)}
                        {...observationTypeOptions[type]}
                      />
                    )
                  }
                  else {
                    return null
                  }
                })}
              </Grid>
            </FormControl>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

ObservationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ObservationDetails);
