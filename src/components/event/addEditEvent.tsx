import Loader from "../loader";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {createEvent} from "../../store/actions/event";
import {resetFormResponse} from "../../store/reducer/form";
import {Fragment, useEffect} from "react";
import withReactContent from "sweetalert2-react-content";
import Sweetalert2 from "sweetalert2";

export default function (){
    const {
        register,
        watch,
        reset,
        formState: {errors},
        setValue,
        handleSubmit,
    } = useForm();
    const dispatch = useDispatch();
    const {success, message, loading} = useSelector(state => state.root.form);

    const onDateChange = (date, name) => {
        //10/02/2024
        setValue(`${name}.dateTime`, date)
        setValue(`${name}.timeZone`, 'America/Los_Angeles')
    }
    const onSubmit = (data) => {
        reset();
        dispatch(createEvent(data));
    }

    const onCloseResponseBox = () => {
        dispatch(resetFormResponse())
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
        }
    }, [message])

    return <Fragment>
        {loading && <Loader/>}
        <div className={`card container event-card p-5 ${loading ? 'is-loading' : ''}`}>
            <h2 className="text-center">Create Event</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="eventTitle">Event title</label>
                    <input type="text" className="form-control" id="eventTitle"
                           {...register('summary', {required: true})}
                           placeholder="Event title here..."/>
                    {errors.title && <span className="text-danger">Event is required!</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="eventDescription">Description</label>
                    <textarea className="form-control"
                              {...register('description', {required: true})}
                              placeholder="Desciption here..." id="eventDescription"
                              rows="3"></textarea>
                    {errors.description && <span className="text-danger">Description is required!</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="eventRoom">Rooms</label>
                    <select className="form-control"
                            {...register('location', {required: true})}
                            id="eventRoom">
                        <option defaultValue=''>Select Room</option>
                        <option value="room1">Room 1</option>
                        <option value="room2">Room 2</option>
                        <option value="room3">Room 3</option>
                        <option value="room4">Room 4</option>
                        <option value="room5">Room 5</option>
                    </select>
                    {errors.room && <span className="text-danger">Room is required!</span>}
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <DatePicker selected={watch('start.dateTime')}
                                        onChange={(date) => onDateChange(date, 'start')}
                                        className="form-control" id="startDate"/>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <DatePicker selected={watch('end.dateTime')} onChange={(date) => onDateChange(date, 'end')}
                                        className="form-control" id="endDate"/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-success">Create</button>
                    <button className="btn btn-dark m-lg-3">Cancel</button>
                </div>
            </form>
        </div>
    </Fragment>
}