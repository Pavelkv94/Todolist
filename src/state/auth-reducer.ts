import { authAPI, LoginParamsType } from './../api/api';
import { Dispatch } from 'redux'
import { SetAppErrorType, setAppStatusAC, SetAppStatusType, StatuseesCode } from './app-reducer'
import { handleServerNetworkError } from '../utils/error-utils';
import { AxiosError } from 'axios';

const initialState = {
    isLoggedIn: false
};

type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
};

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value } as const);

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === StatuseesCode.successs) {
                dispatch(setIsLoggedInAC(true));
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
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerNetworkError(dispatch, res.data.messages[0])
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.messages)
        })
};

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusType | SetAppErrorType;


