import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import Const from './../../../util/Costanti';

const PrivacyPolicy = ({spinnerCommand}) => {
  const { t } = useTranslation();

  const [html, setHtml] = useState(null);

  useEffect(() => {
    spinnerCommand(true);
    setHtml(true);
  },[])

  useEffect(() => {
    spinnerCommand(false);
  },[])

  return (
      html &&
    <>
      <div className="" style={{ backgroundColor: '#FFFFFF', height: 'inherit', overflowY: 'scroll' }}>
        <div className="terms-page" style={{ paddingLeft: '6%', paddingRight: '6%', width: '100%' }}>
          <h2 align="center">PRIVACY POLICY</h2>
          <ol align="center" style={{paddingBottom:'20px'}}>
            <li style={{paddingLeft:'0px'}}>
              <i>
                {t('legal.privacyPolicy.subTitle')}
              </i>
            </li>
          </ol>
          <ol>
            <li>
              {t('legal.privacyPolicy.paragraph')}
            </li>
          </ol>
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.privacyPolicy.premesse.title')}
          </h3>
          <ol>
            <li>
              {t('legal.privacyPolicy.premesse.li1')}
            </li>
            <li>
              {t('legal.privacyPolicy.premesse.li2')}
            </li>
              <div style={{paddingLeft: '8%'}}>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.privacyPolicy.premesse.li21')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.privacyPolicy.premesse.li22')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.privacyPolicy.premesse.li23')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.privacyPolicy.premesse.li24')}
                </li>
              </div>
            <li>
              {t('legal.privacyPolicy.premesse.li3')}
            </li>
            <li>
              {t('legal.privacyPolicy.premesse.li4')}
            </li>
          <br />
          </ol>
          <ol>
            <li>
              {t('legal.privacyPolicy.premesse.liFinal')}
            </li>
          </ol>

          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.privacyPolicy.trattamentoDeiDati.title')}
          </h3>
          <ol>
            <li>
              {t('legal.privacyPolicy.trattamentoDeiDati.li1')}
            </li>
            <li>
              {t('legal.privacyPolicy.trattamentoDeiDati.li2')}
            </li>
            <li>
              {t('legal.privacyPolicy.trattamentoDeiDati.li3')}
            </li>
            <li>
              {t('legal.privacyPolicy.trattamentoDeiDati.li4')}
            </li>
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.privacyPolicy.datiTrattati.title')}
          </h3>
          <ol>
            <li>
              {t('legal.privacyPolicy.datiTrattati.li1')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li11')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li12')}
              </li>
            </div>
            <li>
              {t('legal.privacyPolicy.datiTrattati.li2')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li21')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li22')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li23')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li24')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li25')}
              </li>
            </div>
            <li>
              {t('legal.privacyPolicy.datiTrattati.li3')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li31')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li32')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li33')}
              </li>
            </div>
            <li>
              {t('legal.privacyPolicy.datiTrattati.li4')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li41')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li42')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.privacyPolicy.datiTrattati.li43')}
              </li>
            </div>
            <li>
              {t('legal.privacyPolicy.datiTrattati.li4Final')}
            </li>
            <li>
              {t('legal.privacyPolicy.datiTrattati.li5')}
            </li>
            <li>
              {t('legal.privacyPolicy.datiTrattati.li6')}
            </li>
            <br />
          </ol>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy;
