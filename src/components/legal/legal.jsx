import React, {useState, useEffect} from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import LegalRoute from './legalRoute';

const Legal = (props) => {
  const history = useHistory();
  let {path} = useRouteMatch();
  const [active,setActive] = useState(() => {
      let pathSpli = window.location.pathname.split('/');
      if(pathSpli[pathSpli.length-1] === 'legal') {
        return ['active-v-bar','',''];
      }
      else if(pathSpli[pathSpli.length-1] === 'cookiePolicy') {
        return ['','active-v-bar',''];
      } else {
        return ['','','active-v-bar'];
      }
  }
);
  const [spinner, setSpinner] = useState(false);

  useEffect(()=>{
    props.disableSpinner();
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
    <>
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
                  <Link style={{textAlign:'left'}} to={path}> Privacy Policy </Link>
                </li>
                <li className={"nav-item " + active[1]}
                  onClick={()=>activing(1)}>
                  <Link style={{textAlign:'left'}} to={`${path}/cookiePolicy`}> Cookie Policy </Link>
                </li>
                <li className={"nav-item " + active[2]}
                  onClick={()=>activing(2)}>
                  <Link style={{textAlign:'left'}} to={`${path}/termsAndConditions`}> Terms and Conditions </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-lg-10 col-md-10 col-sm-11 col-xs-11">
          <div className="container-fluid container-v-bar" style={{height:'100%'}}>
            <LegalRoute spinner={spinner} spinnerCommand={spinnerCommand} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Legal;
