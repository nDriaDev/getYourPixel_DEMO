import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Const from './../../util/Costanti';

export const Invite = React.memo(({ isAuth, isAuthBasic, enableSpinner, disableSpinner }) => {
    const { t } = useTranslation();

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
                    {t('invite.title')}
                </h1>
                <br/>
                <br />
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    {t('invite.span1')}
                </span>
                <br />
                <br />
                <div className="mx-auto" style={{ width: 'fit-content' }}>
                    <button id="btn-1" type="button" className="btn-contact btn-success" onClick={invite}>
                        {t('invite.button')}
                    </button>
                </div>
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    {t('invite.span2')}
                </span>
                <br />
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    {t('invite.span3')}
                </span>
                <br />
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    {t('invite.span4')}
                </span>
                <br />
                <br />
                <br />
                <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
                    {t('invite.span5')}
                </span>
                <br />
                <br />
                <div className="mx-auto" style={{ width: 'fit-content' }}>
                    <button id="btn-2" type="button" className="btn-contact btn-success" onClick={invite}>
                        {t('invite.button')}
                    </button>
                </div>
            </div>
        </div>    
    )  
})