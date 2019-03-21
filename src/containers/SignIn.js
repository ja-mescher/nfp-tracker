import { connect } from 'react-redux'
import SignIn from '../components/SignIn'
import { signInWithEmailAndPassword } from '../actions'

const mapStateToProps = state => ({
  profileLoaded: state.userProfile ? state.userProfile.profileId : null
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signInWithEmailAndPassword(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
