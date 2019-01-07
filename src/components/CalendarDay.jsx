import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import getDate from 'date-fns/getDate'
import isSameDay from 'date-fns/isSameDay'
import isAfter from 'date-fns/isAfter'
import isSameMonth from 'date-fns/isSameMonth'
import classNames from 'classnames'

const styles = theme => ({
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
  dayNumberFlex: {
    height: '20px',
    padding: '2px',
    paddingLeft: '5px',
    textAlign: 'left',
  },
  currentDay: {
    display:'block',
    padding: '1px 1px',
    borderRadius: '11px',
    minWidth: '20px',
    maxWidth: '20px',
    textAlign: 'center',
    backgroundColor:'lightgrey',
  },
  dayContentFlex: {
    flex: 1,
    position: 'relative',
  },
  colorCard: {
    position: 'absolute',
    height: '25%',
    left: '10%',
    right: '10%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  colorRed: {
    backgroundColor: 'red'
  },
  colorGreen: {
    backgroundColor: 'green'
  },
  colorWhite: {
    backgroundColor: 'white',
  },
  dayContainerGrey: {
    background: 'lightgrey'
  },
  button: {
    height: '80%',
    minWidth: '80%',
    position: 'absolute',
    left: '5%',
    right: '5%',
    bottom: '5%',
  },
})

const CalendarDay = (props) => {
  const { classes, match, day, viewDate } = props;
  const today = new Date();
  const isToday = isSameDay(day,today)

  return (
    <div className={classNames(classes.dayFlexContainer, {[classes.dayContainerGrey]: !isSameMonth(viewDate, day)})}>
      <div className={classes.dayNumberFlex}>
        <span className={classNames({[classes.currentDay]: isToday})}>{getDate(day)}</span>
      </div>
      <div className={classes.dayContentFlex}>
        { isAfter(day,today) ? null :
          <React.Fragment>
            <div className={classNames([classes.colorCard], [classes.colorWhite])}></div>
            <Button
              variant="contained"
              aria-label="Add"
              className={classes.button}
              disabled={isAfter(day,today)}
              component={Link}
              to={{
                pathname: `${match.url}/add-new`,
                state: {date: day}
              }}
            >
              <AddIcon />
            </Button>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

CalendarDay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarDay);
