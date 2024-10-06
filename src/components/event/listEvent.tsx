import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listEvent} from "../../store/actions/event";
import moment from "moment";

export default function () {
    const dispatch = useDispatch();
    const {events} = useSelector(state => state.root.eventReducer);

    useEffect(() => {
        console.log('jjj')
        if (!events.length) {
            dispatch(listEvent())
        }
    }, []);

    const changeFormat = (date) => {
        return moment(date).format('Do MMM, Y');
    }

    return <div>
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Room</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
            </tr>
            </thead>
            <tbody>
            {events && events.map((item, index) => {
                return <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.room}</td>
                    <td>{changeFormat(item.createdAt)}</td>
                    <td>{changeFormat(item.updatedAt)}</td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}