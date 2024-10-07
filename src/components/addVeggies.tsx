import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addVegetableAction} from "../store/actions/myVegetable.actions";
import Loader from "./loader";
import withReactContent from "sweetalert2-react-content";
import Sweetalert2 from "sweetalert2";

export default function ({show, setShow}) {
    const [preview, setPreview] = useState();
    const {success, message, loading} = useSelector(state => state.root.form);
    const dispatch = useDispatch();
    const {register, watch, handleSubmit, reset, formState: {errors}} = useForm();
    const onSubmit = (formData) => {
        console.log(formData);
        reset();
        dispatch(addVegetableAction(formData));
        setPreview(null)
    }

    useEffect(() => {
        if (message) {
            withReactContent(Sweetalert2).fire({
                position: 'bottom-end',
                icon: success ? "success" : "error",
                title: message,
                showConfirmButton: false,
                key: "", props: undefined, type: undefined,
                timer: 2000
            })
            setShow(false)
        }
    }, [message])
    const onFileSelect = (e) => {
        console.log(e.target.files)
        const input = e.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreview(e.target.result)
            }
            register('file', {value: input.files[0]})
            reader.readAsDataURL(input.files[0]);
        }
    }

    return <div className="position-relative">
        <div id="overlay" className={`overlay ${show ? 'show' : ''}`}></div>
        <div id="mySidebarForm" className={`sidebar-form ${show ? 'show' : ''}`}>
            {loading && <Loader/>}
            <h4>Add Vegetables</h4>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"
                           id="name" {...register('name', {required: true})}
                           placeholder="Enter vegetable name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="keywords" className="form-label">Search Keywords</label>
                    <textarea className="form-control"
                              id="keywords" {...register('keywords', {required: true})}
                              placeholder="Enter vegetable search keywords">

                    </textarea>
                </div>
                <div className="mb-3">
                    <input type="file" className="form-control" onChange={(e) => onFileSelect(e)}/>
                    {preview &&
                        <img className="d-block img-thumbnail m-auto mt-3" width={250} height={200} src={preview}
                             alt="preview"/>}
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-success">Submit</button>
                    <button id="closeSidebar" className="btn btn-secondary m-3" onClick={setShow}>Close</button>
                </div>
            </form>
        </div>
    </div>
}