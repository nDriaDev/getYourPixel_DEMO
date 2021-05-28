import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Const from './../../../util/Costanti';

const Terms = ({ spinnerCommand }) => {
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
          <h2 align="center">{t('legal.termini&Condizioni.title')}</h2>
          <ol align="center" style={{ paddingBottom: '20px' }}>
            <li style={{ paddingLeft: '0px' }}>
              <i>
                {t('legal.termini&Condizioni.subTitle')}
              </i>
            </li>
          </ol>
          <ol>
            <li>
              {t('legal.termini&Condizioni.paragraph')}
            </li>
            <li>
              {t('legal.termini&Condizioni.paragraph1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.paragraph2')}
            </li>
          </ol>
          <ol>
            <li>{t('legal.termini&Condizioni.paragraph3')}</li>
            <li>
              <strong>
                {t('legal.termini&Condizioni.paragraph41')}
              </strong>
              {t('legal.termini&Condizioni.paragraph42')}
            </li>
          </ol>

          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.accettazioneEspressa.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.accettazioneEspressa.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.accettazioneEspressa.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.accettazioneEspressa.li3')}
            </li>
            <li>
              {t('legal.termini&Condizioni.accettazioneEspressa.li4')}
            </li>
            <li>
              {t('legal.termini&Condizioni.accettazioneEspressa.li5')}
            </li>
            <li>
              {t('legal.termini&Condizioni.accettazioneEspressa.li5Final')}
            </li>
            <li>
              {t('legal.termini&Condizioni.accettazioneEspressa.li6')}
            </li>
            <br />
          </ol>
          <ol>
            <li>
              {t('legal.termini&Condizioni.accettazioneEspressa.liFinal')}
              <br />
              <br />
              {t('legal.termini&Condizioni.accettazioneEspressa.liFinal2')}
            </li>
          </ol>

          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.proprietaIntellettuale.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.proprietaIntellettuale.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.proprietaIntellettuale.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.proprietaIntellettuale.li3')}
            </li>
            <li>
              {t('legal.termini&Condizioni.proprietaIntellettuale.li4')}
            </li>
            <li>
              {t('legal.termini&Condizioni.proprietaIntellettuale.li5')}
            </li>
            <li>
              <i>
                {t('legal.termini&Condizioni.proprietaIntellettuale.li56Underline')}
              </i>
            </li>
            <li>
              {t('legal.termini&Condizioni.proprietaIntellettuale.li6')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.proprietaIntellettuale.li61')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.proprietaIntellettuale.li62')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.proprietaIntellettuale.li63')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.proprietaIntellettuale.li64')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.proprietaIntellettuale.li65')}
              </li>
            </div>
            <li>
              {t('legal.termini&Condizioni.proprietaIntellettuale.liFinal')}
            </li>
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.servizi.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.servizi.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li1Final')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li2')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li21')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li22')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li23')}
              </li>
            </div>
            <li>
              {t('legal.termini&Condizioni.servizi.li3')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li4')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li5')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li6')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li7')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li8')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li81')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li82')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li83')}
              </li>
            </div>
            <li>
              {t('legal.termini&Condizioni.servizi.li9')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li91')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li92')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li93')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li94')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li95')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li96')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li97')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.servizi.li98')}
              </li>
            </div>
            <li>
              <u>
                {t('legal.termini&Condizioni.servizi.li9FinalUnderline')}
              </u>
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li10')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li10Final')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li11')}
            </li>
            <li>
              {t('legal.termini&Condizioni.servizi.li12')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.informazioniRiservate.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.informazioniRiservate.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.informazioniRiservate.li1Final')}
            </li>
            <li>
              {t('legal.termini&Condizioni.informazioniRiservate.li2')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.disclaimer.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.disclaimer.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.disclaimer.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.disclaimer.li3')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.ordini&Pagamenti.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li1Final1')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.ordini&Pagamenti.li11')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.ordini&Pagamenti.li12')}
              </li>
            </div>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li1Final2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li1Final3')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li2Final')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li3')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li4')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.ordini&Pagamenti.li41')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.ordini&Pagamenti.li42')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.ordini&Pagamenti.li43')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.ordini&Pagamenti.li44')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.ordini&Pagamenti.li45')}
              </li>
            </div>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li5')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li5Final')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li6')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li7')}
            </li>
            <li>
              {t('legal.termini&Condizioni.ordini&Pagamenti.li8')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.limitazioneDiResponsabilita.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.limitazioneDiResponsabilita.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.limitazioneDiResponsabilita.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.limitazioneDiResponsabilita.li2Final')}
            </li>
            <li>
              {t('legal.termini&Condizioni.limitazioneDiResponsabilita.li3')}
            </li>
            <li>
              {t('legal.termini&Condizioni.limitazioneDiResponsabilita.li4')}
            </li>
            <li>
              {t('legal.termini&Condizioni.limitazioneDiResponsabilita.li5')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.informativaDeiRischi.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.informativaDeiRischi.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.informativaDeiRischi.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.informativaDeiRischi.li3')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.informativaDeiRischi.li31')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.informativaDeiRischi.li32')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.informativaDeiRischi.li33')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.informativaDeiRischi.li34')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.informativaDeiRischi.li35')}
              </li>
            </div>
            <li>
              {t('legal.termini&Condizioni.informativaDeiRischi.li4')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.contenutiUtenti.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.contenutiUtenti.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.contenutiUtenti.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.contenutiUtenti.li3')}
            </li>
            <li>
              {t('legal.termini&Condizioni.contenutiUtenti.li4')}
            </li>
            <li>
              {t('legal.termini&Condizioni.contenutiUtenti.li5')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.limitazioniGenerali.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.limitazioniGenerali.li1')}
            </li>
            <div style={{ paddingLeft: '8%' }}>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.limitazioniGenerali.li11')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.limitazioniGenerali.li12')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.limitazioniGenerali.li13')}
              </li>
              <li style={{ listStyleType: 'square', paddingLeft: '0px' }}>
                {t('legal.termini&Condizioni.limitazioniGenerali.li14')}
              </li>
            </div>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.terminiGenerali.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.terminiGenerali.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.terminiGenerali.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.terminiGenerali.li3')}
            </li>
            <li>
              {t('legal.termini&Condizioni.terminiGenerali.li4')}
            </li>
            <li>
              {t('legal.termini&Condizioni.terminiGenerali.li5')}
            </li>
            <li>
              {t('legal.termini&Condizioni.terminiGenerali.li5Final')}
            </li>
            <br />
          </ol>

          <br />
          <h3 align="center" style={{ marginBottom: '1rem' }}>
            {t('legal.termini&Condizioni.leggeApplic.title')}
          </h3>
          <ol>
            <li>
              {t('legal.termini&Condizioni.leggeApplic.li1')}
            </li>
            <li>
              {t('legal.termini&Condizioni.leggeApplic.li2')}
            </li>
            <li>
              {t('legal.termini&Condizioni.leggeApplic.li3')}
            </li>
            <br />
            <br />
          </ol>
          <ol>
            <li>
              {t('legal.termini&Condizioni.leggeApplic.liFinal')}
            </li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default Terms;
