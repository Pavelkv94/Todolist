import { authAPI, LoginParamsType } from './../api/api';
import { Dispatch } from 'redux'
import { SetAppErrorType, setAppStatusAC, SetAppStatusType, StatuseesCode } from './app-reducer'
import { handleServerNetworkError } from '../utils/error-utils';
import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
};

export const slice = createSlice({
    name: " auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            { state.isLoggedIn = action.payload.value }
        }
    }
})

export const authReducer = slice.reducer;

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === StatuseesCode.successs) {
                dispatch(slice.actions.setIsLoggedInAC({ value: true }));
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerNetworkError(dispatch, res.data.messages[0])
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === StatuseesCode.successs) {
                dispatch(slice.actions.setIsLoggedInAC({ value: false }))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerNetworkError(dispatch, res.data.messages[0])
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.messages)
        })
};
