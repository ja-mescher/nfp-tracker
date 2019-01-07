import { connect } from 'react-redux'
import CalendarDay from '../components/CalendarDay'
import { withRouter } from "react-router";
import { compose } from 'recompose';

const mapStateToProps = state => ({
  viewDate: state.viewDate,
})

const mapDispatchToProps = dispatch => ({

})

export default compose(withRouter,connect(
  mapStateToProps,
  mapDispatchToProps
))(CalendarDay)
