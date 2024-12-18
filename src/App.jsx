import './App.css'
import Header from "./components/header";
import {Navigate, Outlet, redirect, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Home from "./components/home";
import RegisterUser from "./components/registerUser";
import {useDispatch, useSelector} from "react-redux";
import {saveToken} from "./store/reducer/auth";

function App() {
     const dispatch = useDispatch();
     const {userToken} = useSelector((state) => state.root.auth);

    useEffect(()=>{
        if(!userToken){
            dispatch(saveToken())
        }
    },[userToken])

    if (!userToken) {
        return <div className="login-singup-container">
            <Routes>
            <Route path='/' element={<Navigate to={'/login'}/>} /></Routes>
            <Outlet/>
        </div>
    }

    return (
        <div className='container mt-3'>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
            <Outlet/>
        </div>
    )
}

export default App
