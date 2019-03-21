import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import BackIcon from '@material-ui/icons/NavigateBefore';
import {
  Link,
  Redirect
} from "react-router-dom";
import format from 'date-fns/format'

import {
  OptionTypes,
  observationTypesList,
  observationTypeOptions } from '../constants'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

const capitalize = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
}

const fullDescription = (descriptions) => {
  return descriptions['shortDesc'] + " - " + descriptions['longDesc']
}

const SelectionItem = ({selectionType, params, pathname}) => {
  const label = observationTypeOptions[selectionType]['label']
  const descriptions = observationTypeOptions[selectionType]['optionsDesc']
  let value = null
  if(params[selectionType]) {
    value = fullDescription(descriptions[params[selectionType]])
  }
  return (
    <div>
      <ListItem
        button
        component={Link}
        to={{ pathname, search: `?edit=${selectionType}`}}
      >
        <ListItemText
          primary={value ? label : 'Add ' + label}
          secondary={value}
        />
      </ListItem>
      <Divider />
    </div>
  )
}

const SelectionList = ({location, params, date}) => (
    <List component="nav">
      <ListItem
        button
      >
        <ListItemText
          primary={'Date'}
          secondary={format(date, 'EEEE, MMMM do')}
        />
      </ListItem>
      <Divider />
      {observationTypesList.map(type => (
        <SelectionItem
          key={type}
          selectionType={type}
          params={params}
          pathname={location.pathname}
        />
      ))}
    </List>
)

class ParameterOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }
  }

  handleSelect = (value) => {
    console.warn(this.props.paramType, value)
    this.props.handleSelect(this.props.paramType, value)
    this.setState({redirect: true})
  }

  clearSelection = () => {
    this.props.clearSelection(this.props.paramType)
    this.setState({redirect: true})
  }

  render() {
    const { rootPath, paramType, selectedOption } = this.props

    if(this.state.redirect) {
      return <Redirect to={rootPath} />
    }

    const descriptions = observationTypeOptions[paramType]['optionsDesc']

    return (
      <List component="nav">
        <ListItem
          button
          onClick={() => this.clearSelection()}
        >
            <ListItemText primary={'None'} />
        </ListItem>
        <Divider />
        {observationTypeOptions[paramType]['optionsList'].map(option => {
          return (
          <div key={option}>
            <ListItem
              button
              onClick={() => this.handleSelect(option)}
              selected={selectedOption===option}
            >
                <ListItemText primary={descriptions[option]['shortDesc'] + " - " + descriptions[option]['longDesc']} />
            </ListItem>
            <Divider />
          </div>
          )
        })}
      </List>
    )
  }
}

class ObservationDetails extends Component {
  constructor(props) {
    super(props);
    const { state: initialParameters } = this.props.location
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

  handleParamModify = (paramName, value) => {
    this.setState((state, props) => ({
      changesMade: true,
      parameters: {...state.parameters, [paramName]: value}
    }));
  }

  clearParamSelection = (paramName) => {
    this.setState((state, props) => {
      let { [paramName]: omit, ...res } = state.parameters
      console.log(paramName, res)
      return {parameters: res}
    });
  }

  handleBack = () => {
    this.props.history.push(this.props.location.pathname)
  }

  handleSave = () => {
    const { match: {params: {profileId}}, setObservationData, handleClose } = this.props
    const { date, parameters } = this.state
    setObservationData(profileId, date, parameters).then(() => handleClose())
  }

  render() {
    const { classes, match, location, entryType } = this.props;
    let params = new URLSearchParams(location.search);
    const edit = params.get("edit")
    const { date } = this.state;
    console.warn(match, location)
    if(!date) {
      return <Redirect to={match.url} />
    }
    console.warn(this.state)

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
    } else {
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
          {
            edit ?
            <ParameterOptions
              rootPath={location.pathname}
              paramType={edit}
              selectedOption={this.state.parameters[edit]}
              handleSelect={this.handleParamModify}
              clearSelection={this.clearParamSelection}
            /> :
            <SelectionList
              location={location}
              params={this.state.parameters}
              date={date}
            />
          }
        </div>
      </React.Fragment>
    );
  }
}

ObservationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ObservationDetails);
