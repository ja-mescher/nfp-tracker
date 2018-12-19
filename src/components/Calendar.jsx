import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment'

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
  dayFlex: {
    display: 'flex',
		flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    borderStyle: 'solid hidden hidden solid',
    borderWidth: '1px',
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

const CalendarDay = (props) => {
  const { classes } = props;
  return (
    <div className={classes.dayFlex}>
      hello
    </div>
  )
}

CalendarDay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CalendarWeek = (props) => {
  const { classes } = props;
  return (
    <div className={classes.weekFlexContainer}>
      <div className={classes.weekFlexContent}>
        <CalendarDay classes={classes}/>
        <CalendarDay classes={classes}/>
        <CalendarDay classes={classes}/>
        <CalendarDay classes={classes}/>
        <CalendarDay classes={classes}/>
        <CalendarDay classes={classes}/>
        <CalendarDay classes={classes}/>
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
            <div className={classes.dayFlex}>
              <Typography noWrap>{label}</Typography>
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
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            December
          </Typography>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <NavigateNextIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <WeekLabels classes={classes} labels={weekdayLabels}/>
      <CalendarWeek classes={classes}/>
      <WeekLabels classes={classes} labels={weekdayLabels}/>
      <CalendarWeek classes={classes}/>
      <WeekLabels classes={classes} labels={weekdayLabels}/>
      <CalendarWeek classes={classes}/>
      <WeekLabels classes={classes} labels={weekdayLabels}/>
      <CalendarWeek classes={classes}/>
    </div>
  );
}

const now = moment([2018,11])
const first = now.startOf('month').week()
let last = now.endOf('month').week()
console.warn(now.weeksInYear())
console.warn(now.isValid(), first, last, now.endOf('month').weekday())

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
