import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Const from '../../util/Costanti';
import { Modal } from '../modal/Modal';
import { ShareLink } from './ShareLink';


export const InviteUsers = (props) => {
    const [promoCode, setPromoCode] = useState('');
    const [showModal, setShowModal] = useState(false);

    const isMobile = Const.isMobileBrowser(navigator.userAgent);

    useEffect(() => {
        props.disableSpinner();
        props.spinnerCommand(true);
        axios.post(Const.GET_USER, {})
            .then(res => {
                if (!res.data.code) {
                    setPromoCode(res.data.promoCode);
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
                <form noValidate className="mx-auto mt-5">
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
                                value={promoCode}
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
                <Modal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    style={{ background: 'black', width: isMobile ? '65%' : '20%' , height: 'fit-content', fontSize: '1.15em' }}
                >
                    <ShareLink promoCode={promoCode} />
                </Modal>
            </div>
        </div>
    )
}