import {React, useEffect} from 'react';

const Win = (props) => {

  useEffect(() => {
    props.disableSpinner();
  }, []);

  return (
    <>
    <div className="row" style={{color:'#FFFFFF',margin:'1rem 3rem 1rem 3rem', height:'100vh'}}>
      <h1 style={{textAlign:'center'}}>
        Eccoti l’opportunità di vincere dai 100'000 ai 500'000 euro senza spendere nemmeno un centesimo!
      </h1>
      <br/>
      <span>
        Esaurita la prima metà dei pixel disponibili inizierà un concorso dove, seguendo alcune semplici istruzioni, avrete la possibilità di essere inseriti in una lista dalla quale verranno estratti 5 nomi che riceveranno 100'000 € ciascuno.
        Il meccanismo è semplicissimo.
        Ogni utente registrato sarà riconosciuto tramite nome utente e l’unica attività che dovrà fare, dopo aver effettuato l’accesso con le sue credenziali, è quella di visitare le pubblicità presenti nella homepage. Ogni pubblicità visualizzata assegnerà all’utente 1 punto. Più punti hai più volte il tuo nome verrà inserito nell’elenco per l’estrazione.
        Quindi, per esempio, se visiti 1 pubblicità il tuo nome verrà inserito una volta, se visiti 20 pubblicità il tuo nome verrà inserito venti volte.
        Se lo stesso utente visita una pubblicità che ha già visitato in precedenza non guadagna punti aggiuntivi.
      </span>
      <br/>
      <br/>
      <h5>
        ATTENZIONE: Anche se questo concorso non è ancora iniziato ufficialmente i punti verranno già conteggiati, quindi vi consiglio di iniziare a visitare per fare più punti e non lasciarne indietro nessuno! 😉
        Sempre su questa pagina potrete trovare il regolamento di questo concorso una volta iniziato. Ad ogni modo ecco una scaletta semplificata di come funzionerà:
      </h5>
      <br/>
        <ol>
          <li>
            1- Registrati: registrati cliccando qui inserendo nome utente, email e password.
          </li>
          <li>
            2- Clicca sulle pubblicità e visita quindi le pagine sponsorizzate.
               Ogni pubblicità che visiti ti darà 1 punto.
          </li>
          <li>
            3- Il giorno dell’estrazione (che avverrà in presenza di un notaio o di una figura
               autorizzata) verranno selezionati casualmente da un computer 5 nomi utenti.
               Lo stesso nome    utente potrebbe essere estratto più volte.
          </li>
          <li>
            4- Voi vincitori verrete contattati tramite l’email utilizzata per la registrazione, in modo da
               poterci accordare per la consegna del premio.
          </li>
        </ol>
        <br/>
        <h5>
          Per motivi legislativi il premio verrà elargito sotto forma di oro e non sottoforma di denaro (sarà possibile convertirlo immediatamente al momento della consegna)
          Spero nessuno ne risenta, ma in ogni caso non preoccupatevi. Sarà mio dovere stare al vostro fianco per accompagnarvi nelle procedure necessarie a convertire il premio in denaro.
        </h5>
        <h3 style={{marginTop:'.7rem'}}>
          In bocca al lupo e buona fortuna!
        </h3>
    </div>
    </>
  )
}

export default Win;
