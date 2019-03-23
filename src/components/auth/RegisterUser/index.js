import { connect } from 'react-redux'
import RegisterUser from './RegisterUser'
import { signInWithEmailAndPassword } from '../../../actions'

const mapStateToProps = state => ({
  profileLoaded: state.userProfile ? state.userProfile.profileId : null
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signInWithEmailAndPassword(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser)
