import { takeEvery, put, call } from "redux-saga/effects";

import {
    SET_USERS,
    APPEND_USER,
    DELETE_USER,
    UPDATE_USER,
} from "./actionTypes";

import {
    setUsers,
    appendUser,
    deleteUser,
    updateUser,
} from "./actions";