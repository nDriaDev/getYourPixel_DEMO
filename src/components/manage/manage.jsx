import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Const from './../../util/Costanti';
import ErrorPage from './../errorPage/errorPage';
import ManageHome from './manageHome';

const Manage = (props) => {
  let {path} = useRouteMatch();
  const {enableSpinner, disableSpinner} = props;
  return (
      <Switch>
        <Route exact path={path}>
          <h3>MANAGE.</h3>
        </Route>
        <Route
          path= {`${path}/home`}
          render = {(props) => (
            <ManageHome
              enableSpinner={enableSpinner}
              disableSpinner={disableSpinner} />
          )}
        />
        <Redirect
          to= {Const.PATH_ERROR}
          render = {(props) => (
            <ErrorPage {...props} />
          )}
        />
      </Switch>
  )
}

export default Manage;
