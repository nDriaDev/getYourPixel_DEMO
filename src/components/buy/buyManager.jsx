import React, { useState, useEffect } from 'react';
import Const from '../../util/Costanti';

export const BuyManager = React.memo(({ component: Component, ...rest }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        rest.enableSpinner();
        const script = document.createElement('script');
        script.src = Const.PAYPAL.sdk + (process.env.REACT_APP_PAYPAL_CLIENT_ID ?
            process.env.REACT_APP_PAYPAL_CLIENT_ID :
            '<your clientID here>'
        ) + '&currency=EUR';

        script.onload = () => {
            setIsLoaded(true);
        }

        document.body.appendChild(script);

        return () => document.body.removeChild(script)
    },[])
    return isLoaded && <Component {...rest}/>
})

