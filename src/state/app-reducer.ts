import { Dispatch } from "redux"
import { authAPI } from "../api/api"
import { setIsLoggedInAC } from "./auth-reducer"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}
export enum StatuseesCode {
    successs = 0,
    failed = 1,
    captcha = 10
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'App/SET-STATUS':
            return { ...state, status: action.status }
        case 'App/SET-ERROR':
            return { ...state, error: action.error }
        case 'App/SET-IS-INITIALIZED':
            return { ...state, isInitialized: action.isInitialized }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'App/SET-STATUS',
        status
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'App/SET-ERROR',
        error
    } as const
}
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'App/SET-IS-INITIALIZED',
        isInitialized
    } as const
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === StatuseesCode.successs) {
            dispatch(setIsLoggedInAC(true));
        } else {

        }
    }).finally(() => {
        dispatch(setIsInitializedAC(true))
    })
}

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>

type ActionsType = SetAppStatusType | SetAppErrorType | SetIsInitializedType

