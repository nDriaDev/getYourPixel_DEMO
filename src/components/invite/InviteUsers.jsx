import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Const from '../../util/Costanti';
import { Modal } from '../modal/Modal';
import { ShareLink } from './ShareLink';


export const InviteUsers = (props) => {
    const [data, setData] = useState('');
    const [showModal, setShowModal] = useState(false);

    const isMobile = Const.isMobileBrowser(navigator.userAgent);

    useEffect(() => {
        props.disableSpinner();
        props.spinnerCommand(true);
        axios.post(Const.GET_USER_AND_REFERRED, {})
            .then(res => {
                if (!res.data.code) {
                    setData({
                        promoCode: res.data.promoCode,
                        referred: res.data.referred
                    });
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
    }, [])

    const copyPromo = () => {
        const promo = document.querySelector('#promoCode');
        promo.removeAttribute("disabled");
        promo.select();
        promo.setSelectionRange(0, 99999);
        document.execCommand('copy');
        window.getSelection()?.empty()
        window.getSelection()?.removeAllRanges()
        promo.setAttribute("disabled","disabled");
        const tooltip = document.querySelector('#mytooltip');
        tooltip.innerHTML = "Copied!";
        document.querySelector('#container-tooltip').classList.add('tooltip-icon');
        setTimeout(() => {
            tooltip.innerHTML = "";
            document.querySelector('#container-tooltip').classList.remove('tooltip-icon');
        },1500)
    }

    const openModal = () => {
        setShowModal(true);
    }

    return (
        <div className="mx-auto mb-5" style={{ maxWidth: '408px', border: '2px solid #FFFFFF80', borderRadius: '5%' }}>
            <div className="mt-2" align="center">
                <h1 style={{ color: '#28a745' }}>Invita</h1>
            </div>
            <div className="mx-auto" style={{ textAlign: 'center', width: '85%' }}>
                <form noValidate className="mx-auto mt-3 mb-4">
                    <div className="row mb-5">
                        <div className="col-12">
                            <label htmlFor="promoCode" className="form-label" style= {{color: 'white', fontSize: '1em'}}>Codice Promo</label>
                        </div>
                        <div className="col-6 offset-3">
                            <input
                                type="text"
                                id="promoCode"
                                name="promoCode"
                                className="form-control"
                                value={data.promoCode}
                                disabled
                            />
                        </div>
                        <div id="container-tooltip" className="col-2" style={{paddingLeft: '0px', top: '7px'}}>
                            <span id="mytooltip" className="tooltip-icon-text"></span>
                            <i className="fas fa-clone" style={{ color: 'white', cursor:'pointer' }} onClick={copyPromo}></i>
                        </div>
                    </div>
                    <button type="button" className="btn btn-success" style={{ width: '65%' }} onClick={openModal}>
                        <i className="fas fa-share"></i>
                        Condividi link
                    </button>
                </form>
                <div className="row" style={{ overflowY: 'scroll'}}>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th><i className="fas fa-user" /></th>
                                <th>Username</th>
                                <th>Stato</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: 'white' }}>
                            {
                                data?.referred?.length > 0 ?
                                    data.referred.map((item, index) => (
                                        <tr key={'tr_' + index}>
                                            <td key={'td1_' + index}>{index + 1}</td>
                                            <td key={'td2_' + index}>{item.username}</td>
                                            <td key={'td3_' + index}>{
                                                item.stato ?
                                                    <i className="fas fa-check-circle" style={{ color: 'green' }} />
                                                    :
                                                    <i className="fas fa-times-circle" style={{ color: 'red' }} />
                                            }</td>
                                        </tr>
                                    ))
                                    :
                                    null
                            }
                        </tbody>
                    </Table>
                    {
                        data?.referred?.length === 0 ?
                            <div className="mb-3">      
                                <span>
                                    Non ci sono elementi da visualizzare
                                </span>
                            </div>
                            :
                            null
                    }
                </div>
                <Modal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    style={{ background: 'black', width: isMobile ? '65%' : '20%' , height: 'fit-content', fontSize: '1.15em' }}
                >
                    <ShareLink promoCode={data.promoCode} />
                </Modal>
            </div>
        </div>
    )
}