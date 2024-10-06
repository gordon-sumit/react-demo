import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function PrivateRoute({component: Component, ...rest}) {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('userToken');
    //  useEffect(() => {
    //     if (!accessToken) {
    //         navigate('/login')
    //     }
    // }, [accessToken]);

    return <Component {...rest} />
}