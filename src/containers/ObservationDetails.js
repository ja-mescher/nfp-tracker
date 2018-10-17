import { connect } from 'react-redux'
import ObservationDetails from '../components/ObservationDetails'
import { openObservationId } from '../actions'

const mapStateToProps = state => ({
  isOpen: (state.openObservationId !== null)
})

const mapDispatchToProps = dispatch => ({
  cancel: () => dispatch(openObservationId(null))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObservationDetails)
