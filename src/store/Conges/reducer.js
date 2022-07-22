import {
    SET_CONGES,
    APPEND_CONGE,
    DELETE_CONGE,
    UPDATE_CONGE,
} from "./actionTypes";

const INIT_STATE = {
    conges: [],
}

const Conges = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_CONGES:
            return {
                ...state,
                conges: action.payload,
            }
        case APPEND_CONGE:
            return {
                ...state,
                conges: [...state.conges, action.payload],
            }
        case DELETE_CONGE:
            return {
                ...state,
                conges: state.conges.filter(conge => conge.id !== action.payload.id),
            }
        case UPDATE_CONGE:
            return {
                ...state,
                conges: state.conges.map(conge =>
                    conge.id.toString() === action.payload.id.toString()
                        ? { conge, ...action.payload }
                        : conge
                ),
            }
        default:
            return state;
    }
}

export default Conges;