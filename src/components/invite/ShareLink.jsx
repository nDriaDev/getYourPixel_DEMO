import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Facebook from './../../images/facebook.png';
import Messenger from './../../images/messenger.png';
import Instagram from './../../images/instagram.png';
import Whatsapp from './../../images/whatsapp.png';
import Gmail from './../../images/gmail.png';
import { useTranslation } from 'react-i18next';

export const ShareLink = ({ promoCode }) => {
    const { t, i18n } = useTranslation();

    const location = useLocation();


    const link = (process.env.REACT_APP_BASE_URL ?
        process.env.REACT_APP_BASE_URL
        :
        // '<your baseURL here>'
        'http://localhost:3000/'
    ) + 'register?ref=' + promoCode;
    
    const copyText = i18n.language === 'it' ? 'Copia link...' : 'Copy link...';
    const copiedText = i18n.langue === 'it' ? 'Link copiato!' : 'Link copied!';

    const [text, setText] = useState(copyText)

    const copyPromo = () => {
        navigator.clipboard.writeText(link);
        setText(copiedText)
        setTimeout(() => {
            setText(copyText)
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
        window.location.href = 'http://m.me/';
    }

    const shareLinkInstagram = () => {
        copyPromo();
        window.location.href = 'http://instagr.am/';
    }

    const shareLinkEmail = () => {
        window.location.href = 'mailto:?subject=Get%20your%20pixels&body=Registrati%20subito!%0D%0A%0D%0AApri%20il%20link%0D%0A%0D%0A' + link
    }

    const shareLinkWhatsApp = () => {
        window.location.href = 'https://wa.me/?text=' + 'Iscriviti subito su Get your pixels! Apri il link ' + link;
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
                    <img className="" style={{width:'100%'}} src={Whatsapp} onClick={shareLinkWhatsApp}></img>
                </div>
                <div className="col" style={{ color:'#405DE6', fontSize:'24px', cursor: 'pointer' }}>
                    <img className="" style={{width:'100%'}} src={Facebook} onClick={shareLinkFacebook}></img>
                </div>
                <div className="col" style={{ color:'#405DE6', fontSize:'24px', cursor: 'pointer' }}>
                    <img className="" style={{width:'100%'}} src={Messenger} onClick={shareLinkMessenger}></img>
                </div>
                <div className="col" style={{ color:'#fb3958', fontSize:'24px', cursor: 'pointer' }}>
                    <img className="" style={{width:'100%'}} src={Instagram} onClick={shareLinkInstagram}></img>
                </div>
                <div className="col" style={{color:'#BB001B', fontSize:'24px', cursor: 'pointer' }}>
                    <img className="" style={{width:'100%'}} src={Gmail} onClick={shareLinkEmail}></img>
                </div>
            </div>
        </>
    )
}