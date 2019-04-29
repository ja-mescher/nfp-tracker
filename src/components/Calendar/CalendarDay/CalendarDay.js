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

import { observationTypesList, observationTypeOptions } from '../../../constants'

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
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
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
    textTransform: 'capitalize',
  },
  buttonBlock: {
    display: 'block',
  }
})

const CalendarDay = ({ classes, location, day, viewDate, observationData }) => {
  const today = new Date();

  const observationDetails = []
  var ariaLabel = "Add"
  var linkToPathname = `${location.pathname}/add-new`
  var linkState = {date: day}
  if(observationData) {
    const data = observationData.data
    const filteredData = {}
    observationTypesList.forEach(obsType => {
      if(data.hasOwnProperty(obsType)) {
        observationDetails.push(
          observationTypeOptions[obsType]['optionsDesc'][data[obsType]]['shortDesc']
        )
        filteredData[obsType] = data[obsType]
      }
    })
    if(observationDetails.length > 0) {
      ariaLabel = "Modify"
      linkToPathname = `${location.pathname}/modify`
      linkState.data = filteredData
    }
  }

  return (
    <div className={classNames(classes.dayFlexContainer, {[classes.dayContainerGrey]: !isSameMonth(viewDate, day)})}>
      <div className={classes.dayNumberFlex}>
        <span className={classNames({[classes.currentDay]: isSameDay(day,today)})}>{getDate(day)}</span>
      </div>
      <div className={classes.dayContentFlex}>
        {
          isAfter(day,today) ? null :
          <React.Fragment>
            <div className={classNames([classes.colorCard], [classes.colorWhite])}></div>
            <Button
              variant="contained"
              aria-label={ariaLabel}
              className={classes.button}
              disabled={isAfter(day,today)}
              component={Link}
              to={{
                pathname: linkToPathname,
                state: linkState
              }}
            >
              {
                observationData ?
                <div className={classes.buttonBlock}>{observationDetails}</div> :
                <AddIcon />
              }
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
