import { connect } from 'react-redux'
import ObservationDetails from '../components/ObservationDetails'
// import { openObservationId } from '../actions'

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  // cancel: () => dispatch(openObservationId(null))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObservationDetails)
