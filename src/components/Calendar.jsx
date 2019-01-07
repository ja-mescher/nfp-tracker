import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/ArrowForwardIos';
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'
import addDays from 'date-fns/addDays'
import CalendarDay from '../containers/CalendarDay'
import startOfMonth from 'date-fns/startOfMonth'
import isAfter from 'date-fns/isAfter'
import getDayOfYear from 'date-fns/getDayOfYear'

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
    marginLeft: -12,
    marginRight: 12,
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

function Calendar(props) {
  const { classes, monthTitle, startOfWeeks, viewDate, setViewDate } = props;
  // console.warn(startOfWeeks)
  const today = new Date();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={()=>setViewDate(subMonths(viewDate,1))}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {monthTitle}
          </Typography>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
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

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
