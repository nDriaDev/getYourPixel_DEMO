import React, { useState } from 'react';
import { useLocation } from 'react-router';

export const ShareLink = ({ promoCode }) => {
    const location = useLocation();


    const link = (process.env.REACT_APP_BASE_URL ?
        process.env.REACT_APP_BASE_URL
        :
        // '<your baseURL here>'
        'http://localhost:3000/'
    ) + 'register?ref=' + promoCode;

    const [text, setText] = useState('Copia link...')

    const copyPromo = () => {
        navigator.clipboard.writeText(link);
        setText('Link copiato!')
        setTimeout(() => {
            setText('Copia link...')
        }, 800)
    }

    const shareLinkFacebook = () => {
        // window.location.href = 'fb://facewebmodal/f?href=https://www.facebook.it/dialog/share?app_id=145634995501895&display=popup&href=https://www.facebook.it/&redirect_uri=https://www.facebook.it'
        copyPromo();
        window.location.href = 'fb://';
    }

    const shareLinkMessenger = () => {
        copyPromo();
        // 'fb-messenger://share?link='
        // 'http://m.me/'
        window.location.href = 'https://m.me/';
    }

    const shareLinkInstagram = () => {
        copyPromo();
        window.location.href = 'http://instagr.am/p/';
    }

    const shareLinkEmail = () => {
        window.location.href = 'mailto:?subject=Get%20your%20pixels&body=Registrati%20subito!%0D%0A%0D%0AApri%20il%20link%0D%0A%0D%0A' + link
    }

    const shareLinkWhatsApp = () => {
        window.location.href = 'https://wa.me/?text=' + 'Iscriviti subito a Get your pixels! Apri il link ' + link;
    }

    return (
        <>
            <div className="mt-4 ml-3 mr-3 mb-5">
                <span style={{color:'white', float: 'left'}}>{text}</span>
                <i className="fas fa-clone" style={{ color: 'white', float:'right', cursor: 'pointer', fontSize:'24px' }} onClick={copyPromo}></i>
            </div>
            <hr />
            <div className="row mt-4 ml-0 mr-0 mb-5">
                <div className="col" style={{ color: '#4fce5d', fontSize: '24px', cursor: 'pointer' }}>
                    <i className="fab fa-whatsapp" onClick={shareLinkWhatsApp}></i>
                </div>
                <div className="col" style={{ color:'#405DE6', fontSize:'24px', cursor: 'pointer' }}>
                    <i className="fab fa-facebook-square" onClick={shareLinkFacebook}></i>
                </div>
                <div className="col" style={{ color:'#405DE6', fontSize:'24px', cursor: 'pointer' }}>
                    <i className="fab fa-facebook-messenger" onClick={shareLinkMessenger}></i>
                </div>
                <div className="col" style={{ color:'#fb3958', fontSize:'24px', cursor: 'pointer' }}>
                    <i className="fab fa-instagram" onClick={shareLinkInstagram}></i>
                </div>
                <div className="col" style={{color:'#BB001B', fontSize:'24px', cursor: 'pointer' }}>
                    <i className="far fa-envelope" onClick={shareLinkEmail}></i>
                </div>
            </div>
        </>
    )
}