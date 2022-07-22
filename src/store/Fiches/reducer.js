import {
    SET_FICHES,
    APPEND_FICHE,
    DELETE_FICHE,
    UPDATE_FICHE
} from "./actionTypes";

const INIT_STATE = {
    fiches: [],
}

const Fiches = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_FICHES:
            return {
                ...state,
                fiches: action.payload,
            }
        case APPEND_FICHE:
            return {
                ...state,
                fiches: [...state.fiches, action.payload],
            }
        case DELETE_FICHE:
            return {
                ...state,
                fiches: state.fiches.filter(fiche => fiche.id !== action.payload.id),
            }
        case UPDATE_FICHE:
            return {
                ...state,
                fiches: state.fiches.map(fiche =>
                    fiche.id.toString() === action.payload.id.toString()
                        ? { fiche, ...action.payload }
                        : fiche
                ),
            }
        default:
            return state;
    }
}

export default Fiches;