import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Const from './../../util/Costanti';
import ErrorPage from './../errorPage/errorPage';
import PrivacyPolicy from './pages/privacyPolicy';
import CookiePolicy from './pages/cookiePolicy';
import Terms from './pages/terms';
import SpinnerManage from './../spinner/spinnerManage';

const LegalRoute = ({spinner, spinnerCommand}) => {
  let {path} = useRouteMatch();

  return (
    <>
      <SpinnerManage visible={spinner}/>
      <Switch>
        <Route
          exact
          path= {path}
          render = {(props) => (
            <PrivacyPolicy {...props}
              spinnerCommand={spinnerCommand}/>
          )}
        />
        <Route
          path= {`${path}/cookiePolicy`}
          render = {(props) => (
            <CookiePolicy {...props}
              spinnerCommand={spinnerCommand}/>
          )}
        />
        <Route
          path= {`${path}/termsAndConditions`}
          render = {(props) => (
            <Terms {...props}
              spinnerCommand={spinnerCommand}/>
          )}
        />
        <Redirect
          to= {Const.PATH_ERROR}
          render = {(props) => (
            <ErrorPage {...props} />
          )}
        />
      </Switch>
    </>
    )
}

export default LegalRoute;
