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
import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import isAfter from 'date-fns/isAfter'
import isEqual from 'date-fns/isEqual'
import getDayOfYear from 'date-fns/getDayOfYear'
import { Link } from 'react-router-dom'

import CalendarDay from './CalendarDay'

const styles = theme => ({
  root: {
    position: 'absolute',
  	width: '100%',
  	height: '100%',
  	display: 'flex',
  	flexDirection: 'column',
  },
  weekFlexContainer: {
		flex: 1,
    padding: '0px',
  },
  weekFlexContent: {
    height: '100%',
  	display: 'flex',
  },
  weekLabelFlexContainer: {
		height: '20px',
    padding: '0px',
  },
  dayFlexContainer: {
    display: 'flex',
		flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    borderStyle: 'solid hidden hidden solid',
    borderWidth: '1px',
    borderColor: 'lightgrey',
    textAlign: 'center',
    minWidth: 0,
    padding: '0px'
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    width: '100%',
  	display: 'flex',
    boxSizing: 'border-box'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {

  },
});

const CalendarWeek = (props) => {
  const { classes, startDate } = props;
  const daysOfWeek = [0,1,2,3,4,5,6].map(i => addDays(startDate, i))
  return (
    <div className={classes.weekFlexContainer}>
      <div className={classes.weekFlexContent}>
        {daysOfWeek.map(day => <CalendarDay key={getDayOfYear(day)} day={day}/>)}
      </div>
    </div>
  )
}

const WeekLabels = (props) => {
  const { classes, labels } = props;
  return (
    <div className={classes.weekLabelFlexContainer}>
      <div className={classes.weekFlexContent}>
        {
          labels.map(label => (
            <div key={label} className={classes.dayFlexContainer}>
              <Typography variant="body2" noWrap>{label}</Typography>
            </div>
          ))
        }
      </div>
    </div>
  )
}

CalendarWeek.propTypes = {
  classes: PropTypes.object.isRequired,
};

const weekdayLabels = [
  'Sun',
  'Mon',
  'Tues',
  'Wed',
  'Thur',
  'Fri',
  'Sat'
]

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
            <Typography variant="h6" color="inherit" className={classes.grow}>
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
        <WeekLabels classes={classes} labels={weekdayLabels}/>
        {
          startOfWeeks.map((startDate, index) => {
            return (
              <CalendarWeek
                key={getDayOfYear(startDate)}
                classes={classes}
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
