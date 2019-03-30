import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import addDays from 'date-fns/addDays'
import getDayOfYear from 'date-fns/getDayOfYear'

import CalendarDay from './CalendarDay'

const styles = {
  weekContainer: {
		flex: 1,
    padding: '0px',
  },
  weekContent: {
    height: '100%',
  	display: 'flex',
  },
}
const CalendarWeek = ({ classes, startDate }) => {
  const daysOfWeek = [0,1,2,3,4,5,6].map(i => addDays(startDate, i))
  return (
    <div className={classes.weekContainer}>
      <div className={classes.weekContent}>
        {
          daysOfWeek.map(day => (
            <CalendarDay key={getDayOfYear(day)} day={day}/>
          ))
        }
      </div>
    </div>
  )
}

CalendarWeek.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
};

export default withStyles(styles)(CalendarWeek);
