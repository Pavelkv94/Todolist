import { AppBar, Container, Grid, Paper, Toolbar } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { AddTaskAC, ChangeStatusTaskAC, ChangeTitleTaskAC, RemoveTasksAC } from './state/tasksReducer';
import { AddTodolistAC, ChangeFilterTodolistAC, ChangeTitleTodolistAC, RemoveTodolistAC } from './state/todolistReducer';
import { FilterType, Todolist, TaskType } from './Todolist';
import { AppRootState } from './state/store'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    //BLL
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks);

    //TODO Функции тасок
    //Delete tasks
    const removeTask = useCallback((taskID: string, todolistID: string) => {
        const action = RemoveTasksAC(taskID, todolistID);
        dispatch(action);
    }, [dispatch])
    //Add tasks from input
    const addTask = useCallback((title: string, todolistID: string) => {
        const action = AddTaskAC(title, todolistID);
        dispatch(action);
    }, [dispatch])
    //Change checkbox
    const changeStatus = useCallback((id: string, newIsDone: boolean, todolistID: string) => {
        const action = ChangeStatusTaskAC(id, newIsDone, todolistID)
        dispatch(action);
    }, [dispatch])
    //Change text in tasks
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistID: string) => {
        const action = ChangeTitleTaskAC(id, newTitle, todolistID);
        dispatch(action);
    }, [dispatch])

    //TODO Функции тудулистов
    //Filter tasks on buttons
    const changeFilterTodolist = useCallback((value: FilterType, todolistID: string) => {
        const action = ChangeFilterTodolistAC(todolistID, value);
        dispatch(action);
    }, [dispatch])
    //Change text in title for todolist
    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        const action = ChangeTitleTodolistAC(newTitle, todolistID);
        dispatch(action);
    }, [dispatch])
    //Delete Todolist
    const removeTodolist = useCallback((todolistID: string) => {
        const action = RemoveTodolistAC(todolistID);
        dispatch(action);
        dispatch(action);
    }, [dispatch])
    //add Todolists
    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    //UI
    const TodolistComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>{/*Если нету key то дом заново перерисовывается, если есть то удаляется конкретный элемент*/}
                <Paper style={{ "padding": "10px" }} elevation={3}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilterTodolist}
                        addTasks={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <Container fixed>
                <Grid container style={{ "margin": "15px" }}>
                    <AppBar color="primary" position="fixed" >
                        <Toolbar variant="regular">
                            <AddItemForm addItem={addTodolist} />
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid container spacing={3} style={{ "marginTop": "50px" }}>

                    {TodolistComponents}

                </Grid>
            </Container>

        </div >
    );
}

export default AppWithReducers;