import {useState} from "react";
import {addTodoState} from "../store/actions/todo";
import {useAppDispatch} from "../store/hooks";
import {Button} from "react-bootstrap";


export default function () {
    const [todoItem, setTodoItem] = useState('');
    const dispatch = useAppDispatch();
    const addTodo = () => {
        dispatch(addTodoState(todoItem))
        setTodoItem('')
    }

    return (<>
        <input type="text" value={todoItem} onChange={(e)=>setTodoItem(e.target.value)}/>
        <Button as="a" variant="primary" onClick={addTodo}>Add Todo gg</Button>
    </>);
}