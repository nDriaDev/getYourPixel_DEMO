import {React, useEffect} from 'react';

const Win = (props) => {

  useEffect(() => {
    props.disableSpinner();
  }, []);

  return (
    <>
    <div className="row" style={{color:'#FFFFFF',margin:'1rem 3rem 1rem 3rem', height:'100vh', display:'block'}}>
      <h1 style={{textAlign:'center'}}>
        Eccoti l’opportunit&agrave; di vincere dai 100'000 ai 500'000 euro senza spendere nemmeno un centesimo!
      </h1>
      <br/>
      <span>
        Esaurita la prima met&agrave; dei pixel disponibili inizier&agrave; un concorso dove, seguendo alcune semplici istruzioni, avrete la possibilit&agrave; di essere inseriti in una lista dalla quale verranno estratti 5 nomi che riceveranno 100'000 € ciascuno.
        Il meccanismo &egrave; semplicissimo.
        Ogni utente registrato sar&agrave; riconosciuto tramite nome utente e l’unica attivit&agrave; che dovr&agrave; fare, dopo aver effettuato l’accesso con le sue credenziali, &egrave; quella di visitare le pubblicit&agrave; presenti nella homepage. Ogni pubblicit&agrave; visualizzata assegner&agrave; all’utente 1 punto. Pi&ugrave; punti hai pi&ugrave; volte il tuo nome verr&agrave; inserito nell’elenco per l’estrazione.
        Quindi, per esempio, se visiti 1 pubblicit&agrave; il tuo nome verr&agrave; inserito una volta, se visiti 20 pubblicit&agrave; il tuo nome verr&agrave; inserito venti volte.
        Se lo stesso utente visita una pubblicit&agrave; che ha gi&agrave; visitato in precedenza non guadagna punti aggiuntivi.
      </span>
      <br/>
      <br/>
      <h5>
        ATTENZIONE: Anche se questo concorso non &egrave; ancora iniziato ufficialmente i punti verranno gi&agrave; conteggiati, quindi vi consiglio di iniziare a visitare per fare pi&ugrave; punti e non lasciarne indietro nessuno! 😉
        Sempre su questa pagina potrete trovare il regolamento di questo concorso una volta iniziato. Ad ogni modo ecco una scaletta semplificata di come funzioner&agrave;:
      </h5>
      <br/>
        <ol>
          <li>
            1- Registrati: registrati cliccando qui inserendo nome utente, email e password.
          </li>
          <li>
            2- Clicca sulle pubblicit&agrave; e visita quindi le pagine sponsorizzate.
               Ogni pubblicit&agrave; che visiti ti dar&agrave; 1 punto.
          </li>
          <li>
            3- Il giorno dell’estrazione (che avverr&agrave; in presenza di un notaio o di una figura
               autorizzata) verranno selezionati casualmente da un computer 5 nomi utenti.
               Lo stesso nome &nbsp;&nbsp;&nbsp;&nbsp;utente potrebbe essere estratto pi&ugrave; volte.
          </li>
          <li>
            4- Voi vincitori verrete contattati tramite l’email utilizzata per la registrazione, in modo da
               poterci accordare per la consegna del premio.
          </li>
        </ol>
        <br/>
        <h5>
          Per motivi legislativi il premio verr&agrave; elargito sotto forma di oro e non sottoforma di denaro (sar&agrave; possibile convertirlo immediatamente al momento della consegna)
        </h5>
        <h5>
          Non preoccupatevi. Sar&agrave; mio dovere stare al vostro fianco per accompagnarvi nelle procedure necessarie a convertire il premio in denaro.
        </h5>
        <h3 style={{marginTop:'.7rem'}}>
          In bocca al lupo e buona fortuna!
        </h3>
    </div>
    </>
  )
}

export default Win;
