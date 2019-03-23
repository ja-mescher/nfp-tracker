import { connect } from 'react-redux'
import ResetPassword from './ResetPassword'
import { sendPasswordResetEmail } from '../../../actions'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  resetPassword: (email, password) => dispatch(sendPasswordResetEmail(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword)
