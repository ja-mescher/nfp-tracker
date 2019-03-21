import { connect } from 'react-redux'
import Profiles from '../components/Profiles'

const mapStateToProps = state => ({
  singleProfile: (state.userProfiles.length === 1) ? state.userProfiles[0].documentId : null
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles)
