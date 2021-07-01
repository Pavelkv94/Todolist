import { Dispatch } from 'redux';
import { setAppErrorAC, setAppStatusAC } from "../state/app-reducer"


// generic function
// export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
//     if (data.messages.length) {
//         dispatch(setAppErrorAC(data.messages[0]))
//     } else {
//         dispatch(setAppErrorAC('Some error occurred'))
//     }
//     dispatch(setAppStatusAC('failed'))
//  }

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setAppErrorAC({ error: message }))
    dispatch(setAppStatusAC({ status: 'failed' }))
}

//type ErrorsActionTypes = SetAppStatusType | SetAppErrorType