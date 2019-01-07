import { connect } from 'react-redux'
import Calendar from '../components/Calendar'
import { setViewDate } from '../actions'
import { copyDate } from '../utils'
import setDate from 'date-fns/setDate'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import format from 'date-fns/format'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'

const mapStateToProps = state => {

  const startOfMonth = setDate(copyDate(state.viewDate), 1)
  const endOfMonth = lastDayOfMonth(copyDate(state.viewDate))
  // const startDayOfWeek = getDay(startOfMonth)
  // const endDayOfWeek = getDay(endOfMonth)

  return {
    monthTitle: format(state.viewDate, 'MMMM yyyy'),
    startOfWeeks: eachWeekOfInterval({
      start: startOfMonth,
      end: endOfMonth
    }),
    viewDate: state.viewDate,
    today: format(new Date(), 'd'),
  }
}

const mapDispatchToProps = dispatch => ({
  setViewDate: (viewDate) => dispatch(setViewDate(viewDate)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
