import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRouteOld = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('authToken'); // Assume a token is stored when logged in
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default PrivateRouteOld;
