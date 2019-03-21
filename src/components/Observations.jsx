import React from 'react';
import Calendar from '../containers/Calendar'

function Observations(props) {
  const { match } = props;
  return (
    <div>
      <Calendar match={match}/>
    </div>
  );
}

export default Observations;
