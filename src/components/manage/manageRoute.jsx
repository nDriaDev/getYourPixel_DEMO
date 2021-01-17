import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useRouteMatch, Link } from 'react-router-dom';
import Const from './../../util/Costanti';
import ErrorPage from './../errorPage/errorPage';
import Auth from './../auth/auth';
import AddUser from './../user/addUser';
import RemoveUser from './../user/removeUser';
import ChangePassword from './../changePassword/changePassword';
import SavePixel from './../savePixel/savePixel';
import RemovePixel from './../removePixel/removePixel';
import SpinnerManage from './../spinner/spinnerManage';

const ManageRoute = ({spinner, spinnerCommand}) => {
  let {path} = useRouteMatch();
  return (
    <>
      <SpinnerManage visible={spinner}/>
      <Switch>
        <Route
          exact
          path= {path}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={SavePixel}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
        <Route
          path= {`${path}/removePixel`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={RemovePixel}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
        <Route
          path= {`${path}/addUser`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={AddUser}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
        <Route
          path= {`${path}/removeUser`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={RemoveUser}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
        <Route
          path= {`${path}/changePassword`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={ChangePassword}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
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

export default ManageRoute;
