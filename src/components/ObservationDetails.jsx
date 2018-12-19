import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import {
  Link,
  Redirect
} from "react-router-dom";
import moment from 'moment'

import { observationTypesList, observationTypeOptions } from '../constants'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const capitalize = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
}

const SelectionList = ({match, params}) => (
    <List component="nav">
      <ListItem
        button
      >
        <ListItemText
          primary={'Date'}
          secondary={moment().format('dddd, MMMM Do')}
        />
      </ListItem>
      <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
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
      redirect: false
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
    this.state = {
      parameters: {}
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

  render() {
    const { classes, match } = this.props;
    let params = new URLSearchParams(this.props.location.search);
    const edit = params.get("edit")

    return (
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
          <SelectionList match={match} params={this.state.parameters}/>
        }
      </div>
    );
  }
}

ObservationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ObservationDetails);
