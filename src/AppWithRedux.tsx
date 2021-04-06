import { AppBar, Container, Grid, Paper, Toolbar } from '@material-ui/core';
import React from 'react';
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
    function removeTask(taskID: string, todolistID: string) {
        const action = RemoveTasksAC(taskID, todolistID);
        dispatch(action);
    }
    //Add tasks from input
    function addTask(title: string, todolistID: string) {
        const action = AddTaskAC(title, todolistID);
        dispatch(action);
    }
    //Change checkbox
    function changeStatus(id: string, newIsDone: boolean, todolistID: string) {
        const action = ChangeStatusTaskAC(id, newIsDone, todolistID)
        dispatch(action);
    }
    //Change text in tasks
    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
        const action = ChangeTitleTaskAC(id, newTitle, todolistID);
        dispatch(action);
    }

    //TODO Функции тудулистов
    //Filter tasks on buttons
    function changeFilterTodolist(value: FilterType, todolistID: string) {
        const action = ChangeFilterTodolistAC(todolistID, value);
        dispatch(action);
    }
    //Change text in title for todolist
    function changeTodolistTitle(newTitle: string, todolistID: string) {
        const action = ChangeTitleTodolistAC(newTitle, todolistID);
        dispatch(action);
    }
    //Delete Todolist
    function removeTodolist(todolistID: string) {
        const action = RemoveTodolistAC(todolistID);
        dispatch(action);
        dispatch(action);
    }
    //add Todolists
    function addTodolist(title: string) {
        const action = AddTodolistAC(title);
        dispatch(action);
        dispatch(action);
    }

    //UI
    const TodolistComponents = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") { tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false); }
        if (tl.filter === "complete") { tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true); }

        return (
            <Grid item key={tl.id}>{/*Если нету key то дом заново перерисовывается, если есть то удаляется конкретный элемент*/}
                <Paper style={{ "padding": "10px" }} elevation={3}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
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
