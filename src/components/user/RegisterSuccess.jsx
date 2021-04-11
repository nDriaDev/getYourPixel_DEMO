import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Const from '../../util/Costanti';

export const RegisterSuccess = React.memo(({ disableSpinner }) => {
    
    const history = useHistory();

    const goToLogin = () => {
        history.push(Const.PATH_LOGIN);
    }

    useEffect(() => {
        disableSpinner();
    },[disableSpinner])
    
    return (
        <div className="mx-auto mb-5 text-center" style={{ maxWidth: '408px', maxHeight: '334px', display:'block'}}>
            <div className="display-grid mt-2 mb-3">
                <h1 style={{ color:'#28a745' }}>
                    <i class="fas fa-paper-plane"></i>
                </h1>
                <h3 style={{color:'#28a745'}}>
                    Grazie per esserti registrato!
                </h3>
                <br></br>
                <h7 style={{ color: 'white' }}>
                    Riceverai a breve un'email di conferma con un link per attivare il tuo account. Se non
                    visualizzi l'email nella posta ricevuta, controlla nella cartella SPAM
                </h7>
                <br></br><br></br>
                <div className="text-center">
                    <Button variant="success" type="button" onClick={goToLogin}>
                        <i className="fas fa-sign-in-alt" style={{ paddingRight: '4%' }}></i>
                        {'Login'}
                    </Button>
                </div>
            </div>
        </div>
    )
})