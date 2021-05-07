import React, {useState, useEffect} from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Const from './../../util/Costanti';
import ManageRoute from './manageRoute';
import axios from 'axios';

const Manage = (props) => {
  const history = useHistory();
  const [active,setActive] = useState(() => {
      let pathSpli = window.location.pathname.split('/');
      if(pathSpli[pathSpli.length-1] === 'manage') {
        return ['','','','','','','','','',''];
      }
      else if(pathSpli[pathSpli.length-1] === 'saveClient') {
        return ['active-v-bar', '', '', '', '', '', '', '', '', ''];
      }
      else if(pathSpli[pathSpli.length-1] === 'editClient') {
        return ['', 'active-v-bar', '', '', '', '', '', '', '', ''];
      }
      else if(pathSpli[pathSpli.length-1] === 'removeClient') {
        return ['', '', 'active-v-bar', '', '', '', '', '', '', ''];
      }
      else if(pathSpli[pathSpli.length-1] === 'addAdmin') {
        return ['', '', '', 'active-v-bar', '', '', '', '', '', ''];
      }
      else if(pathSpli[pathSpli.length-1] === 'removeAdmin') {
        return ['', '', '', '', 'active-v-bar', '', '', '', '', ''];
      }
      else if(pathSpli[pathSpli.length-1] === 'counterUsers') {
        return ['', '', '', '', '', 'active-v-bar', '', '', '', ''];
      }
      else if(pathSpli[pathSpli.length-1] === 'counterPoints') {
        return ['', '', '', '', '', '', 'active-v-bar', '', '', ''];
      }
      else if(pathSpli[pathSpli.length - 1] === 'accountData') {
        return ['', '', '', '', '', '', '', 'active-v-bar', '', ''];
      }
      else if(pathSpli[pathSpli.length - 1] === 'inviteUsers') {
        return ['', '', '', '', '', '', '', '', 'active-v-bar', ''];
      }else {
        return ['', '', '', '', '', '', '', '', '', 'active-v-bar'];
      }
  }
);
  const [role,setRole] = useState(null);
  const [spinner, setSpinner] = useState(true);
  let {path} = useRouteMatch();

  const checkIfRedirecting = () => {
    if(history.location === '/manage') {
      history.push('/login');
    }
  }

  useEffect(()=>{
    props.enableSpinner();
    return axios.post(Const.GET_ADMIN,{})
    .then(res => {
      if(res.data && !res.data.code) {
        // sessionStorage.setItem('isAuth', true)
        props.setAuth(true,false);
        setRole(res.data.type)
        props.disableSpinner();
      } else if(res.data && res.data.code){
        if(res.data.code === 401) {
          throw new Error(res.data.message);
        }
        //Se l'utente che cerca di accedere a manage non è un admin nè un collaboratore
        else if(res.data.code === 200 && res.data.type === 'Client') {
          axios.post(Const.GET_USER,{})
          .then(res => {
            if(res.data && !res.data.code) {
              props.setAuth(false,true);
              setRole(res.data.type)
              props.disableSpinner();
            } else {
              throw new Error(res.data.message);
            }
          })
          .catch(err => {
            throw err;
          })
        }
      } else {
        props.disableSpinner();
        toast.error('Utente inesistente', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          onClose:()=>checkIfRedirecting()
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
        onClose:()=>checkIfRedirecting()
      });
    })
  },[])

  const spinnerCommand = (val) => {
    setSpinner(val);
  }

  const activing = (value) => {
    if (active[value] === 'active-v-bar') {
      return;
    }

    setSpinner(true);
    let arr = [];
    for(let i=0; i<active.length; i++){
      if(i === value) {
        arr[i] = 'active-v-bar';
      } else {
        arr[i] = '';
      }
    }
    setActive(arr);
    collapseNavbar();
  }

  const collapseNavbar = () => {
    if (Const.isMobileBrowser(navigator.userAgent) && document.querySelector('#verticalNav').className.indexOf("show") !== -1) {
        document.querySelector('#btn-admin-collapse').click();
    }
  }

  return (
    <>
      {
        role &&
        <div className="row vertical-bar mx-auto">
          <div className="col-lg-2 col-md-2 col-sm-1 col-xs-1 background-v-nav">
            <nav className="navbar navbar-expand-lg navbar-dark primary-color">
              <button id="btn-admin-collapse" className="navbar-toggler btn-v-bar" type="button" data-toggle="collapse" data-target="#verticalNav"
                aria-controls="verticalNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="verticalNav">
                <ul className="navbar-nav ul-v-bar flex-column">
                  {
                    role && ![Const.ADMIN_TYPE.CLIENT].includes(role) ?
                    <li className={"nav-item " + active[0]}
                      onClick={()=>activing(0)}>
                      <Link style={{textAlign:'left'}} to={`${path}/saveClient`}>
                        <i className="fas fa-user-plus" style={{paddingRight:'4%'}}></i>
                        Nuovo Cliente
                      </Link>
                    </li>
                    :
                    null
                  }
                  {
                    role && ![Const.ADMIN_TYPE.CLIENT].includes(role) ?
                    <li className={"nav-item " + active[1]}
                      onClick={()=>activing(1)}>
                      <Link style={{textAlign:'left'}} to={`${path}/editClient`}>
                        <i className="fas fa-user-edit" style={{paddingRight:'4%'}}></i>
                        Modifica Cliente
                      </Link>
                    </li>
                    :
                    null
                  }
                  {
                    role && ![Const.ADMIN_TYPE.CLIENT].includes(role) ?
                    <li className={"nav-item " + active[2]}
                      onClick={()=>activing(2)}>
                      <Link style={{textAlign:'left'}} to={`${path}/removeClient`}>
                        <i className="fas fa-user-times" style={{paddingRight:'4%'}}></i>
                        Elimina Cliente
                      </Link>
                    </li>
                    :
                    null
                  }
                  {
                    role && ![Const.ADMIN_TYPE.BASIC,Const.ADMIN_TYPE.CLIENT].includes(role) ?
                    <li className={"nav-item " + active[3]}
                      onClick={()=>activing(3)}>
                      <Link style={{textAlign:'left'}} to={`${path}/addAdmin`}>
                        <i className="fas fa-hands-helping" style={{paddingRight:'4%'}}></i>
                        Aggiungi Admin
                      </Link>
                    </li>
                    :
                    null
                  }
                  {
                    role && ![Const.ADMIN_TYPE.BASIC,Const.ADMIN_TYPE.CLIENT].includes(role) ?
                    <li className={"nav-item " + active[4]}
                      onClick={()=>activing(4)}>
                      <Link style={{textAlign:'left'}} to={`${path}/removeAdmin`}>
                        <i className="fas fa-hands-wash" style={{paddingRight:'4%'}}></i>
                        Elimina Admin
                      </Link>
                    </li>
                    :
                    null
                  }
                  {
                    role && ![Const.ADMIN_TYPE.BASIC,Const.ADMIN_TYPE.CLIENT].includes(role) ?
                    <li className={"nav-item " + active[5]}
                      onClick={()=>activing(5)}>
                      <Link style={{textAlign:'left'}} to={`${path}/counterUsers`}>
                        <i className="fas fa-users" style={{paddingRight:'4%'}}></i>
                        Utenti Registrati
                      </Link>
                    </li>
                    :
                    null
                  }
                  {
                    role && [Const.ADMIN_TYPE.BASIC, Const.ADMIN_TYPE.CLIENT].includes(role) ?
                      <li className={"nav-item " + active[7]}
                        onClick={() => activing(7)}>
                        <Link style={{ textAlign: 'left' }} to={`${path}/accountData`}>
                          <i className="fas fa-user-circle" style={{ paddingRight: '4%' }}></i>
                      Dati Account
                    </Link>
                      </li>
                      :
                      null
                  }
                  {
                    role && [Const.ADMIN_TYPE.BASIC,Const.ADMIN_TYPE.CLIENT].includes(role) ?
                    <li className={"nav-item " + active[6]}
                      onClick={()=>activing(6)}>
                      <Link style={{textAlign:'left'}} to={`${path}/counterPoints`}>
                        <i className="fas fa-trophy" style={{paddingRight:'4%'}}></i>
                        Punti
                      </Link>
                    </li>
                    :
                    null
                  }
                  {
                    role && [Const.ADMIN_TYPE.BASIC, Const.ADMIN_TYPE.CLIENT].includes(role) ?
                      <li className={"nav-item " + active[9]}
                        onClick={() => activing(9)}>
                        <Link style={{ textAlign: 'left' }} to={`${path}/inviteUsers`}>
                          <i className="fas fa-user-circle" style={{ paddingRight: '4%' }}></i>
                      Invita
                    </Link>
                      </li>
                      :
                      null
                  }
                  {
                    role && ![Const.ADMIN_TYPE.CLIENT].includes(role) ?
                      <li className={"nav-item " + active[8]}
                        onClick={() => activing(8)}>
                        <Link style={{ textAlign: 'left' }} to={`${path}/changePassword`}>
                          <i className="fas fa-lock" style={{ paddingRight: '4%' }}></i>
                      Cambia Password
                    </Link>
                      </li>
                      :
                      null
                  }
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
      }
    </>
  )
}

export default Manage;
