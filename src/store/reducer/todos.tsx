import {ADD_TODO} from "../actions/todo";

export default function (state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.item];
        default:
            return state;
    }
}