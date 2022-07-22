import {
    SET_USERS,
    APPEND_USER,
    DELETE_USER,
    UPDATE_USER,
} from "./actionTypes";

const INIT_STATE = {
    users: [],
}

const Users = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case APPEND_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.id),
            }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id.toString() === action.payload.id.toString()
                        ? { user, ...action.payload }
                        : user
                ),
            }
        default:
            return state;
    }
}

export default Users;