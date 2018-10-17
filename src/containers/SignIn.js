import { connect } from 'react-redux'
import SignIn from '../components/SignIn'
import { signInWithEmailAndPassword } from '../actions'

const mapStateToProps = state => ({
  isAuthenticated: (state.user !== null)
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signInWithEmailAndPassword(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
