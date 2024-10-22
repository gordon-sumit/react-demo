import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfiles} from "../store/actions/profile";
import {Table} from "react-bootstrap";

export default function () {
    const dispatch = useDispatch();
    const {profiles} = useSelector(state => state.root.profileReducers)
    const {userToken} = useSelector(state => state.root.auth)
    useEffect(() => {
        dispatch(fetchUserProfiles(userToken))
    }, [dispatch])

    return <div>
        <h2>Profile listing...</h2>
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
            </tr>
            </thead>
            <tbody>
            {profiles && profiles.map((item, index) => {
               return <tr key={index}>
                   <td>{index+1}</td>
                   <td>{item.firstName} {item.lastName}</td>
                   <td>{item.email}</td>
                   <td>{item.phone}</td>
                   <td>{item.address}</td>
               </tr>
            })}
            </tbody>
        </Table>
    </div>
}