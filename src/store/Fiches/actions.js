import {
    SET_FICHES,
    APPEND_FICHE,
    DELETE_FICHE,
    UPDATE_FICHE
} from "./actionTypes";

export const setFiches = fiches => ({
    type: SET_FICHES,
    payload: fiches
});

export const appendFiche = fiche => ({
    type: APPEND_FICHE,
    payload: fiche
});

export const deleteFiche = id => ({
    type: DELETE_FICHE,
    payload: id
});

export const updateFiche = fiche => ({
    type: UPDATE_FICHE,
    payload: fiche
});