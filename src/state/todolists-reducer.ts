import { todolistAPI } from './../api/api';
import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';
import { RequestStatusType, setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType } from './app-reducer';
import { AxiosError } from 'axios';
import { handleServerNetworkError } from '../utils/error-utils';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodosActionType = ReturnType<typeof setTodosAC>

export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodosActionType
    | SetAppStatusType
    | SetAppErrorType
    | ChangeTodolistEntityStatusType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
   {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOS': {
            return action.todos.map((tl) => {
                return { ...tl, filter: 'all', entityStatus: 'idle' }
            })
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.entityStatus = action.entityStatus;
            }
            return [...state]
        }
        // case 'CHANGE-TODOLIST-ENTITY-STATUS': {
        //     return state.map(tl => tl.id === action.id ? { ...tl, entityStatus: action.entityStatus } : tl)
        // }

        default:
            return state;
    }
}

//todo ACTION CREATORS
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}


export const setTodosAC = (todos: Array<TodolistType>) => {
    return {
        type: 'SET-TODOS',
        todos
    } as const
}

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        id,
        entityStatus
    } as const
}



//todo THUNK CREATORS
export const setTodosTC = () => (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'))
    // 1. Side Effect
    todolistAPI.getTodo()
        .then(res => {
            let todos = res.data
            // 2. Dispatch actions(thunk)
            dispatch(setTodosAC(todos))
            dispatch(setAppStatusAC('succeeded'))
        })
}

enum StatuseesCode {
    successs = 0,
    failed = 1,
    captcha = 10
}

export const addTodosTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === StatuseesCode.successs) {
                let newTodo = res.data.data.item.title
                dispatch(addTodolistAC(newTodo))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(setAppStatusAC('failed'))
            }
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
            // dispatch(setAppErrorAC(err.message));
            // dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTodosTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodo(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))

        })
}

export const changeTodosTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}


