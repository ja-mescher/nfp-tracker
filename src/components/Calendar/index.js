import { connect } from 'react-redux'
import Calendar from './Calendar'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose';

import { setViewDate, fetchObservations } from '../../actions'

import setDate from 'date-fns/setDate'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import format from 'date-fns/format'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'

const mapStateToProps = state => {

  const startOfMonth = setDate(state.viewDate, 1)
  const endOfMonth = lastDayOfMonth(state.viewDate)

  return {
    monthTitle: format(state.viewDate, 'MMMM yyyy'),
    startOfWeeks: eachWeekOfInterval({
      start: startOfMonth,
      end: endOfMonth
    }),
    viewDate: state.viewDate,
    startDate: startOfMonth,
    endDate: endOfMonth,
    today: format(new Date(), 'd'),
  }
}

const mapDispatchToProps = dispatch => ({
  setViewDate: (viewDate) => dispatch(setViewDate(viewDate)),
  fetchObservations: (profileId, startDate, endDate) => dispatch(fetchObservations(profileId, startDate, endDate))
})

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Calendar)
