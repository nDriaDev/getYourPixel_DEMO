import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import Const from './../../../util/Costanti';
import axios from 'axios';


const Terms = ({spinnerCommand}) => {
  const [html,setHtml] = useState(null);

  useEffect(() => {
    spinnerCommand(true);
    setHtml(true);
  },[])

  useEffect(() => {
    spinnerCommand(false);
  },[])

  return (
    <>
      { html &&
        <div className="mx-auto mb-5">

        </div>
      }
    </>
  )
}

export default Terms;
