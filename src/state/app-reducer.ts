import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux"
import { authAPI } from "../api/api"
import { setIsLoggedInAC } from "./auth-reducer"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
};
export enum StatuseesCode {
    successs = 0,
    failed = 1,
    captcha = 10
};

//type InitialStateType = typeof initialState;
const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            { state.status = action.payload.status }
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            { state.error = action.payload.error }
        },
        setIsInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            { state.isInitialized = action.payload.isInitialized }
        }
    }
})
export const { setAppErrorAC, setAppStatusAC, setIsInitializedAC } = slice.actions;
export const appReducer = slice.reducer;


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === StatuseesCode.successs) {
            dispatch(setIsLoggedInAC({ value: true }));
        } else {

        }
    }).finally(() => {
        dispatch(slice.actions.setIsInitializedAC({ isInitialized: true }))
    })
};
