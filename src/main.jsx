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
import Profiles from "./components/profiles";
import PrivateRoute from "./components/privateRoute";
import MyVeggies from "./components/myVeggies";


const accessToken = localStorage.getItem('userToken');
//wucyva@mailinator.com
const authChildren = [
    {
        path: "/login",
        element: <Login/>,
        errorElement: <Navigate to={'/login'}/>,
    },
    {
        path: "/register",
        element: <RegisterUser/>,
    },
];

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
        //errorElement: <Navigate to={'/login'}/>,
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
        //errorElement: !accessToken ? <Navigate to={'/login'}/> :<Navigate to={'/'}/>,
        children: children
    },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
