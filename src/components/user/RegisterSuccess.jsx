import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Const from '../../util/Costanti';

export const RegisterSuccess = React.memo(({ disableSpinner }) => {
    const { t } = useTranslation();

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
                    {t('registerSuccess.title')}
                </h3>
                <br></br>
                <h7 style={{ color: 'white' }}>
                    {t('registerSuccess.description')}
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