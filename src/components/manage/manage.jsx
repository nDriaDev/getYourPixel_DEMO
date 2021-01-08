import React, {useState, useEffect} from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import ManageRoute from './manageRoute';
import axios from 'axios';

const Manage = (props) => {
  const history = useHistory();
  const [active,setActive] = useState(['active-v-bar','','','','']);
  const [role,setRole] = useState(null);
  const [spinner, setSpinner] = useState(false);
  let {path} = useRouteMatch();
  useEffect(()=>{
    props.enableSpinner();
    return axios.post(Const.GET_USER,{})
    .then(res => {
      if(res.data) {
        setRole(res.data.type)
        props.disableSpinner();
      } else {
        props.disableSpinner();
        toast.error('User not exist', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          onClose:()=>{history.push('/manage')}
        });
      }
    }).catch(err => {
      props.disableSpinner();
      toast.error(err.message != null ? err.message : "ERRORE", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        onClose:()=>{history.push('/manage')}
      });
    })
  },[])

  const spinnerCommand = (val) => {
    setSpinner(val);
  }

  const activing = (value) => {
    let arr = [];
    for(let i=0; i<active.length; i++){
      if(i === value) {
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
                <Link style={{textAlign:'left'}} to={path}> Save Pixel </Link>
              </li>
              <li className={"nav-item " + active[1]}
                onClick={()=>activing(1)}>
                <Link style={{textAlign:'left'}} to={`${path}/removePixel`}> Remove Pixel </Link>
              </li>
              {
                role && role !== Const.USER_TYPE.BASIC ?
                  <li className={"nav-item " + active[2]}
                    onClick={()=>activing(2)}>
                    <Link style={{textAlign:'left'}} to={`${path}/addUser`}> Add User </Link>
                  </li>
                  :
                  null
              }
              {
                role && role !== Const.USER_TYPE.BASIC ?
                <li className={"nav-item " + active[3]}
                  onClick={()=>activing(3)}>
                  <Link style={{textAlign:'left'}} to={`${path}/removeUser`}> Remove User </Link>
                </li>
                  :
                  null
              }
              <li className={"nav-item " + active[4]}
                onClick={()=>activing(4)}>
                <Link style={{textAlign:'left'}} to={`${path}/changePassword`}> Change Password </Link>
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
