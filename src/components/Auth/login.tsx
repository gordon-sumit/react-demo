import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fethData, login} from "../../store/actions/login";
import {useForm} from "react-hook-form";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faRightToBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {useGoogleLogin} from "@react-oauth/google";
import {saveToken} from "../../store/reducer/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error} = useSelector((state) => state.root.errorReducer);
    const {userToken} = useSelector((state) => state.root.auth);
    const {
        register,
        watch,
        reset,
        formState: {errors}
        , handleSubmit
    } = useForm({
        reValidateMode: "onSubmit"
    });

    const onSubmit = (data) => {
        dispatch(login(data))
    }

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log('tokenResponseo', tokenResponse)
            dispatch(saveToken(tokenResponse.access_token))
        },
    });

    useEffect(() => {
        if (userToken) {
            navigate('/')
        }
    }, [userToken])

    return (<div className="container m-auto">
        <div className="logo">
            <img src="logo.png" alt="logo"/>
        </div>
        <div className="card p-5">
            <h2 className="login-signup-head title">Login Here</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register('email', {required: true})}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" autoComplete="true"
                                  placeholder="Password"  {...register('password', {required: true})}/>
                </Form.Group>
                {error && <p className={'text-danger'}>{error}</p>}
                <Button variant="outline-success" type="submit">
                    <FontAwesomeIcon icon={faRightToBracket}/> Login
                </Button>
            </Form>
            <button className="btn btn-danger mt-2" onClick={() => googleLogin()}><FontAwesomeIcon
                icon={faGoogle}/> Login with Google
            </button>
            <button className="btn btn-primary mt-2"><FontAwesomeIcon icon={faFacebook}/> Login with Facebook</button>
            <div className="or-option mt-2">Or</div>

            <Link to={'/register'} className="btn btn-outline-primary mt-2"><FontAwesomeIcon
                icon={faUserPlus}/> Register</Link>

        </div>
    </div>)
}
export default Login;