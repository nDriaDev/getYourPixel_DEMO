import React from 'react';
import { useTranslation } from 'react-i18next';


const ManageHome = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mb-5" style={{maxWidth:'406px',border:'2px solid #FFFFFF80', borderRadius:'5%'}}>
      <div className="mt-2" align="center">
        <h2 style={{fontSize: '2.5rem',color:'#28a745'}}>{t('manage.home.setting')}</h2>
        <div className="mt-3 mb-4" align="center">
          <h6 style={{ color: '#FFFFFF' }}>{t('manage.home.description')}</h6>
        </div>
      </div>
    </div>
  )
}

export default ManageHome;
