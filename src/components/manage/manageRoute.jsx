import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useRouteMatch, Link } from 'react-router-dom';
import Const from './../../util/Costanti';
import ErrorPage from './../errorPage/errorPage';
import AddUser from './../user/addUser';
import RemoveUser from './../user/removeUser';
import ChangePassword from './../changePassword/changePassword';
import LoadSquare from './../loadSquare/loadSquare';
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
            <LoadSquare
              spinnerCommand={spinnerCommand}/>
          )}
          />
        <Route
          path= {`${path}/addUser`}
          render = {(props) => (
            <AddUser
              spinnerCommand={spinnerCommand}/>
          )}
          />
        <Route
          path= {`${path}/removeUser`}
          render = {(props) => (
            <RemoveUser
            spinnerCommand={spinnerCommand}/>
          )}
          />
        <Route
          path= {`${path}/changePassword`}
          render = {(props) => (
            <ChangePassword
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

export default ManageRoute;
