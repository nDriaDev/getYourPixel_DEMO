import React, {useState, useEffect} from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import Const from './../../../util/Costanti';
import axios from 'axios';

const Terms = ({spinnerCommand}) => {
  const [html, setHtml] = useState(null);
  let {path} = useRouteMatch();

  useEffect(() => {
    spinnerCommand(true);
    setHtml(true);
  }, [])

  useEffect(() => {
    spinnerCommand(false);
  }, [])

  return (
    html &&
    <div className="mb-5" style={{backgroundColor: '#FFFFFF'}}>
      <div className="terms-page" style={{paddingLeft:'10%', paddingRight:'10%', width:'100%'}}>
        <h2>1. Prodotti o servizi forniti</h2>
        <ol>
          <li>
            1. Gli utenti sono liberi di acquistare tutti i quadrati che desiderano, senza restrizioni.
          </li>
          <li>
            2. Devi avere il diritto legale di utilizzare tutte le immagini e i link forniti per la tua pubblicit&agrave; e la pagina del profilo sul nostro sito.
          </li>
          <li>
            3. Le immagini devono essere in formato PNG o JPEG. Non possiamo elaborare immagini animate.
          </li>
          <li>
            4. Non saranno accettate immagini / link / descrizioni oscene / offensive / per adulti / illegali. Decideremo cosa &egrave; appropriato per il nostro sito. Se la tua richiesta viene rifiutata, avrai la possibilit&agrave; di fornire un'immagine o un link alternativo.
          </li>
          <li>
            5. Qualsiasi materiale illegale inviato sar&agrave; trasmesso alle autorit&agrave; competenti insieme alle tue informazioni.
          </li>
          <li>
            6. Puoi richiedere la rimozione della tua immagine in qualsiasi momento. Lavoreremo per rimuovere la tua immagine il pi&ugrave; rapidamente possibile ma non sarai rimborsato e il tuo spazio sar&agrave; nuovamente disponibile per l'acquisto pubblico. (Vedi rimborsi e reclami)
          </li>
          <li>
            7. Stai acquistando uno spazio pubblicitario sotto forma di quadrati sulla home page. Ogni quadrato &egrave; composto da 100 pixel formati in un blocco 10x10.
          </li>
          <li>
            8. Se desideri discutere un acquisto pi&ugrave; grande, non esitare a contattarci all'indirizzo info@getyourpixels.com
          </li>
          <li>
            9. Anche se abbiamo intenzione di mantenere viva questa pagina per sempre. Ci riserviamo il diritto di disattivare questa pagina dopo due anni.
          </li>
        </ol>

        <br/>
        <h2>
          2. Prezzi e pagamento
        </h2>
        <ol>
          <li>
            1. Il prezzo minimo di acquisto &egrave; di € 25
          </li>
          <li>
            2. I prezzi sono comprensivi di IVA
          </li>
          <li>
            3. Sei autorizzato a modificare il tuo ordine tutte le volte che desideri scrivendo a info@getyourpixels.com dopo averlo confermato.
          </li>
          <li>
            4. Dopo aver ricevuto il pagamento con successo, il tuo posto verr&agrave; riservato mentre esaminiamo e verifichiamo il tuo collegamento, la descrizione e le immagini. Ti invieremo un'email se qualcosa che hai inviato viene rifiutato.
          </li>
          <li>
            5. Una volta che tutto &egrave; stato verificato dal nostro team, il tuo spazio pubblicitario e la pagina del profilo verranno pubblicati.
          </li>
        </ol>

        <br/>
        <h2>
          3. Tutela della privacy
        </h2>
        <ol>
          <li>
            1. I dati di registrazione e altre informazioni di identificazione personale che potremmo raccogliere sono soggetti ai termini della nostra Informativa sulla privacy.
          </li>
          <li>
            2. Trovi la nostra politica sulla privacy nell’apposita sezione.
          </li>
        </ol>

        <br/>
        <h2>
          4. Rimborsi e reclami
        </h2>
        <h5 style={{
            paddingLeft: '3%'
          }}>
          4a. Politica sui rimborsi
        </h5>
        <ol>
          <li style={{
              paddingLeft: '6%'
            }}>
            1. Non offriamo rimborsi a persone o societ&agrave; che violano i nostri termini di servizio delineati nella sezione 1.
          </li>
          <li style={{
              paddingLeft: '6%'
            }}>
            2. Se qualsiasi immagine o collegamento deve essere rimosso a causa di obblighi legali, non sarai rimborsato e lo spazio diventer&agrave; di nuovo disponibile pubblicamente.
          </li>
          <li style={{
              paddingLeft: '6%'
            }}>
            3. Sebbene non desideriamo mai rimuovere o modificare intenzionalmente qualsiasi annuncio pubblicitario sul nostro sito in circostanze normali, ci riserviamo il diritto di farlo a nostra discrezione in circostanze eccezionali. Ad esempio, a causa della protesta pubblica. Quando si verifica una rimozione, non sarai rimborsato e il tuo spazio diventer&agrave; pubblicamente disponibile per l'acquisto.
          </li>
          <li style={{
              paddingLeft: '6%'
            }}>
            4. Mentre la tua immagine e i tuoi link sono in attesa di revisione per essere inseriti nella pagina, puoi richiedere un rimborso. Elaboreremo il rimborso entro 14 giorni. Tuttavia, una volta che la tua immagine e i tuoi link sono stati accettati con successo e inseriti nella pagina, in seguito alla visualizzazione di un solo utente potresti non poter pi&ugrave; ottenere un rimborso.
          </li>
        </ol>
        <h5 style={{
            paddingLeft: '3%'
          }}>
          4b. Procedura di reclamo
        </h5>
        <ol>
          <li style={{
              paddingLeft: '6%'
            }}>
            1. Ci auguriamo che il servizio che forniamo soddisfi tutte le vostre esigenze. Tuttavia, se desideri presentare un reclamo, inviaci un'e-mail a info@getyourpixels.com e ti risponderemo il prima possibile.
          </li>
          <li style={{
              paddingLeft: '6%'
            }}>
            2. Eventuali tempi di inattivit&agrave; del nostro sito per processi come la manutenzione o gli aggiornamenti del server saranno ridotti al minimo. Riceverai una notifica di qualsiasi periodo di inattivit&agrave; prolungato del sito.
          </li>
        </ol>

        <br/>
        <h2>
          5. Diritti di propriet&agrave; intellettuale
        </h2>
        <ol>
          <li>
            1. Ci riserviamo tutti i nostri diritti, inclusi ma non limitati a tutti i diritti d'autore, marchi commerciali, brevetti, segreti commerciali e qualsiasi altro diritto di propriet&agrave; che potremmo avere sul nostro sito web, sul suo contenuto e sui prodotti e servizi che possono essere forniti. L'utilizzo dei nostri diritti e propriet&agrave; richiede il nostro previo consenso scritto. Non ti forniamo alcuna licenza o diritto implicito o esplicito mettendo a tua disposizione servizi e non avrai alcun diritto di fare alcun uso commerciale del nostro sito web o servizio senza il nostro previo consenso scritto.
          </li>
        </ol>

        <br/>
        <h2>
          6. Cambiamenti futuri
        </h2>
        <ol>
          <li>
            1. Ci riserviamo il diritto di modificare i nostri termini e condizioni e in qualsiasi momento senza preavviso.
          </li>
          <li>
            2. In caso di modifiche, se richiesto, ti verr&agrave; inviata una copia aggiornata dei nostri Termini e Condizioni.
          </li>
        </ol>

        <br/>
        <h2>
          7. Limitazione di responsabilit&agrave;
        </h2>
        <ol>
          <li>
            1. Comprendi e accetti espressamente che non saremo responsabili per danni diretti, indiretti, speciali, incidentali, consequenziali o esemplari, inclusi ma non limitati a, danni per perdita di profitti, avviamento, uso, dati o altra perdita intangibile (anche se siamo stati informati della possibilit&agrave; di tali danni), derivanti da o derivanti da (I) l'uso o l'incapacit&agrave; di utilizzare il servizio, (II) il costo per ottenere beni e / o servizi sostitutivi risultanti da qualsiasi transazione stipulata tramite il servizio, (III) accesso non autorizzato o alterazione delle trasmissioni di dati, (IV) dichiarazioni o condotta di terze parti sul servizio o (V) qualsiasi altra questione relativa al servizio.
          </li>
          <li>
            2. In alcune giurisdizioni, non &egrave; consentito limitare la responsabilit&agrave; e pertanto tali limitazioni potrebbero non essere applicabili.
          </li>
        </ol>

        <br/>
        <h2>
          8. Legge applicabile
        </h2>
        <ol>
          <li>
            1. Accetti che i presenti Termini di servizio e qualsiasi controversia derivante dal tuo utilizzo di questo sito web o dei nostri prodotti o servizi saranno regolati e interpretati in conformit&agrave; con le leggi locali in cui si trova la sede del proprietario di questo sito web, senza riguardo ai suoi conflitti di disposizioni di legge. Registrandoti o utilizzando questo sito web e servizio, acconsenti e ti sottometti alla giurisdizione e alla sede esclusiva della contea o della citt&agrave; in cui si trova la sede del proprietario di questo sito web.
          </li>
        </ol>

        <br/>
        <h2>
          9. Disclaimer
        </h2>
        <ol>
          <li>
            1. Tieni presente che quando acquisti uno spazio pubblicitario sul nostro sito, non possiedi alcuna parte di questa homepage o di questo sito, ma ti viene concesso il diritto di inviare un'immagine, collegamenti al tuo sito e social media e fornire una descrizione che lo far&agrave; poi essere pubblicato nella pagina principale nel rispettivo spazio che hai pagato.
          </li>
          <li>
            2. Ci riserviamo il diritto di regalare quadrati a scopo promozionale a chiunque scegliamo in qualsiasi momento.
          </li>
          <li>
            3. Ci riserviamo il diritto di scambiare spazio sulla nostra pagina per prodotti o servizi che riteniamo di valore simile da individui o aziende che riteniamo possano essere di beneficio per la home page e i suoi utenti o che siano altrimenti vantaggiosi dal punto di vista commerciale.
          </li>
        </ol>

        <br/>
        <br/>
        <span>
          Se hai ulteriori domande o richieste di informazioni, contattaci a
          <a href="/contact"> info@getyourpixels.com</a>
        </span>
        <br/>
        <br/>
        <span style={{fontSize:'0.7rem'}}>
          Ultimo aggiornamento 12/01/2021 Getyourpixels &egrave; un nome commerciale regolarmente registrato e protetto da copyright.
        </span>
      </div>
    </div>
  )
}

export default Terms;
