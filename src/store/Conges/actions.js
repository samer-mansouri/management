import {
    SET_CONGES,
    APPEND_CONGE,
    DELETE_CONGE,
    UPDATE_CONGE,
} from "./actionTypes";

export const setConges = conges => ({
    type: SET_CONGES,
    payload: conges,
});

export const appendConge = conge => ({
    type: APPEND_CONGE,
    payload: conge,
});

export const deleteConge = conge => ({
    type: DELETE_CONGE,
    payload: conge,
});

export const updateConge = conge => ({
    type: UPDATE_CONGE,
    payload: conge,
});