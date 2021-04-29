import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import Const from './../../util/Costanti';

export const Invite = React.memo(({ isAuth, isAuthBasic, enableSpinner, disableSpinner }) => {
    const history = useHistory();

    const invite = useCallback(() => {
        if (isAuth) {
            return;
        }
        enableSpinner();
        if (isAuthBasic) {
            history.push('/manage' + Const.PATH_SHARE_CODE);
        } else {
            history.push('/login');
        }
    },[isAuth, isAuthBasic, history])

    useEffect(() => {
        disableSpinner();
    })

    return (
        <div style={{ height: '100%', textAlign: 'center' }}>
            <div className="col-sm-12" style={{ color: '#FFFFFF', hieght: '75vh', overflowY: 'scroll' }}>
                <h1 style={{ textAlign: 'center', color: '#28a745' }}>
                    INVITA AMICI
                </h1>
                <br/>
                <br />
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    Condivi il tuo codice promo e ottieni 25 punti per ogni amico che completer&agrave; la registrazione inserendolo nell'apposito spazio.
                </span>
                <br />
                <br />
                <div className="mx-auto" style={{ width: 'fit-content' }}>
                    <button id="btn-1" type="button" className="btn-contact btn-success" onClick={invite}>
                        Invita Amici
                    </button>
                </div>
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    Una volta ricevuto l'invito, il tuo amico dovr&agrave; cliccare sul link e seguire la procedura per completare la registrazione.
                </span>
                <br />
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    Sar&agrave; sufficiente poi che visualizzi una singola pubblicit&agrave; per sbloccare il bonus.
                </span>
                <br />
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    Gli amici che si registreranno utilizzando il tuo codice riceveranno a loro volta 5 punti dopo aver guardato la prima pubblicit&agrave;.
                </span>
                <br />
                <br />
                <br />
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    Attualmente puoi ottenere il bonus fino a 50 volte! Questo vorrebbe dire superare i 1200 punti e aumentare di molto le probabilit&agrave; di essere estratto.
                </span>
                <br />
                <br />
                <div className="mx-auto" style={{ width: 'fit-content' }}>
                    <button id="btn-2" type="button" className="btn-contact btn-success" onClick={invite}>
                        Invita Amici
                    </button>
                </div>
            </div>
        </div>    
    )  
})