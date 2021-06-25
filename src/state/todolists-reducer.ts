import { todolistAPI } from './../api/api';
import { Dispatch } from 'redux';
import { FilterValuesType, TodolistType } from '../App';
import { RequestStatusType, SetAppErrorType, setAppStatusAC, SetAppStatusType, StatuseesCode } from './app-reducer';
import { AxiosError } from 'axios';
import { handleServerNetworkError } from '../utils/error-utils';

export type RemoveTodolistActionType = {
    type: 'todolists/REMOVE-TODOLIST',
    id: string
};

export type AddTodolistActionType = {
    type: 'todolists/ADD-TODOLIST',
    todolist: TodolistType
};

export type ChangeTodolistTitleActionType = {
    type: 'todolists/CHANGE-TODOLIST-TITLE',
    id: string
    title: string
};

export type ChangeTodolistFilterActionType = {
    type: 'todolists/CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
};

export type SetTodosActionType = ReturnType<typeof setTodolistAC>

export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodosActionType
    | SetAppStatusType
    | SetAppErrorType
    | ChangeTodolistEntityStatusType;

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
   {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'todolists/SET-TODOS': {
            return action.todos.map((tl) => {
                return { ...tl, filter: 'all', entityStatus: 'idle' }
            })
        }
        case 'todolists/REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'todolists/ADD-TODOLIST': {

            return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]

        }
        case 'todolists/CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'todolists/CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'todolists/CHANGE-TODOLIST-ENTITY-STATUS': {
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
};

//todo ACTION CREATORS
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'todolists/REMOVE-TODOLIST', id: todolistId }
};
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => ({ type: 'todolists/ADD-TODOLIST', todolist })
// export const addTodolistAC = (title: string): AddTodolistActionType => {
//     return { type: 'todolists/ADD-TODOLIST', title: title, todolistId: v1() }
// };
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'todolists/CHANGE-TODOLIST-TITLE', id: id, title: title }
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'todolists/CHANGE-TODOLIST-FILTER', id: id, filter: filter }
};

export const setTodolistAC = (todos: Array<TodolistType>) => {
    return {
        type: 'todolists/SET-TODOS',
        todos
    } as const
};

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {
        type: 'todolists/CHANGE-TODOLIST-ENTITY-STATUS',
        id,
        entityStatus
    } as const
};

//todo THUNK CREATORS
export const setTodolistTC = () => (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'))
    // 1. Side Effect
    todolistAPI.getTodo()
        .then(res => {
            let todos = res.data
            // 2. Dispatch actions(thunk)
            dispatch(setTodolistAC(todos))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === StatuseesCode.successs) {
                let newTodo = res.data.data.item
                dispatch(addTodolistAC(newTodo))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerNetworkError(dispatch, res.data.messages[0])
            }
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodo(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};


