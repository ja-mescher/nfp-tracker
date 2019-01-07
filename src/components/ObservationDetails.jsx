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

import { observationTypesList, observationTypeOptions } from '../constants'

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

const SelectionList = ({match, params, date}) => (
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
      {observationTypesList.map(type => {
        const descriptions = observationTypeOptions[type]['optionsDesc']
        let value = null
        if(params[type]) {
          value = descriptions[params[type]]['shortDesc'] + " - " + descriptions[params[type]]['longDesc']
        }
        return (
          <div key={type}>
            <ListItem
              button
              component={Link}
              to={{ pathname: match.url, search: `?edit=${type}`}}
            >
              <ListItemText
                primary={value ? capitalize(type) : 'Add ' + capitalize(type)}
                secondary={value}
              />
            </ListItem>
            <Divider />
          </div>
        )
      })}
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
    const { match, paramType, selectedOption } = this.props

    if(this.state.redirect) {
      return <Redirect to={match.url} />
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
    var date = undefined
    if(this.props.location.state) {
      date = this.props.location.state.date
    }
    this.state = {
      parameters: {},
      date
    }
  }

  handleParamModify = (paramName, value) => {
    this.setState((state, props) => ({
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

  capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  render() {
    const { classes, match, location } = this.props;
    let params = new URLSearchParams(location.search);
    const edit = params.get("edit")
    const { date } = this.state;

    if(!date) {
      return <Redirect to={match.url.split('/add-new')[0]} />
    }

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
          onClick={this.props.handleClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      )
      dialogTitle = "New Observation"
    }

    return (
      <React.Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar>
            {navigateButton}
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {dialogTitle}
            </Typography>
            <Button color="inherit" disabled={!Object.values(this.state.parameters).length} onClick={this.props.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          {
            edit ?
            <ParameterOptions
              match={match}
              paramType={edit}
              selectedOption={this.state.parameters[edit]}
              handleSelect={this.handleParamModify}
              clearSelection={this.clearParamSelection}
            /> :
            <SelectionList
              match={match}
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
