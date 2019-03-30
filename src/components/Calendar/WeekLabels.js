import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  weekContent: {
    height: '100%',
  	display: 'flex',
  },
  weekContainer: {
		height: '20px',
    padding: '0px',
  },
  dayContainer: {
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
}

const weekdayLabels = [
  'Sun',
  'Mon',
  'Tues',
  'Wed',
  'Thur',
  'Fri',
  'Sat'
]

const WeekLabels = ({ classes }) => {
  return (
    <div className={classes.weekContainer}>
      <div className={classes.weekContent}>
        {
          weekdayLabels.map(label => (
            <div key={label} className={classes.dayContainer}>
              <Typography variant="body2" noWrap>{label}</Typography>
            </div>
          ))
        }
      </div>
    </div>
  )
}

WeekLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeekLabels);
