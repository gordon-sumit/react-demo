import {Link, Navigate, redirect, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {removeToken} from "../store/reducer/auth";

export default function Header() {
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const signOut=(e)=>{
        e.preventDefault();
        dispatch(removeToken())
       navigate('/login')
    }

    return <header className="p-3 mb-3 border-bottom">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                    </svg>
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <Link to={'/'} className="nav-link px-2 link-secondary">Home</Link>
                    </li>
                    <li>
                        <Link to={'/profiles'} className="nav-link px-2 link-secondary">All Users</Link>
                    </li>
                    <li>
                        <Link to={'/my-vegetables'} className="nav-link px-2 link-secondary">My Vegetables</Link>
                    </li>
                </ul>

                <div className="dropdown text-end">
                    <a href="#" onClick={() => setDropdown(!dropdown)}
                       className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32"
                             className="rounded-circle"/>
                    </a>
                    <ul className={`${dropdown ? 'd-block' : ''} dropdown-menu text-small`}
                        aria-labelledby="dropdownUser1">
                        <li><Link to={'/register'} className="dropdown-item">Register</Link></li>
                        <li><Link to={'/login'} className="dropdown-item">Login</Link></li>
                        <li></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" onClick={signOut} href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
}