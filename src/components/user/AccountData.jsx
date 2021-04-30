import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Const from '../../util/Costanti';
import ChangePasswordModal from '../changePassword/changePasswordModal';
import { Modal } from '../modal/Modal';

export const AccountData = React.memo((props) => {
    const [validated, setValidated] = useState({ username: true, email: true, })
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        props.spinnerCommand(true);
        axios.post(Const.GET_USER, {})
            .then(res => {
                if (!res.data.code) {
                    setForm({
                        username: res.data.username,
                        email: res.data.email,
                        password: res.data.password
                    })
                    props.spinnerCommand(false);
                } else {
                    props.spinnerCommand(false);
                    toast.error(res.data.message != null ? res.data.message : "ERRORE", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
        })
        .catch(err => {
            props.spinnerCommand(false);
            toast.error(err.message != null ? err.message : "ERRORE", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        })
    },[])

    const handleInputChange = (e, val = null) => {
        if (e === 'password') {
            setForm({ ...form, password: val })
            setShowModal(false);
            return;
        }
        setForm({ ...form, [e.target.name] : e.target.value})
    }

    const redirectToLogin = () => {
        //click sul pulsante logout        
        const logout = document.querySelector('#logout')
        logout.click();
    }
    
    const onSubmit = (e) => {
        props.spinnerCommand(true);
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('#username').classList.remove('is-invalid');
        document.querySelector('#email').classList.remove('is-invalid');
        const error = false;
        setValidated({
            username: true,
            email: true
        })
        if (!form.username || form.username === '') {
            setValidated({ ...validated, username: false })
            document.querySelector('#username').classList.add('is-invalid');
            props.spinnerCommand(false);
            error = true;
        }
        if (!form.email || form.email === '') {
            setValidated({ ...validated, email: false})
            document.querySelector('#email').classList.add('is-invalid');
            props.spinnerCommand(false);
            error = true;
        }
        if(error) {
            return;
        }
        axios.post(Const.GET_USER, {})
        .then(result => {
            if (!result.data.code) {
                let obj = {};
                    if(result.data.email !== form.email) {
                        obj.email = form.email;
                    }
                    if(result.data.username !== form.username) {
                        obj.username = form.username;
                    }
                    if (result.data.password !== form.password) {
                        obj.password = form.password;
                    }
                    axios.post(Const.EDIT_USER, obj)
                        .then(res => {
                            if (res.data.code === 200) {
                                props.spinnerCommand(false);
                                toast.success(res.data.message, {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    onClose: redirectToLogin
                                });
                            } else {
                                props.spinnerCommand(false);
                                toast.error(res.data.message, {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                        })
                        .catch(err => {
                            props.spinnerCommand(false);
                            toast.error(err.message ? err.message : err, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                    })
                } else {
                    props.spinnerCommand(false);
                    toast.error(result.data.message != null ? result.data.message : "ERRORE", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(err => {
                props.spinnerCommand(false);
                toast.error(err.message ? err.message : err, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const openModal = (e) => {
        setShowModal(true);
    }

    const enableChanges = (e) => {
        const name = e.target.id.split('-')[1];
        document.querySelector('#'+name).removeAttribute("disabled");

    }

    return (
        form.username !== '' &&
        <div className="mx-auto mb-5" style={{ maxWidth: '408px', border: '2px solid #FFFFFF80', borderRadius: '5%' }}>
            <div className="mt-2" align="center">
                <h1 style={{ color: '#28a745' }}>Dati Account</h1>
            </div>
            <div className="mx-auto" style={{ textAlign: 'center', width: '85%' }}>
                <form noValidate className="mx-auto mt-3" onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-xs-8">
                            <div className="form-group" style={{ textAlign: 'left', color: 'white' }}>
                                <label htmlFor="username" className="form-label">Username *</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    value={form.username}
                                    onChange={handleInputChange}
                                    required
                                    disabled
                                />
                                {
                                    !validated.username &&
                                    <span style={{color: 'red', fontSize:'0.90em'}}>Il campo è obbligatorio</span>
                                }
                            </div>
                        </div>
                        <div className="col-xs-1" style={{verticalAlign:'bottom', paddingLeft:'5px'}}>
                            <i
                                id="pencil-username"
                                name="username"
                                className="fas fa-pencil-alt"
                                style={{ color: 'white', position: 'absolute', top: '117px' }}
                                onClick={enableChanges}></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-8">
                            <div className="form-group" style={{ textAlign: 'left', color: 'white' }}>
                                <label htmlFor="email" className="form-label">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled
                                />
                                {/* {
                                    !validated.email &&
                                    <span style={{ color: 'red', fontSize:'0.90em' }}>Il campo è obbligatorio</span>
                                } */}
                            </div>
                        </div>
                        <div className="col-xs-1" style={{verticalAlign:'bottom', paddingLeft:'5px'}}>
                            <i
                                id="pencil-email"
                                name="email"
                                className="fas fa-pencil-alt"
                                style={{ color: 'white', position:'absolute', top:'202px' }}
                                onClick={enableChanges}></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-8">
                            <div className="form-group" style={{ textAlign: 'left', color: 'white' }}>
                                <label htmlFor="password" className="form-label">Password *</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={form.password}
                                    onChange={handleInputChange}
                                    required
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-xs-1" style={{verticalAlign:'bottom', paddingLeft:'5px'}}>
                            <i
                                id="pencil-password"
                                name="password"
                                className="fas fa-pencil-alt"
                                style={{ color: 'white', position: 'absolute', top: '288px' }}
                                onClick={openModal}></i>
                        </div>
                    </div>
                    <button className="btn btn-success" type="submit">
                        <i className="fas fa-save" style={{ paddingRight: '4%' }}></i>
                        {'Aggiorna'}
                    </button>
                </form>
            </div>
            <Modal
                show={showModal}
                handleClose={()=>setShowModal(false)}
                style={{ background: 'black', width: '50%', height:'40%', fontSize: '0.85em' }}
            >
                <ChangePasswordModal setData={handleInputChange} showModal={showModal}/>
            </Modal>
        </div>
    )
})