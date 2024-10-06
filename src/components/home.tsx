import ListEvent from "./event/listEvent";
import AddEditEvent from "./event/addEditEvent";

export default function () {
    return <div className="container">
        <ListEvent/>
        <AddEditEvent/>
    </div>
}