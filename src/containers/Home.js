import { connect } from 'react-redux'
import Home from '../components/Home'
import { openObservationId } from '../actions'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  action: () => dispatch(openObservationId(0))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
