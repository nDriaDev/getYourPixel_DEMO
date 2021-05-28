import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Const from './../../../util/Costanti';

const CookiePolicy = ({ spinnerCommand }) => {
  const { t } = useTranslation();

  const [html, setHtml] = useState(null);

  useEffect(() => {
    spinnerCommand(true);
    setHtml(true);
  }, [])

  useEffect(() => {
    spinnerCommand(false);
  }, [])

  return (
    html &&
    <>
      <div className="" style={{ backgroundColor: '#FFFFFF', height: 'inherit', overflowY: 'scroll' }}>
        <div className="terms-page" style={{ paddingLeft: '6%', paddingRight: '6%', width: '100%' }}>
          <h2 align="center" style={{marginBottom:'1rem', paddingBottom:'20px'}}>COOKIE POLICY</h2>
          <ol>
            <li>
              {t('legal.cookiePolicy.li1')}
            </li>
            <li>
              {t('legal.cookiePolicy.li2')}
            </li>
            <li>
              {t('legal.cookiePolicy.li3')}
            </li>
            <li>
              {t('legal.cookiePolicy.li4')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                <u>
                  {t('legal.cookiePolicy.li41')}
                </u>
                <br/>
                {t('legal.cookiePolicy.li411')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                <u>
                  {t('legal.cookiePolicy.li42')}
                </u>
                <br />
                {t('legal.cookiePolicy.li421')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                <u>
                  {t('legal.cookiePolicy.li43')}
                </u>
                <br />
                {t('legal.cookiePolicy.li431')}
              </li>
            </div>
            <li>
              {t('legal.cookiePolicy.li5')}
            </li>
            <li>
              {t('legal.cookiePolicy.li6')}
            </li>
            <br />
          </ol>

          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.cookiePolicy.modalitaDiTrattamento.title')}
          </h3>
          <ol>
            <li>
              {t('legal.cookiePolicy.modalitaDiTrattamento.li1')}
            </li>
            <li>
              {t('legal.cookiePolicy.modalitaDiTrattamento.li2')}
            </li>
            <li>
              {t('legal.cookiePolicy.modalitaDiTrattamento.li3')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.modalitaDiTrattamento.li31')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.modalitaDiTrattamento.li32')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.modalitaDiTrattamento.li33')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.modalitaDiTrattamento.li34')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.modalitaDiTrattamento.li35')}
              </li>
            </div>
            <li>
              {t('legal.cookiePolicy.modalitaDiTrattamento.li4')}
            </li>
            <li>
              {t('legal.cookiePolicy.modalitaDiTrattamento.li4Final')}
            </li>
            <li>
              {t('legal.cookiePolicy.modalitaDiTrattamento.li5')}
            </li>
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.cookiePolicy.finalitaDiUtilizzo.title')}
          </h3>
          <ol>
            <li>
              {t('legal.cookiePolicy.finalitaDiUtilizzo.li1')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.finalitaDiUtilizzo.li11')}
              </li>
              <div style={{ paddingLeft: '8%' }}>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.cookiePolicy.finalitaDiUtilizzo.li111')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.cookiePolicy.finalitaDiUtilizzo.li112')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.cookiePolicy.finalitaDiUtilizzo.li113')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.cookiePolicy.finalitaDiUtilizzo.li114')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.cookiePolicy.finalitaDiUtilizzo.li115')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.cookiePolicy.finalitaDiUtilizzo.li116')}
                </li>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.cookiePolicy.finalitaDiUtilizzo.li117')}
                </li>
              </div>
              <li>
                {t('legal.cookiePolicy.finalitaDiUtilizzo.li12')}
              </li>
              <div style={{ paddingLeft: '8%' }}>
                <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                  {t('legal.cookiePolicy.finalitaDiUtilizzo.li121')}
                </li>
                <div style={{ paddingLeft: '8%' }}>
                  <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                    {t('legal.cookiePolicy.finalitaDiUtilizzo.li1211')}
                  </li>
                  <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                    {t('legal.cookiePolicy.finalitaDiUtilizzo.li1212')}
                  </li>
                </div>
              </div>
            </div>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.cookiePolicy.pluginSocialNetwork.title')}
          </h3>
          <ol>
            <li>
              {t('legal.cookiePolicy.pluginSocialNetwork.li1')}
            </li>
            <li>
              {t('legal.cookiePolicy.pluginSocialNetwork.li1Final')}
            </li>
            <li>
              {t('legal.cookiePolicy.pluginSocialNetwork.li1Final2')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.cookiePolicy.dirittiDellUtente.title')}
          </h3>
          <ol>
            <li>
              {t('legal.cookiePolicy.dirittiDellUtente.li1')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.dirittiDellUtente.li11')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.dirittiDellUtente.li12')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.dirittiDellUtente.li13')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.dirittiDellUtente.li14')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.dirittiDellUtente.li15')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.dirittiDellUtente.li16')}
              </li>
            </div>
            <li>
              {t('legal.cookiePolicy.dirittiDellUtente.li2')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.dirittiDellUtente.li21')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.dirittiDellUtente.li22')}
              </li>
            </div>
            <li>
              {t('legal.cookiePolicy.dirittiDellUtente.li3')}
            </li>
            <li>
              {t('legal.cookiePolicy.dirittiDellUtente.li4')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.title')}
          </h3>
          <ol>
            <li>
              {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.li1')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.li11')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.li12')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.li13')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.li14')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.li15')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.li16')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.cookiePolicy.divulgazioneDeiDatiPersonali.li17')}
              </li>
            </div>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.cookiePolicy.sicurezzaDatiForniti.title')}
          </h3>
          <ol>
            <li>
              {t('legal.cookiePolicy.sicurezzaDatiForniti.li1')}
            </li>
            <li>
              {t('legal.cookiePolicy.sicurezzaDatiForniti.li2')}
            </li>
            <li>
              {t('legal.cookiePolicy.sicurezzaDatiForniti.li3')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.cookiePolicy.disattivazioneDelleNostreComunicazioni.title')}
          </h3>
          <ol>
            <li>
              {t('legal.cookiePolicy.disattivazioneDelleNostreComunicazioni.li1')}
            </li>
            <li>
              {t('legal.cookiePolicy.disattivazioneDelleNostreComunicazioni.li2')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.cookiePolicy.conclusioneEdAccettazione.title')}
          </h3>
          <ol>
            <li>
              {t('legal.cookiePolicy.conclusioneEdAccettazione.li1')}
            </li>
            <li>
              {t('legal.cookiePolicy.conclusioneEdAccettazione.li2')}
            </li>
            <li>
              {t('legal.cookiePolicy.conclusioneEdAccettazione.li3')}
            </li>
            <li>
              {t('legal.cookiePolicy.conclusioneEdAccettazione.li4')}
            </li>
            <br />
            <br />
          </ol>
          <ol>
            <li>
              {t('legal.cookiePolicy.conclusioneEdAccettazione.liFinal')}
            </li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default CookiePolicy;
