/**
 * Custom Hook Component to import script in html  
 */

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const useScript = (url) => {
    const [Button, setButton] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.onload = () => {
            setButton(document.window?.paypal.Buttons.driver("react", { React, ReactDOM }));
        }
        document.body.appendChild(script);


        return () => document.body.removeChild(script);
    }, [url]);

    return Button;
}

export default useScript;
