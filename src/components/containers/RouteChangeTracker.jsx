import React from 'react'
import { withRouter } from 'react-router-dom';


/**
 * @NOT_USED
 * Crea ridondanza e visualizza i messaggi di log piu' volte. Va bene il listen in MainTemplate
*/
const RouteChangeTracker = ({ history }) => {

    history.listen((location, action) => {
      console.log("change routeTracker");
      console.log("location", location);
      console.log("path", action);
    });

    return <></>;
};

export default withRouter(RouteChangeTracker);
