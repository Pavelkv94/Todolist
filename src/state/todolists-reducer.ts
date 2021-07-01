import { todolistAPI } from './../api/api';
import { Dispatch } from 'redux';
import { FilterValuesType, TodolistType } from '../App';
import { RequestStatusType, setAppStatusAC, StatuseesCode } from './app-reducer';
import { AxiosError } from 'axios';
import { handleServerNetworkError } from '../utils/error-utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
   {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};


const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            {
                const index = state.findIndex(tl => tl.id === action.payload.todolistId);
                if (index > -1) {
                    state.splice(index, 1)
                }
            
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            { state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' }) }
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            {
                const todolist = state.find(tl => tl.id === action.payload.id);
                if (todolist) {
                    // если нашёлся - изменим ему заголовок
                    todolist.title = action.payload.title;
                }
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            {
                const todolist = state.find(tl => tl.id === action.payload.id);
                if (todolist) {
                    // если нашёлся - изменим ему заголовок
                    todolist.filter = action.payload.filter;
                }
            }
        },
        setTodolistAC(state, action: PayloadAction<{ todos: Array<TodolistType> }>) {
            {
                return action.payload.todos.map((tl: any) => {
                    return { ...tl, filter: 'all', entityStatus: 'idle' }
                })
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            {
                const todolist = state.find(tl => tl.id === action.payload.id);
                if (todolist) {
                    todolist.entityStatus = action.payload.entityStatus;
                }
            }
        },
    }
})
export const { removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, setTodolistAC, changeTodolistEntityStatusAC } = slice.actions

export const todolistsReducer = slice.reducer;

//todo THUNK CREATORS
export const setTodolistTC = () => (dispatch: Dispatch) => {

    dispatch(setAppStatusAC({ status: 'loading' }))
    // 1. Side Effect
    todolistAPI.getTodo()
        .then(res => {
            let todos = res.data
            // 2. Dispatch actions(thunk)
            dispatch(setTodolistAC({ todos: todos }))
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === StatuseesCode.successs) {
                let newTodo = res.data.data.item
                dispatch(addTodolistAC({ todolist: newTodo }))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            } else {
                handleServerNetworkError(dispatch, res.data.messages[0])
            }
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'loading' }))
    todolistAPI.deleteTodo(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC({ todolistId: todolistId }))
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC({ id: todolistId, title: title }))
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};


