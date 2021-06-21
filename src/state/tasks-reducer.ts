import { UpdateTaskModelType, TaskStatuses } from './../api/api';
import { AppRootStateType } from './store';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType } from './todolists-reducer';
import { TasksStateType } from '../App';
import { Dispatch } from 'redux';
import { tasksAPI, TaskType } from '../api/api';
import { setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType, StatuseesCode } from './app-reducer';
import { AxiosError } from 'axios';
import { handleServerNetworkError } from '../utils/error-utils';

export type RemoveTaskActionType = {
    type: 'todolist/tasks/REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'todolist/tasks/ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = {
    type: 'todolist/tasks/CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
export type SetTasksActionType = {
    type: 'todolist/tasks/SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | SetTasksActionType
    | SetAppStatusType
    | SetAppErrorType

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
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'todolist/tasks/SET-TASKS': {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case 'todolists/SET-TODOS': {
            const stateCopy = { ...state }
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'todolist/tasks/REMOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'todolist/tasks/ADD-TASK': {
            const stateCopy = { ...state }
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     todoListId: action.todolistId, description: '',
            //     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            // }
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'todolist/tasks/CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, status: action.status } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }
        case 'todolist/tasks/CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, title: action.title } : t);

            state[action.todolistId] = newTasksArray;
            return ({ ...state });
        }
        case 'todolists/ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'todolists/REMOVE-TODOLIST': {
            const copyState = { ...state };
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}


//todo ACTION CREATORS
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'todolist/tasks/REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return { type: 'todolist/tasks/ADD-TASK', task }
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return { type: 'todolist/tasks/CHANGE-TASK-STATUS', status, todolistId, taskId } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'todolist/tasks/CHANGE-TASK-TITLE', title, todolistId, taskId }
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return { type: 'todolist/tasks/SET-TASKS', tasks, todolistId }
}

//todo THUNK CREATORS
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    tasksAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const addTaskTC = (todolistId: string, taskTitile: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, taskTitile)
        .then((res) => {
            if (res.data.resultCode === StatuseesCode.successs) {
                let newTask = res.data.data.item;
                dispatch(addTaskAC(newTask))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerNetworkError(dispatch, res.data.messages[0])
                // dispatch(setAppErrorAC(res.data.messages[0]))
                // dispatch(setAppStatusAC('failed'))
            }
        }).catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
            // dispatch(setAppErrorAC(err.message));
            // dispatch(setAppStatusAC('succeeded'))
        })
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    //обращаемся к стейту
    let state = getState();
    //получаем массив тасок
    let allTasks = state.tasks
    //теперь нужно достать таски конкретного тудулиста
    let tasksForCurrentTodolist = allTasks[todolistId]
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
                dispatch(changeTaskStatusAC(taskId, updateTask, todolistId))
            }).catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }

}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
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
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            }).catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}