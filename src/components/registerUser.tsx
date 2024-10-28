import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {validateData} from "../store/reducer/registerReducer";
import {confirmRegistration, doRegister, fetchGoogleProfile} from "../store/actions/register";
import {Fragment, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import register from "./register";
import {fetchUsers} from "../store/actions/login";
import {profileData} from "../store/reducer/profileReducers";
import {fetchUserProfiles} from "../store/actions/profile";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faRightToBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {useGoogleLogin} from "@react-oauth/google";
import {saveToken} from "../store/reducer/auth";
import Loader from "./loader";
import Form from "react-bootstrap/Form";

type RegisterEntity = {
    registerInfo: {
        firstName: 'string'
        lastName: 'string'
        email: 'string'
    }
}

export const validateEmail = (value, setError, clearErrors) => {
    const checkEmail = (value) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String(value).toLowerCase().trim(),
    );
    if (!checkEmail(value)) {
        setError('email', {type: 'Invalid', message: 'Invalid email was provided'});
        return false;
    }
    clearErrors('email')
    return true;
}

export const emailRegex = () => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}


export default function () {
    const dispatch = useDispatch();
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [username, setUserName] = useState('');
    const navigate = useNavigate();
    const {userToken} = useSelector((state) => state.root.auth);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setError,
        clearErrors,
        formState: {errors}
    } = useForm({shouldUnregister: true});
    const {loader, codeDeliveryDetails} = useSelector(state => state.root.registerReducer)
    const formValues = watch()

    useEffect(() => {
        if (userToken) {
            navigate('/')
        }
    }, [userToken]);

    useEffect(()=>{
        if(codeDeliveryDetails.redirect){
            navigate('/login')
        }
    },[codeDeliveryDetails])

    const onSubmit = (data: RegisterEntity) => {
        if (data) {
            setUserName(`${data.firstName}.${data.lastName}`)
            dispatch(doRegister(data))
            reset();
        }
    }
    const googleSignUp = useGoogleLogin({
        onSuccess: tokenResponse => {
            dispatch(fetchGoogleProfile(tokenResponse.access_token))
        },
    });

    const onSubmitConfirmation = (data) => {
        dispatch(confirmRegistration({username, code: data.confirmationCode}))
    }

    const confirmationCodeForm = () => {
        return <div className="card p-5">
            <h2 className="login-signup-head title mb-4">Confirmation Code</h2>
            <Form onSubmit={handleSubmit(onSubmitConfirmation)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text"
                                  placeholder="Enter confirmation code" {...register('confirmationCode', {required: true})}/>
                    <Form.Text className="text-muted">
                        Enter the confirmation code sent to <strong>{codeDeliveryDetails.Destination}</strong> email.
                    </Form.Text>
                </Form.Group>
                <Button variant="outline-success" type="submit">
                    <FontAwesomeIcon icon={faUserPlus}/> Complete registration
                </Button>
                {codeDeliveryDetails.error && <p className="text-danger text-center fa-sm mt-3">{codeDeliveryDetails.error}</p>}
            </Form>
        </div>
    }

    return <div className="container m-auto">
        {loader && <Loader/>}
        <div className="logo">
            <img src="logo.png" alt="logo"/>
        </div>
        {!Object.keys(codeDeliveryDetails).length ?
            <div className="card p-5">

                <h2>Register Here</h2>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${formValues.firstName ? "was-validated" : ''} needs-validation mb-3`}>
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName"
                               className={`${errors.firstName ? 'is-invalid' : ""} form-control`}
                               {...register('firstName', {required: true})}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName"
                               className={`form-control`}
                               {...register('lastName')}
                        />
                    </div>
                    <div className={`${formValues.email ? "was-validated" : ''} needs-validation mb-3`}>
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="text" id="email" name="email"
                               className={`${errors.email ? 'is-invalid' : ""} form-control`}
                               {...register('email', {
                                   required: true,
                                   onChange: (e) => validateEmail(e.target.value, setError, clearErrors)
                               })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="phone">Phone</label>
                        <input type="text" id="phone" name="phone"
                               className={`form-control`}
                               {...register('phone')}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="address">Address</label>
                        <input type="text" id="address" name="address"
                               className={`form-control`}
                               {...register('address')}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type={passwordVisibility ? 'text' : 'password'} id="password" name="password"
                               className={`form-control`}
                               {...register('password')}
                        />
                    </div>
                    <div>
                        <label htmlFor="show-pass">Show Password</label>
                        <input type="checkbox" className="m-lg-2" id="show-pass"
                               onClick={() => setPasswordVisibility(!passwordVisibility)}/>
                    </div>

                    {(errors.firstName || errors.email) && <div
                        className="bg-danger-subtle border border-danger-subtle p-3 rounded-3 text-danger-emphasis mb-4">
                        Fields are required!
                    </div>}
                    {/*{loader && <div*/}
                    {/*    className="bg-info-subtle border border-info-subtle p-3 rounded-3 text-info-emphasis mb-4">*/}
                    {/*    Loading...!*/}
                    {/*</div>}*/}
                    <Button variant="outline-success" type="submit"><FontAwesomeIcon
                        icon={faUserPlus}/> Register</Button>
                </form>
                <button className="btn btn-danger mt-2" onClick={() => googleSignUp()}><FontAwesomeIcon
                    icon={faGoogle}/> Register with Google
                </button>
                <button className="btn btn-primary mt-2"><FontAwesomeIcon icon={faFacebook}/> Register with Facebook
                </button>
                <div className="or-option mt-2">Or</div>

                <Link to={'/login'} className="btn btn-outline-primary mt-2"><FontAwesomeIcon
                    icon={faRightToBracket}/> Login</Link>
            </div>
            :
            confirmationCodeForm()
        }
    </div>

}