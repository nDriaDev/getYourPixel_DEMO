import moment from 'moment-timezone';
import {React, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import FacebookTracer from './../utils/trackingFacebook';

const Win = (props) => {
  const { t } = useTranslation();
  const isEurope = moment.tz.guess(true).indexOf('Europe') !== -1 ? true : false;
  const price1 = isEurope ? "100'000" : "120'000";
  const price2 = isEurope ? "500'000€" : "600'000$";
  const price3 = isEurope ? "100'000€" : "120'000$";

  useEffect(() => {
    FacebookTracer.initTracer();
    FacebookTracer.tracePage();
    
    props.disableSpinner();
  }, []);

  return (
    <div style={{height:'100%'}}>
    <div className="col-sm-12" style={{color:'#FFFFFF', height:'75vh', overflowY:'scroll'}}>
        <h1 style={{ textAlign: 'center', color: '#28a745' }}>
          {t('win.title', {price1: price1, price2: price2})}
      </h1>
      <br/>
      <br/>
      <br/>
      <br/>
        <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
          {t('win.desc1', {price3: price3})}
      </span>
      <br/>
      <br/>
        <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
          {t('win.desc2')}
        </span>
      <br/>
      <br/>
      <br/>
        <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
          {t('win.desc3')}
      </span>
      <br/>
        <ol>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              1-&nbsp;
            </span>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              {t('win.desc311')}
              <a className="a-animated" href="/register"> {t('win.click')} </a>
              {t('win.desc312')}
            </span>
          </li>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              2-&nbsp;
            </span>
            <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
              {t('win.desc32')}
            </span>
          </li>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              3-&nbsp;
            </span>
            <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
              {t('win.desc33')}
            </span>
          </li>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              4-&nbsp;
            </span>
            <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
              {t('win.desc34')}
            </span>
          </li>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              5-&nbsp;
            </span>
            <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
              {t('win.desc35')}
            </span>
          </li>
        </ol>
        <br/>
        <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
          {t('win.desc36')}
          <a className="a-animated" href="/invite"> {t('win.inviteClick')} </a>
          {t('win.desc37')}
      </span>
        <br/>
        <br/>
        <br/>
        <br/>
        <h5>
          {t('win.desc4')}
        </h5>
        <span style={{ fontSize: '.95rem', textAlign: 'justify' }}>
          {t('win.desc41')}
          <br />
          {t('win.desc42')}
        </span>
        <h3 style={{ marginTop: '1.7rem' }}>
          {t('win.desc43')}
        </h3>
    </div>
    </div>
  )
}

export default Win;
