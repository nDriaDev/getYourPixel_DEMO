let Const = {
  PATH_HOME: '/',
  PATH_BUY: '/buy',
  PATH_CONTACT: '/contact',
  PATH_HOW_WORK: '/howWork',
  PATH_ERROR: '/error',
  MOBILE_BROWSER: [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ],
  isMobileBrowser(agent){
    for(let i in this.MOBILE_BROWSER){
      if(agent.match(this.MOBILE_BROWSER[i])){
        return true;
      }
    }
    return false;
  },
  setDecimalCurrencyNumber(val, currency){
    val = "" + val;
    let newVal = val.substring(0,val.length-2);
    newVal = newVal + "." + val.charAt(val.length-2) + val.charAt(val.length-1);
    newVal = currency === 'eur' ? '€ ' + newVal : (currency === 'usd' ? '$ ' + newVal : currency + " " + newVal);
    return newVal
  },
  PRIVACY_POLICY_LINK : "https://www.iubenda.com/privacy-policy/80858552",
  COOKIE_POLICY_LINK : "https://www.iubenda.com/privacy-policy/80858552/cookie-policy",
  SEND_MAIL_PATH: '/api/email',
  MAIL_SUCCESS: 'Your message was sent successfully',
  MAIL_FAILED: 'Error while sending your message',
  PAYMENT_SUCCESS: 'Order placed! You will receive an email confirmation.',
  PAYMENT_FAILED: "Order canceled -- continue to shop around and checkout when you're ready.",
  PRODUCT_DESCRIPTION: "Eccoti l'opportunità per ottenere il TUO spazio sul web!\nAcquista subito i tuoi pixel inserendo i dati dove aver premuto il pulsante qui sotto.\nRiceverai un'email per la conferma dell'ordine alla quale dovrai rispondere inserendo i dati necessari per concludere l'operazione:\nimmagine, link della tua pagina ecc.\n(non ti preoccupare ora, è tutto spiegato nella email che riceverai).",
  PAYMENT_CREATE_SESSION: "/api/create-session",
  GET_PRODUCT: "/api/products",
  CHECK_TOKEN: '/api/checkToken',
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  MANAGE: '/manage',
  RESET_PASSWORD: '/api/resetPassword',
  VERIFY_PASSWORD: '/api/verifyPassword',
  CHANGE_PASSWORD: '/api/changePassword',
  DELETE_USER: '/api/deleteUser',
  ADD_USER: '/api/addUser',
  GET_USERS: '/api/getUsers',
  GET_USER: '/api/getUser',
  SAVE_PIXEL: '/api/savePixel',
  GET_PIXELS: '/api/getPixels',
  GET_PIXELS_FILTERED: '/api/getPixelsFiltered',
  REMOVE_PIXEL: '/api/removePixel',
  COUNT_PIXELS: '/api/countPixels',
  GET_FULL_PIXEL: '/api/getFullPixel',
  EDIT_PIXEL: '/api/editPixel',
  USER_TYPE: {
    BASIC: 'Basic',
    ADMIN: 'Admin',
    SUPER_ADMIN: 'SuperAdmin',
  },
}


export default Const;
