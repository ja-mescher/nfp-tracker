import { connect } from 'react-redux'
import RegisterUser from '../components/RegisterUser'
import { createUserWithEmailAndPassword } from '../actions'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  registerUser: (email, password) => dispatch(createUserWithEmailAndPassword(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser)
