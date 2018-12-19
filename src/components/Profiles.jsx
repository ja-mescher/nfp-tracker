import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";

const NoMatch = ({ location }) => (
  <div>
    <h3>
      404: No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

 const Profiles = ({ singleProfile, ...rest }) => {
   return (
     <Route
       {...rest}
       render={props =>
         (singleProfile === null) ? (
           <NoMatch {...props} />
         ) : (
           <Redirect to={`/profiles/${singleProfile}/observations`} />
         )
       }
     />
   )
 }

export default Profiles;
