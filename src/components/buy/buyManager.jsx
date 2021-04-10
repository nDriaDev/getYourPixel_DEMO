import React, { useState, useEffect } from 'react';
import Const from '../../util/Costanti';

export const BuyManager = React.memo(({ component: Component, ...rest }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        rest.enableSpinner();
        const script = document.createElement('script');
        script.src = Const.PAYPAL.sdk + (process.env.REACT_APP_PAYPAL_CLIENT_ID ?
            process.env.REACT_APP_PAYPAL_CLIENT_ID :
            // '<your clientID here>'
            // 'Adr9u1cFoRoxvGD60HKXhtnS3J8CmZiGdwTcgGuVVck2nS0VdRaWw45RtVe1T7TLxmesjJWMF0Q1mn5p'
            'AelN2h6SpD6n31DN4Ubhf6cCLOnRqCybnoegCMaVkjRDgiel4Quz9kDzFPWCWWFht6jm_pu_vG4wcT0v'
        ) + '&currency=EUR';

        script.onload = () => {
            setIsLoaded(true);
        }

        document.body.appendChild(script);

        return () => document.body.removeChild(script)
    },[])
    return isLoaded && <Component {...rest}/>
})

