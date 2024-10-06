import {useSelector} from "react-redux";

export const TodoLists = () => {
    const todos = useSelector(state => state.todo.todos);
    return (<>
        <ul>
            {
                todos && todos.map(item => {
                    return <li key={item}>{item}</li>
                })
            }
        </ul>
    </>);
}