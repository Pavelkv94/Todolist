import { useCallback, useEffect } from 'react'
import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
    addTodosTC,
    changeTodolistFilterAC,
    changeTodosTitleTC,
    removeTodosTC,
    setTodosTC,
    TodolistDomainType
} from './state/todolists-reducer';
import { addTaskTC, changeTaskTitleTC, removeTasksTC, updateTaskStatusTC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TaskStatuses, TaskType, } from './api/api';
import { RequestStatusType } from './state/app-reducer';
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './features/Login/Login';
import { TodolistsList } from './TodolistsList';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {

    // useEffect(() => {
    //     dispatch(setTodosTC())

    //     // /    todolistAPI.getTodo().then((res) => {
    //     //         let todos = res.data;
    //     //         dispatch(setTodosAC(todos))
    //     //     })
    // }, []
    // )

    // const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    // const dispatch = useDispatch();

    // //todo TASKS FUNCTION
    // const removeTask = useCallback(function (id: string, todolistId: string) {
    //     dispatch(removeTasksTC(todolistId, id))
    // }, []);

    // const addTask = useCallback(function (title: string, todolistId: string) {
    //     dispatch(addTaskTC(todolistId, title))
    // }, []);

    // const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    //     dispatch(updateTaskStatusTC(todolistId, id, status));
    // }, []);

    // const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {

    //     dispatch(changeTaskTitleTC(todolistId, id, newTitle));
    // }, []);

    // //todo TODOLISTS FUNCTION
    // const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    //     const action = changeTodolistFilterAC(todolistId, value);
    //     dispatch(action);
    // }, []);

    // const removeTodolist = useCallback(function (id: string) {
    //     dispatch(removeTodosTC(id));
    // }, []);

    // const changeTodolistTitle = useCallback(function (id: string, title: string) {
    //     dispatch(changeTodosTitleTC(id, title));
    // }, []);

    // const addTodolist = useCallback((title: string) => {
    //     dispatch(addTodosTC(title));
    // }, [dispatch]);

    return (
        <div className="App">
            <BrowserRouter>
                <ErrorSnackbar />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>

                {status === 'loading' && <LinearProgress color="secondary" />}

                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo} />} />
                    <Route path={'/login'} render={() => <Login />} />
                    
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
