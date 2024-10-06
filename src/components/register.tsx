import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {validateData} from "../store/reducer/registerReducer";
import {doRegister} from "../store/actions/register";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

type RegisterEntity = {
    firstName: 'string'
    lastName: 'string'
    email: 'string'
}

export const validateEmail = (value) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String(value).toLowerCase().trim(),
    )
}

export default function () {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = (data) =>console.log(data)

    const dispatch = useDispatch();
    const {loader} = useSelector(state => state.root.registerReducer)
    const [formData, setFormData] = useState({
        firstName: {value: '', required: true, error: false, errorMsg: 'First Name is required!'},
        lastName: {value: '', required: false, error: false, errorMsg: 'Last Name is required!'},
        email: {value: '', required: true, error: false, errorMsg: 'Email is required!'}
    });
    const [error, setError] = useState('')

    const onFormFieldChange = (e) => {
        const {name, value} = e.target;
        let error = !value && formData[name].required;
        console.log(validateEmail(value), 'validateEmail(value)')
        if (!error) {
            if (name === 'email' && !validateEmail(value)) {
                console.log('sjsjsj')
                error = true
            }
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: {...prevState[name], value: value, error: error}
        }));
    }
    const onSave = (e) => {
        e.preventDefault();
        const hasErrorInRequiredFields = Object.keys(formData).some(
            (key) => formData[key].required && !formData[key].value
        );
        if (hasErrorInRequiredFields) {
            setError(`Fields are required!`)
        } else {
            setError('')
            // dispatch(validateData())
            // dispatch(doRegister(formData))
        }
    }

    return <div>
        {!!loader && <h1>Loading...</h1>}
        <h2>Register Here</h2>
        <form noValidate>
            <div className={`${error ? "was-validated" : ''} needs-validation mb-3`}>
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName.value}
                       onChange={onFormFieldChange}
                       className={`${formData.firstName.error && formData.firstName.required ? "is-invalid" : ''} form-control`}
                       required={formData.firstName.required}/>
                {(formData.firstName.error || error) &&
                    <div className="invalid-feedback">{formData.firstName.errorMsg}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName.value}
                       onChange={onFormFieldChange}
                       className={`${formData.lastName.error && formData.lastName.required ? "is-invalid" : ''} form-control`}
                       required={formData.lastName.required}/>
                {(formData.lastName.error || error) &&
                    <div className="invalid-feedback">{formData.lastName.errorMsg}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={formData.email.value}
                       onChange={onFormFieldChange}
                       className={`${formData.email.error && formData.email.required ? "is-invalid" : ''} form-control`}
                       required={formData.email.required}/>
                {(formData.email.error || error) && <div className="invalid-feedback">{formData.email.errorMsg}</div>}
            </div>
            {error && <div
                className="bg-danger-subtle border border-danger-subtle p-3 rounded-3 text-danger-emphasis mb-4">{error}</div>}
            <Button onClick={onSave} type="submit">Register</Button>
        </form>
    </div>

}