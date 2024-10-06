import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {validateData} from "../store/reducer/registerReducer";
import {doRegister} from "../store/actions/register";
import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import register from "./register";
import {fetchUsers} from "../store/actions/login";
import {profileData} from "../store/reducer/profileReducers";
import {fetchUserProfiles} from "../store/actions/profile";
import {useNavigate} from "react-router-dom";

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
    const {loader} = useSelector(state => state.root.registerReducer)
    const formValues = watch()

    useEffect(()=>{
        if(userToken){
            navigate('/')
        }
    },[userToken]);

    const onSubmit = (data: RegisterEntity) => {
        if (data) {
            dispatch(doRegister(data, 'pp'))
            reset();
        }
    }


    return <div>
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
                <input type="checkbox" className="m-lg-2" id="show-pass" onClick={() => setPasswordVisibility(!passwordVisibility)}/>
            </div>

            {(errors.firstName || errors.email) && <div
                className="bg-danger-subtle border border-danger-subtle p-3 rounded-3 text-danger-emphasis mb-4">
                Fields are required!
            </div>}
            {loader && <div
                className="bg-info-subtle border border-info-subtle p-3 rounded-3 text-info-emphasis mb-4">
                Loading...!
            </div>}
            <Button type="submit">Register</Button>
        </form>
    </div>

}