import React, { useEffect, useRef } from 'react';
import './../../css/modal.css';

export const Modal = ({ handleClose, show, style, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const refModalMain = useRef(null);
    const refModal = useRef();
    
    useEffect(() => {
        function handleClickOutsideModal(e){
            if (refModalMain.current && !refModalMain.current.contains(e.target)) {
                handleClose();
            }
        }
        refModal.current.addEventListener("click", handleClickOutsideModal, false);

    }, [])

    return (
        <div className={showHideClassName} ref={refModal}>
            <section className="modal-main" style={style} ref={refModalMain}>
                {
                    handleClose &&
                    <i
                        className="fas fa-times"
                        style={{ fontSize: '16px', right: '4px', top: '2px', position: 'absolute', color: '#6c757d' }}
                        onClick={handleClose} />
            }
                {children}
                <div align="right" style={{ paddingRight: '5px', paddingBottom:'5px'}}>
                    {handleClose &&
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    }
                </div>
            </section>
        </div>
    );
};