import React, {useEffect} from 'react';
import Const from './../../../util/Costanti';


const CookiePolicy = ({spinnerCommand}) => {

  useEffect(() => {
    spinnerCommand(true);
  },[])

  useEffect(() => {
    spinnerCommand(false);
  },[])

  return (
    <>
    <iframe src={Const.COOKIE_POLICY_LINK} title="Cookie Policy" style={{width:'100%', height:'100%'}}>
    </iframe>

    </>
  )
}

export default CookiePolicy;
