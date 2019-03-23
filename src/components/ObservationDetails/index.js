import { connect } from 'react-redux'
import ObservationDetails from './ObservationDetails'
import { withRouter } from "react-router";
import { setObservationData } from '../../actions'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  setObservationData: (profileId, date, dataFieldsObject) => dispatch(setObservationData(profileId, date, dataFieldsObject)),
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ObservationDetails))
