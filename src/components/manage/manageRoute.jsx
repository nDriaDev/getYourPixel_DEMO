import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Const from './../../util/Costanti';
import ErrorPage from './../errorPage/errorPage';
import Auth from './../auth/auth';
import AddAdmin from './../admin/addAdmin';
import RemoveAdmin from './../admin/removeAdmin';
import ChangePassword from './../changePassword/changePassword';
import SaveClient from './../client/saveClient/saveClient';
import EditClient from './../client/editClient/editClient';
import RemoveClient from './../client/removeClient/removeClient';
import CounterUsers from './../user/counterUsers';
import CounterPoints from './../user/counterPoints';
import SpinnerManage from './../spinner/spinnerManage';
import ManageHome from './manageHome';

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
              ComponentToProtect={ManageHome}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
          <Route
            path= {`${path}/saveClient`}
            render = {(props) => (
              <Auth {...props}
                ComponentToProtect={SaveClient}
                enableSpinner={spinnerCommand}
                spinnerCommand={spinnerCommand}
                disableSpinner={spinnerCommand} />
            )}
          />
        <Route
          path= {`${path}/editClient`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={EditClient}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
          <Route
            path= {`${path}/removeClient`}
            render = {(props) => (
              <Auth {...props}
                ComponentToProtect={RemoveClient}
                enableSpinner={spinnerCommand}
                spinnerCommand={spinnerCommand}
                disableSpinner={spinnerCommand} />
            )}
            />
        <Route
          path= {`${path}/addAdmin`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={AddAdmin}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
        <Route
          path= {`${path}/removeAdmin`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={RemoveAdmin}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
        <Route
          path= {`${path}/counterUsers`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={CounterUsers}
              enableSpinner={spinnerCommand}
              spinnerCommand={spinnerCommand}
              disableSpinner={spinnerCommand} />
          )}
          />
        <Route
          path= {`${path}/counterPoints`}
          render = {(props) => (
            <Auth {...props}
              ComponentToProtect={CounterPoints}
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
