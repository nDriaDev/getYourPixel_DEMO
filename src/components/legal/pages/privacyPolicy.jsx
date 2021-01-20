import React, {useEffect} from 'react';
import Const from './../../../util/Costanti';

const PrivacyPolicy = ({spinnerCommand}) => {

  useEffect(() => {
    spinnerCommand(true);
  },[])

  useEffect(() => {
    spinnerCommand(false);
  },[])

  return (
    <>
    <iframe src={Const.PRIVACY_POLICY_LINK} title="Privacy Policy" style={{width:'100%', height:'100%'}}>
    </iframe>

    </>
  )
}

export default PrivacyPolicy;
