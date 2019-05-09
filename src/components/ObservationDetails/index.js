import { connect } from 'react-redux'
import ObservationDetails from './ObservationDetails'
import { withRouter } from "react-router";
import { compose } from 'recompose';
import { setObservationData, fetchObservations } from '../../actions'
import format from 'date-fns/format'

const mapStateToProps = (state, ownProps) => {
  return {
    observationData: state.observations[format(ownProps.observationDate, 'yyyyMMdd')]
  }
}

const mapDispatchToProps = dispatch => ({
  setObservationData: (profileId, date, dataFieldsObject) => dispatch(setObservationData(profileId, date, dataFieldsObject)),
  fetchObservations: (profileId, startDate, endDate) => dispatch(fetchObservations(profileId, startDate, endDate))
})

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ObservationDetails)
