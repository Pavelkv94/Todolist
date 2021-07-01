import { UpdateTaskModelType, TaskStatuses } from './../api/api';
import { AppRootStateType } from './store';
import { addTodolistAC, removeTodolistAC, setTodolistAC } from './todolists-reducer';
import { TasksStateType } from '../App';
import { Dispatch } from 'redux';
import { tasksAPI, TaskType } from '../api/api';
import { setAppStatusAC, StatuseesCode } from './app-reducer';
import { AxiosError } from 'axios';
import { handleServerNetworkError } from '../utils/error-utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: TasksStateType = {


    /*"todolistId1": [
       { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ],
   "todolistId2": [
       { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ]*/
};



const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            {
                state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId);
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            {
                state[action.payload.task.todoListId].push(action.payload.task)
            }
        },
        changeTaskStatusAC(state, action: PayloadAction<{ taskId: string, status: TaskStatuses, todolistId: string }>) {
            {
                let newTasksArray = state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? { ...t, status: action.payload.status } : t);
                state[action.payload.todolistId] = newTasksArray;

            }
        },
        changeTaskTitleAC(state, action: PayloadAction<{ taskId: string, title: string, todolistId: string }>) {
            {
                const newTasksArray = state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t);

                state[action.payload.todolistId] = newTasksArray;

            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            {
                state[action.payload.todolistId] = action.payload.tasks
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodolistAC, (state, action) => {
            action.payload.todos.forEach((tl) => {
                state[tl.id] = []
            })
        });
    }
})
export const { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, setTasksAC } = slice.actions

export const tasksReducer = slice.reducer;



//todo THUNK CREATORS
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC({ tasks: tasks, todolistId: todolistId }))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
};

export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))

    tasksAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC({ taskId: taskId, todolistId: todolistId }))
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const addTaskTC = (todolistId: string, taskTitile: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    tasksAPI.createTask(todolistId, taskTitile)
        .then((res) => {
            if (res.data.resultCode === StatuseesCode.successs) {
                let newTask = res.data.data.item;
                dispatch(addTaskAC({ task: newTask }))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            } else {
                handleServerNetworkError(dispatch, res.data.messages[0])
            }
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
};

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    //обращаемся к стейту
    let state = getState();
    //получаем массив тасок
    let allTasks = state.tasks;
    //теперь нужно достать таски конкретного тудулиста
    let tasksForCurrentTodolist = allTasks[todolistId];
    //находим конкретную таску у которой меняем статус
    let findTask = tasksForCurrentTodolist.find(t => t.id === taskId);
    //todo первый способ: передаюттся лишние строки на сервер
    //const newTask = { ...findTask, status: status }
    //const model = newTask;

    //todo для того чтобы не передавать лишие строки на сервер делаем так:
    //условие обязательно
    if (findTask) {
        const model: UpdateTaskModelType = {
            title: findTask.title,
            status: status,
            startDate: findTask.startDate,
            priority: findTask.priority,
            description: findTask.description,
            deadline: findTask.deadline
        }

        tasksAPI.updateTask(todolistId, taskId, model as UpdateTaskModelType)
            .then((res) => {
                let updateTask = res.data.data.item.status
                dispatch(changeTaskStatusAC({ taskId: taskId, status: updateTask, todolistId: todolistId }))
            }).catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }

};

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    let findTask = getState().tasks[todolistId].find(t => t.id === taskId);
    if (findTask) {
        const model: UpdateTaskModelType = {
            title: title,
            status: findTask.status,
            startDate: findTask.startDate,
            priority: findTask.priority,
            description: findTask.description,
            deadline: findTask.deadline
        }

        tasksAPI.updateTask(todolistId, taskId, model as UpdateTaskModelType)
            .then((res) => {
                let title = res.data.data.item.title
                dispatch(changeTaskTitleAC({ taskId: taskId, title: title, todolistId: todolistId }))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            }).catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
};