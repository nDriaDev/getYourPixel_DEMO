import {React, useEffect} from 'react';

const Win = (props) => {

  useEffect(() => {
    props.disableSpinner();
  }, []);

  return (
    <>
    <div className="col-sm-12" style={{color:'#FFFFFF', padding:'5% 5% 20% 5%'}}>
      <h1 style={{textAlign:'center'}}>
        Vinci dai 100'000 ai 500'000 euro senza spendere un centesimo!
      </h1>
      <br/>
      <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
        Una volta esaurita la prima met&agrave; dei pixel disponibili, avrete la possibilit&agrave; di parte al nostro concorso! Seguendo alcuni semplici passi, sarete inseriti in una lista dalla quale estrarremo 5 fortunati utenti che riceveranno 100'000 € ciascuno!
        Il meccanismo &egrave; semplicissimo.
        Tutto ci&ograve; che dovrete fare, dopo aver effettuato l'accesso con le vostre credenziali, sar&agrave; visitare le pubblicit&agrave; presenti nella homepage. Ogni pubblicit&agrave; visualizzata assegner&agrave; all’utente 1 punto. Pi&ugrave; punti hai pi&ugrave; volte il tuo nome verr&agrave; inserito nell’elenco per l’estrazione.
        Ad esempio, visitando una pubblicit&agrave; il tuo nome verr&agrave; inserito una volta, visitando 20 pubblicit&agrave; il tuo nome verr&agrave; inserito 20 volte.
        Se lo stesso utente visita una pubblicit&agrave; che ha gi&agrave; visitato in precedenza non guadagna punti aggiuntivi.
      </span>
      <br/>
      <br/>
      <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
        Ecco gli step da seguire:
      </span>
      <br/>
        <ol>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              1-&nbsp;
            </span>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              Registrati.
              <a className="a-animated" href="/register"> Clicca qui</a>
              e inserisci username, email e password.
            </span>
          </li>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              2-&nbsp;
            </span>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              Clicca sulle pubblicit&agrave; e visita le pagine sponsorizzate.
              Ogni pubblicit&agrave; che visiti ti dar&agrave; 1 punto.
            </span>
          </li>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              3-&nbsp;
            </span>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              Il giorno dell’estrazione (che avverr&agrave; in presenza di un notaio o figura
                autorizzata) verranno selezionati casualmente da un sistema 5 nomi utente.
                Lo stesso nome utente potrebbe essere estratto pi&ugrave; volte.
            </span>
          </li>
          <li>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              4-&nbsp;
            </span>
            <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
              I vincitori verranno contattati tramite l’email utilizzata per la registrazione per le informazioni riguardanti la consegna del premio.
            </span>
          </li>
        </ol>
        <br/>
        <h5>
          ATTENZIONE!
        </h5>
        <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
          Anche prima che il concorso venga ufficialmente avviato, i punti saranno gi&agrave; conteggiati, quindi vi consigliamo di iniziare a visitare, ottenere pi&ugrave; punti possibile e non lasciarne indietro nessuno!
          Sempre su questa pagina potrete trovare il regolamento del concorso, a partire dal giorno del suo inizio ufficiale.
          <br/>
          Per motivi legali, il premio verr&agrave; elargito sotto forma di lingotti d'oro (sar&agrave; possibile convertirlo immediatamente al momento della consegna).
          Non preoccupatevi! Saremo comunque disponibili ad accompagnarvi nelle procedure necessarie a convertire in denaro il premio.
        </span>
        <h3 style={{marginTop:'.7rem'}}>
          In bocca al lupo!
        </h3>
    </div>
    </>
  )
}

export default Win;
