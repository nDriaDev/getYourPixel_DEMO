import ReactGA from 'react-ga';

class TrackingGA {

  initGA() {
    let id = process.env.GA_TRACKING_ID ?
      process.env.GA_TRACKING_ID
      :
      // '<your tracking_id here>'
      'UA-190924036-1'

    ReactGA.initialize(id, {
      // debug:true
    });
  }

  pageView(path) {
    ReactGA.pageview(path);
  }

  /**
   * event: evento di monotiraggio personalizzato
   * @type {TrackingGA}
   * @param {string} category
   * @param {string} action
   * @param {string} label
   * @param {boolean} notInteraction {default=false}
   */
  event(category, action, label, notInteraction=false) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
      notInteraction: notInteraction
    })
  }

  /**
   * exception: monitoraggio personalizzato delle eccezioni
   * @type {TrackingGA}
   * @param {string} description
   * @param {boolean} fatal {default=false}
   */
  execption(description, fatal=false) {
    ReactGA.exception({
      description: description,
      fatal: fatal
    })
  }

}

export default new TrackingGA();
