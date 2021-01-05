import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useRouteMatch, Link } from 'react-router-dom';
import ManageRoute from './manageRoute';

const Manage = (props) => {
  const [active,setActive] = useState(['active-v-bar','','','']);
  const [spinner, setSpinner] = useState(false);
  let {path} = useRouteMatch();

  useEffect(()=>{
    return props.disableSpinner();
  },[])

  const spinnerCommand = (val) => {
    setSpinner(val);
  }

  const activing = (value) => {
      let arr = [];
      for(let i=0; i<4; i++){
        if(i == value) {
          arr[i] = 'active-v-bar';
        } else {
          arr[i] = '';
        }
      }
      setActive(arr);
  }
  return (
    <div className="row vertical-bar">
      <div className="col-lg-2 col-md-2 col-sm-1 col-xs-1 background-v-nav">
        <nav className="navbar navbar-expand-lg navbar-dark primary-color">
          <button className="navbar-toggler btn-v-bar" type="button" data-toggle="collapse" data-target="#verticalNav"
            aria-controls="verticalNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="verticalNav">
            <ul className="navbar-nav ul-v-bar flex-column">
              <li className={"nav-item " + active[0]}
                onClick={()=>activing(0)}>
                <Link to={path}> Pixels </Link>
              </li>
              <li className={"nav-item " + active[1]}
                onClick={()=>activing(1)}>
                <Link to={`${path}/addUser`}> Add User </Link>
              </li>
              <li className={"nav-item " + active[2]}
                onClick={()=>activing(2)}>
                <Link to={`${path}/removeUser`}> Remove User </Link>
              </li>
              <li className={"nav-item " + active[3]}
                onClick={()=>activing(3)}>
                <Link to={`${path}/changePassword`}> Change Password </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="col-lg-10 col-md-10 col-sm-11 col-xs-11">
        <div className="container-fluid container-v-bar">
          <ManageRoute spinner={spinner} spinnerCommand={spinnerCommand} />
        </div>
      </div>
    </div>
  )
}

export default Manage;
