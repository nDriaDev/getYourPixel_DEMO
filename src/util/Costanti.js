let Const = {
  PATH_HOME: '/',
  PATH_BUY: '/buy',
  PATH_CONTACT: '/contact',
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
  PRIVACY_POLICY_LINK : "https://www.iubenda.com/privacy-policy/80858552",
  COOKIE_POLICY_LINK : "https://www.iubenda.com/privacy-policy/80858552/cookie-policy"
}


export default Const;
