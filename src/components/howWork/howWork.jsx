import {React, useEffect} from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import Logo from './../logo/logo';

const HowWork = (props) => {

  useEffect(() => {
    AOS.init({delay: 200});
    AOS.refresh();
    props.disableSpinner();
  }, []);

  return (
    <>
      <div className="bodyWork">
        <div data-aos="fade-up" style={{height:'28vh'}}>
          <Logo/>
        </div>
        <div data-aos="fade-up" className="" style={{height:'25vh'}} data-aos-delay="600">
          Get your pixels è una piazza dove mostrare a tutti il proprio prodotto, la propria azienda, il proprio sito o qualunque cosa si voglia. E’ infatti il sito che offre spazi acquistabili per essere utilizzati come pubblicità. Una volta selezionato il numero di pixel che si desidera acquistare sarà sufficiente dirigersi alla pagina di check out per inserire i dati necessari e in un paio di minuti si diventa proprietari di uno degli spazi più unici ed esclusivi del web!
        </div>
        <div className="left" data-aos="fade-right" data-aos-delay="800" style={{marginBottom:'4rem'}}>
          <h2 style={{marginBottom: '1.2rem'}}>
            {'PAGA UNA VOLTA E MAI PIU\'!'}
          </h2>
          <span>
            Questo è l’unico sistema che ti permette di pagare la pubblicità
          </span>
          <br></br>
          <span>
            una volta soltanto e continuare ad utilizzarla per sempre!
          </span>
        </div>
        <div className="right" data-aos="fade-left" data-aos-delay="800" style={{marginBottom:'4rem'}}>
          <h2 style={{marginBottom: '1.2rem'}}>
            DUE METODI DI PAGAMENTO
          </h2>
          <span>
            Il primo è attraverso il nostro sistema sicuro di pagamenti, tramite la sezione
            <a href="/buy"> BUY</a>
            ,che si appoggia a Stripe (una delle più grandi aziende al mondo che permette a privati e aziende di inviare e ricevere pagamenti via internet).
          </span>
          <br></br>
          <span>
            In alternativa per quanto riguarda ordini di portata maggiore contattaci pure nella sezione
            <a href="/contact"> CONTACT</a>
            . In questo modo potremmo fornirti tutti i dati necessari per effettuare un bonifico bancario.
          </span>
        </div>
        <div className="center" data-aos="fade-up" style={{marginTop:'5rem',marginBottom:'2rem'}}>
          <h1 style={{textAlign:'center',marginBottom: '1.8rem'}}>
            COME FUNZIONA
          </h1>
          <span style={{marginBottom:'4rem'}}>
            Una volta ricevuto il tuo pagamento ti invieremo una email nella quale ti richiederemo tutti i dati necessari per concludere l’operazione. Dovrai quindi allegare nella mail di risposta un’immagine, che andrà a sostituire lo spazio bianco, e un link, che verrà collegato al tuo spazio. In oltre ti chiederemo di segnalarci eventualmente anche le coordinate dei quadratini scelti, in alternativa verranno assegnati casualmente.
            Tutto questo sarà meglio specificato nella mail che riceverai.
            In futuro, nel caso ti interessasse, avrai sempre la possibilità di inviarci una nuova immagine per sostituire quella presente e anche un nuovo link da collegare.
            In più a fine semestre vi verrà inviato un resoconto in modo che possiate analizzare voi stessi qual è l’andamento della vostra campagna pubblicitaria.
          </span>
          <h1 style={{textAlign:'left',paddingBottom: '1.8rem',paddingTop: '4rem'}}>
            ATTENZIONE!
          </h1>
          <span>
            Sul sito sono acquistabili 1 milione di pixel al prezzo di 1 euro ciascuno, ma questo prezzo non sarà per sempre. Esaurita la prima metà di pixel disponibili il prezzo raddoppierà arrivando quindi a 2 euro per pixel. Questo succederà per ottenere il denaro necessario a finanziare l’estrazione che porterà qualcuno di voi (magari proprio tu che stai leggendo) a vincere dai 100'000 ai 500'000 euro!
          </span>
          <br></br>
          <br></br>
          <span>
            Per una spiegazione più approfondita su come ottenere questa cifra visita la pagina
            <a href="/win"> WIN 500'000 euro!</a>
          </span>
          <br></br>
          <br></br>
          <span>
            Per qualsiasi dubbio o problema non esitare a contattarci tramite la sezione dedicata!
          </span>
        </div>
        <div className="" data-aos="fade-bottom">
        </div>
      </div>
    </>
  )
}

export default HowWork;
