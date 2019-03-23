import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const mapStateToProps = state => ({
  isAuthenticated: (state.user !== null)
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute)
