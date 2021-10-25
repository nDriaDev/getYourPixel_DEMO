import {React, useEffect} from 'react';
import $ from 'jquery';
import 'animate.css/animate.min.css';
import Img from './../../images/logo.png';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { Trans } from 'react-i18next';

const HowWork = (props) => {
  const { t } = useTranslation();
  const isEurope = moment.tz.guess(true).indexOf('Europe') !== -1 ? true : false;
  const price1 = isEurope ? '1€' : '1.16$';
  const price2 = isEurope ? '2€' : '2.32$';
  const price3 = isEurope ? "100'000" : "120'000";
  const price4 = isEurope ? "500'000€" : "600'000$";

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
          <span style={{fontSize:'1.8rem'}}>{t('howWork.subTitle')}</span>
        </div>

        <div id="descr" className="col-sm-12 animate__animated" style={{fontSize:'.9rem', textAlign: 'justify'}}>
          <h2>&nbsp;</h2>
          <h2>&nbsp;</h2>
          <span>
            {t('howWork.desc1')}
            <a className="a-animated" href="/buy"> Checkout</a>
            {t('howWork.desc2')}
          </span>
        </div>

        <div id="leftDescr" className="col-sm-6 animate__animated" style={{marginTop:'20%',marginBottom:'10%'}}>
          <h2 style={{marginBottom: '1.2rem', fontSize: '1.8rem'}}>
            {t('howWork.descLeft1')}
          </h2>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            {t('howWork.descLeft2')}
          </span>
          <br></br>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            {t('howWork.descLeft3')}
          </span>
        </div>

        <div id="rightDescr" className="col-sm-6 animate__animated" style={{marginTop:'20%',marginBottom:'10%',}}>
          <h2 style={{marginBottom: '1.2rem', fontSize: '1.8rem'}}>
            {t('howWork.descRight1')}
          </h2>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            {t('howWork.descRight2')}
            <a className="a-animated" href="/buy"> {t('howWork.buy')}</a>
            {t('howWork.descRight3')}
          </span>
          <br></br>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            {t('howWork.descRight4')}
            <a className="a-animated" href="/buy"> {t('howWork.buy')}</a>
            {t('howWork.descRight5')}
          </span>
        </div>

        <div id="centerDescr" className="col-sm-12 animate__animated" style={{marginTop:'20%',marginBottom:'5%'}}>
          <h2 style={{marginBottom: '1.2rem', textAlign:'center', fontSize: '1.8rem'}}>
            {t('howWork.descCenter1')}
          </h2>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            {t('howWork.descCenter2')}
          </span>
        </div>

        <div id="footerDescr" className="col-sm-12 animate__animated" style={{marginTop:'10%',marginBottom:'5%'}}>
          <h2 style={{marginBottom: '1.2rem', fontSize: '1.8rem'}}>
            {t('howWork.descFooter1')}
          </h2>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            {t('howWork.descFooter2', {price1: price1, price2: price2, price3: price3, price4: price4})}
          </span>
          <br></br>
          <br></br>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            {t('howWork.descFooter3')}
            <a className="a-animated" href="/win">
              {isEurope ?
                <Trans i18nKey="howWork.winEurope" />
                :
                <Trans i18nKey="howWork.winForeign" />
              }
              {isEurope ? '€' : '$'}
            </a>
          </span>
          <br></br>
          <br></br>
          <span style={{fontSize:'.95rem', textAlign: 'justify'}}>
            {t('howWork.descFooter4')}
          </span>
        </div>
      </div>
    </>
  )
}

export default HowWork;
