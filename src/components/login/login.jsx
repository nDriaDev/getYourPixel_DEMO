import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import Const from './../../util/Costanti';
import axios from 'axios';

const Login = (props) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = event => {
    let {name, value} = event.target;
    setForm({...form, [name]:value});
  }

  const onSubmit = (event) => {
    let formSet = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    props.enableSpinner();
    axios.post(Const.LOGIN, form)
    .then(res => {
      if (res.status === 200) {
        // this.props.history.push('/manage');
        console.log("res", res);
      } else {
        throw new Error(res.message);
      }
    })
    .catch(err => {
      toast.error(err.message != null ? err.message : "ERRORE", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={e => handleInputChange(e)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={form.password}
        onChange={e => handleInputChange(e)}
        required
      />
    <button type="submit" value="Submit"/>
    </form>
  )
}

export default Login;
