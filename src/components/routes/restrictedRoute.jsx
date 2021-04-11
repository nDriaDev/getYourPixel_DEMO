import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Const from '../../util/Costanti';
import ErrorPage from '../errorPage/errorPage';

export const RestrictedRoute = React.memo((props) => {

    return (
        props?.location?.state?.authorized  ?
            props.children
        :
        <Redirect to={Const.PATH_ERROR} />
    )

})