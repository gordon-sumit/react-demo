import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfiles, onDeleteUser} from "../../store/actions/profile";
import {Table} from "react-bootstrap";
import './profile.css';
import Confirm from "../modals/confirm";

export default function () {
    const dispatch = useDispatch();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [show, setShow] = useState(false);
    const selectAllRef = useRef(null);
    const {profiles} = useSelector(state => state.root.profileReducers)
    const {userToken} = useSelector(state => state.root.auth)
    useEffect(() => {
        dispatch(fetchUserProfiles(userToken))
    }, [dispatch]);

    useEffect(() => {
        if (selectAllRef.current) {
            if (selectedUsers.length === profiles.length) {
                selectAllRef.current.indeterminate = false;
                selectAllRef.current.checked = true;
            } else if (selectedUsers.length > 0) {
                selectAllRef.current.indeterminate = true;
            } else {
                selectAllRef.current.indeterminate = false;
                selectAllRef.current.checked = false;
            }
        }

    }, [selectedUsers, profiles.length]);

    const handleUserSelection = (id) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(id)
                ? prevSelectedUsers.filter((userId) => userId !== id)
                : [...prevSelectedUsers, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === profiles.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(profiles.map((user) => user.awsUuid));
        }
    };

    const onDeleteSelected = () => {
        if (!selectedUsers.length) return;
        console.log("Selected User IDs:", selectedUsers);
        setShow(true);
    };

    return <div>
        <div className="profile-head">
            <h2>AWS Profiles</h2>
            <button className="btn btn-outline-danger" onClick={onDeleteSelected}>Delete</button>
        </div>
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th><input type="checkbox" onChange={handleSelectAll} name="all"/></th>
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
                    <td><input type="checkbox" onChange={() => handleUserSelection(item.awsUuid)}
                               value={item.awsUuid}
                               checked={selectedUsers.includes(item.awsUuid)}
                               name={item.firstName}/></td>
                    <td>{index + 1}</td>
                    <td>{item.firstName} {item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                </tr>
            })}
            </tbody>
        </Table>
        {show &&
            <Confirm
                message={'Are you sure, you want to delete?'}
                onCancelClick={() => setShow(false)}
                onYesClick={() => dispatch(onDeleteUser({token: userToken, ids: selectedUsers}))}
            />
        }
    </div>
}