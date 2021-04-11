import {React, useEffect} from 'react';
import $ from 'jquery';
import 'animate.css/animate.min.css';
import Img from './../../images/logo.png';

const HowWork = (props) => {
  const ids=['#logo','#descr','#leftDescr','#rightDescr','#centerDescr','#footerDescr'];

  const isElementInView = (element, fullyInView) => {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
  }

  const confAnimation = (elem, mode) => {
    switch (elem) {
      case '#logo':
        if(mode) {
          if($(elem).hasClass("animate__backOutLeft")) {
            $(elem).toggleClass("animate__backOutLeft")
          }
          if(!$(elem).hasClass("animate__backInLeft")) {
            $(elem).toggleClass("animate__backInLeft");
          }
        } else {
          if($(elem).hasClass("animate__backInLeft")) {
            $(elem).toggleClass("animate__backInLeft")
          }
          if(!$(elem).hasClass("animate__backOutLeft")) {
            $(elem).toggleClass("animate__backOutLeft");
          }
        }
        break;
      case '#descr':
        if(mode) {
          if($(elem).hasClass("animate__backOutRight")) {
            $(elem).toggleClass("animate__backOutRight")
          }
          if(!$(elem).hasClass("animate__backInRight")) {
            $(elem).toggleClass("animate__backInRight");
          }
        } else {
          if($(elem).hasClass("animate__backInRight")) {
            $(elem).toggleClass("animate__backInRight")
          }
          if(!$(elem).hasClass("animate__backOutRight")) {
            $(elem).toggleClass("animate__backOutRight");
          }
        }
        break;
        case '#leftDescr':
          if(mode) {
            if($(elem).hasClass("animate__backOutLeft")) {
              $(elem).toggleClass("animate__backOutLeft")
            }
            if(!$(elem).hasClass("animate__backInLeft")) {
              $(elem).toggleClass("animate__backInLeft");
            }
          } else {
            if($(elem).hasClass("animate__backInLeft")) {
              $(elem).toggleClass("animate__backInLeft")
            }
            if(!$(elem).hasClass("animate__backOutLeft")) {
              $(elem).toggleClass("animate__backOutLeft");
            }
          }
          break;
        case '#rightDescr':
          if(mode) {
            if($(elem).hasClass("animate__backOutRight")) {
              $(elem).toggleClass("animate__backOutRight")
            }
            if(!$(elem).hasClass("animate__backInRight")) {
              $(elem).toggleClass("animate__backInRight");
            }
          } else {
            if($(elem).hasClass("animate__backInRight")) {
              $(elem).toggleClass("animate__backInRight")
            }
            if(!$(elem).hasClass("animate__backOutRight")) {
              $(elem).toggleClass("animate__backOutRight");
            }
          }
          break;
        case '#centerDescr':
          if(mode) {
            if($(elem).hasClass("animate__backOutLeft")) {
              $(elem).toggleClass("animate__backOutLeft")
            }
            if(!$(elem).hasClass("animate__backInLeft")) {
              $(elem).toggleClass("animate__backInLeft");
            }
          } else {
            if($(elem).hasClass("animate__backInLeft")) {
              $(elem).toggleClass("animate__backInLeft")
            }
            if(!$(elem).hasClass("animate__backOutLeft")) {
              $(elem).toggleClass("animate__backOutLeft");
            }
          }
          break;
          case '#footerDescr':
            if(mode) {
              if($(elem).hasClass("animate__backOutRight")) {
                $(elem).toggleClass("animate__backOutRight")
              }
              if(!$(elem).hasClass("animate__backInRight")) {
                $(elem).toggleClass("animate__backInRight");
              }
            } else {
              if($(elem).hasClass("animate__backInRight")) {
                $(elem).toggleClass("animate__backInRight")
              }
              if(!$(elem).hasClass("animate__backOutRight")) {
                $(elem).toggleClass("animate__backOutRight");
              }
            }
            break;
        default:
    }
  }

  const onScroll = (param=true) => {
    for(let i in ids) {
      if(isElementInView(ids[i], true)) {
        confAnimation(ids[i], true);
      } else {
        if(param){
          confAnimation(ids[i], false);
        }
      }
    }
  }

  useEffect(() => {
    props.enableSpinner();
    onScroll(false);
    document.getElementById('container').addEventListener('scroll', onScroll);
    setTimeout(() => {
      props.disableSpinner();
    },100)
    return () => {
      let elem = document.getElementById('container');
      if(elem) {
        elem.removeEventListener('scroll', onScroll)
      }
    }
  }, []);

  return (
    <>
      <div id="container" className="row bodyWork" style={{paddingTop:'10%', paddingBottom:'25%'}}>
        <div id="logo" className="col-sm-12 animate__animated" style={{marginTop:'5%',marginBottom:'5%', textAlign: 'center'}}>
          <img style={{width:'75%'}} alt="logo" src={Img}/>
          <br/>
          <br/>
          <br/>
          <span style={{fontSize:'1.8rem'}}>Raggiungi l'irraggiungibile</span>
        </div>

        <div id="descr" className="col-sm-12 animate__animated" style={{fontSize:'.9rem', textAlign: 'justify'}}>
          <h2>&nbsp;</h2>
          <h2>&nbsp;</h2>
          <span>
            Get your pixels &egrave; una piazza digitale dove mostrare a tutti il proprio prodotto, la propria azienda, il proprio sito o qualunque cosa si voglia. Il sito infatti offre spazi acquistabili da utilizzare come pubblicit&agrave;. Una volta selezionato il numero di pixel che desideri acquistare, sar&agrave; sufficiente dirigerti alla pagina di
            <a className="a-animated" href="/buy"> Checkout</a>
            , inserire i dati necessari e in un paio di minuti sarai proprietario di uno degli spazi pi&ugrave; unici ed esclusivi del web!
          </span>
        </div>

        <div id="leftDescr" className="col-sm-6 animate__animated" style={{marginTop:'20%',marginBottom:'10%'}}>
          <h2 style={{marginBottom: '1.2rem', fontSize: '1.8rem'}}>
            Paga una volta e mai pi&ugrave;!
          </h2>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            Questo &egrave; l’unico sistema che ti permette di pagare la pubblicit&agrave;
          </span>
          <br></br>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            una volta soltanto e continuare ad utilizzarla per sempre!
          </span>
        </div>

        <div id="rightDescr" className="col-sm-6 animate__animated" style={{marginTop:'20%',marginBottom:'10%',}}>
          <h2 style={{marginBottom: '1.2rem', fontSize: '1.8rem'}}>
            Due metodi di pagamento
          </h2>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            Puoi acquistare attraverso il nostro sistema sicuro di pagamenti, tramite la sezione
            <a className="a-animated" href="/buy"> ACQUISTA</a>
            , che si appoggia a Stripe (una delle pi&ugrave; grandi aziende al mondo che permette a privati e imprese di inviare e ricevere pagamenti via Internet), utilizzando una qualiasi carta di credito o utilizzando Google Pay.
          </span>
          <br></br>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            In alternativa per quanto riguarda ordini di portata maggiore, sempre tramite la sezione
            <a className="a-animated" href="/buy"> ACQUISTA</a>
            &nbsp;sar&agrave; possibile pagare effettuando un bonifico SEPA.
          </span>
        </div>

        <div id="centerDescr" className="col-sm-12 animate__animated" style={{marginTop:'20%',marginBottom:'5%'}}>
          <h2 style={{marginBottom: '1.2rem', textAlign:'center', fontSize: '1.8rem'}}>
            Come funziona
          </h2>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            Una volta ricevuto il tuo pagamento, ti invieremo una email nella quale richiederemo tutti i dati necessari per concludere l’operazione. Baster&agrave; allegare nell'email di risposta un’immagine, che andr&agrave; a sostituire lo spazio bianco dei pixel, e un link, che verr&agrave; collegato al tuo spazio. Inoltre, potrai segnalarci le coordinate dei quadratini che preferisci acquistare. In alternativa ti verranno assegnati casualmente.
            Per ogni dubbio potrai contattarci via email. Rimarremo a tua completa disposizione!
            In futuro, nel caso ti interessasse, avrai sempre la possibilit&agrave; di inviarci una nuova immagine per sostituire quella presente e/o un nuovo link da collegare.
          </span>
        </div>

        <div id="footerDescr" className="col-sm-12 animate__animated" style={{marginTop:'10%',marginBottom:'5%'}}>
          <h2 style={{marginBottom: '1.2rem', fontSize: '1.8rem'}}>
            Attenzione!
          </h2>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            Sul sito sono acquistabili 1 milione di pixel al prezzo di 1€ ciascuno, ma questo prezzo non sar&agrave; per sempre. Esaurita la prima met&agrave; di pixel disponibili il prezzo raddoppier&agrave;, arrivando quindi a 2€ per pixel, e aumenter&agrave; nuovamente per gli ultimi 250'000 pixel disponibili. L'aumento di prezzo aiuter&agrave; a finanziare il concorso che porter&agrave; qualcuno di voi (magari proprio te che stai leggendo) a vincere dai 100'000 ai 500'000€!
          </span>
          <br></br>
          <br></br>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            Per sapere come vincere questa cifra visita la pagina
            <a className="a-animated" href="/win"> VINCI 500'000€!</a>
          </span>
          <br></br>
          <br></br>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            Per qualsiasi dubbio o problema non esitare a contattarci tramite la sezione dedicata!
            <br></br>
            Grazie mille!
          </span>
        </div>
      </div>
    </>
  )
}

export default HowWork;
