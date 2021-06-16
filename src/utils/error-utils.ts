import { Dispatch } from 'redux';
import { setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType } from "../state/app-reducer"

// generic function
export const handleServerNetworkError = (dispatch: Dispatch<ErrorsActionTypes>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorsActionTypes = SetAppStatusType | SetAppErrorType