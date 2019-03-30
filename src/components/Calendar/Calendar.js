import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TodayIcon from '@material-ui/icons/Today';
import NavigateBeforeIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/ArrowForwardIos';
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'
import startOfMonth from 'date-fns/startOfMonth'
import isAfter from 'date-fns/isAfter'
import isEqual from 'date-fns/isEqual'
import getDayOfYear from 'date-fns/getDayOfYear'
import { Link } from 'react-router-dom'

import WeekLabels from './WeekLabels'
import CalendarWeek from './CalendarWeek'

const styles = theme => ({
  root: {
    position: 'absolute',
  	width: '100%',
  	height: '100%',
  	display: 'flex',
  	flexDirection: 'column',
  },
  title: {
    flexGrow: 1,
  },
});

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  componentDidMount() {
    const { fetchObservations, startDate, endDate, match: {params: {profileId}} } = this.props
    if(startDate && endDate) {
        this.unsubscribe = fetchObservations(profileId, startDate, endDate)
    }
  }

  componentWillUnmount() {
    if(this.unsubscribe) this.unsubscribe()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fetchObservations, startDate, endDate, match: {params: {profileId}} } = this.props
    if(
      !isEqual(startDate, prevProps.startDate) ||
      !isEqual(endDate, prevProps.endDate) ||
      (profileId !== prevProps.match.params.profileId)
    ) {
      if(this.unsubscribe) this.unsubscribe()
      this.unsubscribe = fetchObservations(profileId, startDate, endDate)
    }
  }

  render() {
    const { classes, monthTitle, startOfWeeks, viewDate, setViewDate } = this.props;
    const today = new Date();

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              component={Link}
              to="/account"
            >
              <AccountCircle />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              {monthTitle}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Display today"
              onClick={()=>setViewDate(new Date())}
            >
              <TodayIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Display previous"
              onClick={()=>setViewDate(subMonths(viewDate,1))}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Display next"
              disabled={isAfter(startOfMonth(addMonths(viewDate,1)),today)}
              onClick={()=>setViewDate(addMonths(viewDate,1))}
            >
              <NavigateNextIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <WeekLabels />
        {
          startOfWeeks.map((startDate, index) => {
            return (
              <CalendarWeek
                key={getDayOfYear(startDate) + '-' + index}
                startDate={startDate}
              />
            )
          })
        }
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
