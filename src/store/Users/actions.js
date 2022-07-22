import {
    SET_USERS,
    APPEND_USER,
    DELETE_USER,
    UPDATE_USER,
} from "./actionTypes";

export const setUsers = users => ({
    type: SET_USERS,
    payload: users,
})

export const appendUser = user => ({
    type: APPEND_USER,
    payload: user,
})

export const deleteUser = user => ({
    type: DELETE_USER,
    payload: user,
})

export const updateUser = user => ({
    type: UPDATE_USER,
    payload: user,
})

