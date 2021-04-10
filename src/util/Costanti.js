const Const = {
  PATH_HOME: '/',
  PATH_BUY: '/buy',
  PATH_CONTACT: '/contact',
  PATH_HOW_WORK: '/howWork',
  PATH_WIN: '/win',
  PATH_MANAGE: '/manage',
  PATH_LOGIN: '/login',
  PATH_REGISTER: '/register',
  PATH_TERM_AND_CONDITIONS: '/termsAndConditions',
  PATH_ERROR: '/error',
  MOBILE_BROWSER_REGEX: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i,
  isMobileBrowser(agent){
    if(this.MOBILE_BROWSER_REGEX.test(agent)) {
        return true;
    }
    return false;
  },
  setDecimalCurrencyNumber(val, currency) {
    if(val === 0) {
      return 0;
    }
    val = "" + val;
    let newVal = val.substring(0,val.length-2);
    newVal = newVal + "." + val.charAt(val.length-2) + val.charAt(val.length-1);
    newVal = currency === 'eur' ? '€ ' + newVal : (currency === 'usd' ? '$ ' + newVal : currency + " " + newVal);
    return newVal
  },
  setDecimalNumber(val) {
    if (val === 0) {
      return 0;
    }
    val = "" + val;
    let newVal = val.substring(0, val.length - 2);
    newVal = newVal + "." + val.charAt(val.length - 2) + val.charAt(val.length - 1);
    return newVal
  },
  PRIVACY_POLICY_LINK : "https://www.iubenda.com/privacy-policy/80858552",
  COOKIE_POLICY_LINK : "https://www.iubenda.com/privacy-policy/80858552/cookie-policy",
  SEND_MAIL_PATH: '/api/email',
  MAIL_SUCCESS: "Il messaggio e' stato inviato correttamente",
  MAIL_FAILED: "Errore durante l'invio del messaggio",
  PAYMENT_SUCCESS: 'Ordine confermato! Riceverai una email di conferma',
  PAYMENT_FAILED: "Ordine cancellato! Continua continua a navigare il sito e fai il checkout quando sei pronto",
  PAYMENT_CREATE_SESSION: "/api/create-session",
  GET_PRODUCT: "/api/products",
  CHECK_TOKEN: '/api/checkToken',
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  MANAGE: '/manage',
  RESET_PASSWORD: '/api/resetPassword',
  VERIFY_PASSWORD: '/api/verifyPassword',
  CHANGE_PASSWORD: '/api/changePassword',
  DELETE_ADMIN: '/api/deleteAdmin',
  ADD_ADMIN: '/api/addAdmin',
  GET_ADMINS: '/api/getAdmins',
  GET_ADMIN: '/api/getAdmin',
  SAVE_CLIENT: '/api/saveClient',
  GET_CLIENTS_PIXELS: '/api/getClientsPixels',
  GET_CLIENTS_FILTERED: '/api/getClientsFiltered',
  DELETE_CLIENT: '/api/deleteClient',
  COUNT_PIXELS: '/api/countPixels',
  GET_CLIENT: '/api/getClient',
  EDIT_CLIENT: '/api/editClient',
  LOGIN_USER: '/api/loginUser',
  GET_USER: '/api/getUser',
  SAVE_USER: '/api/saveUser',
  SAVE_CLICK: '/api/saveClick',
  COUNT_USERS: '/api/countUsers',
  COUNT_POINTS: '/api/countPoints',
  ADMIN_TYPE: {
    CLIENT: 'Client',
    BASIC: 'Basic',
    ADMIN: 'Admin',
    SUPER_ADMIN: 'SuperAdmin',
  },
  PAYPAL: {
    api : {
      sandbox: 'https://api-m.sandbox.paypal.com',
      production: 'https://api-m.paypal.com'
    },
    sdk: "https://www.paypal.com/sdk/js?client-id=",
    getAPI: () => {
      return process.env.NODE_ENV === 'production' ? Const.PAYPAL.api.production : Const.PAYPAL.api.sandbox;
    }
  }
}


export default Const;
