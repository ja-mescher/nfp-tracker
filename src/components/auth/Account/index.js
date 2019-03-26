import { connect } from 'react-redux'
import Account from './Account'
import { signOut } from '../../../actions'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
