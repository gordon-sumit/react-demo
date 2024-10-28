import React from 'react'
import ReactDOM from 'react-dom/client'
import 'regenerator-runtime/runtime';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
import "react-datepicker/dist/react-datepicker.css";
import './index.css'
import {store} from "./store/store";
import {Provider} from "react-redux";
import {createBrowserRouter, Navigate, redirect, RouterProvider} from "react-router-dom";
import Login from "./components/Auth/login";
import RegisterUser from "./components/registerUser";
import PrivateRoute from "./components/privateRoute";
import MyVeggies from "./components/myVeggies";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Profiles from "./components/profile/profiles";


const accessToken = localStorage.getItem('userToken');
const children = [
    {
        path: "/profiles",
        element: <PrivateRoute component={Profiles} />,
    },
    {
        path: "/my-vegetables",
        element: <PrivateRoute component={MyVeggies} />,
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <Navigate to={'/login'}/>,
    },
    {
        path: "/register",
        element: <RegisterUser/>,
    },
]
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: !accessToken ? <Navigate to={'/login'}/> :<Navigate to={'/'}/>,
        children: children
    },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <RouterProvider router={router}/>
            </GoogleOAuthProvider>
        </Provider>
    </React.StrictMode>,
)
