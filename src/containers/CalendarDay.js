import { connect } from 'react-redux'
import CalendarDay from '../components/CalendarDay'
import { withRouter } from "react-router";
import { compose } from 'recompose';
import format from 'date-fns/format'

const mapStateToProps = (state, ownProps) => ({
  viewDate: state.viewDate,
  observationData: state.observations[format(ownProps.day, 'yyyyMMdd')]
})

const mapDispatchToProps = dispatch => ({

})

export default compose(withRouter,connect(
  mapStateToProps,
  mapDispatchToProps
))(CalendarDay)
