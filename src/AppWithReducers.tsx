import { AppBar, Container, Grid, Paper, Toolbar } from '@material-ui/core';
import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { AddTaskAC, ChangeStatusTaskAC, ChangeTitleTaskAC, RemoveTasksAC, tasksReducer } from './state/tasksReducer';
import { AddTodolistAC, ChangeFilterTodolistAC, ChangeTitleTodolistAC, RemoveTodolistAC, todolistReducer } from './state/todolistReducer';
import { FilterType, Todolist, TaskType } from './Todolist';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL
    const todoListID1 = v1();
    const todoListID2 = v1();
    const [todoLists, dispatchTodolistsReducer] = useReducer(todolistReducer,
        [
            { id: todoListID1, title: "What to learn", filter: "all" },
            { id: todoListID2, title: "What to buy", filter: "all" },
        ]
    )
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todoListID1]: [
                { id: v1(), title: "HTML&CSS", isDone: true },
                { id: v1(), title: "JS", isDone: true },
                { id: v1(), title: "React", isDone: false },
                { id: v1(), title: "Git", isDone: false },
                { id: v1(), title: "SCSS", isDone: false }
            ],
            [todoListID2]: [
                { id: v1(), title: "Milk", isDone: false },
                { id: v1(), title: "Bread", isDone: true },
                { id: v1(), title: "EGGS", isDone: false },
                { id: v1(), title: "Meat", isDone: false },
            ],

        })

    //TODO Функции тасок
    //Delete tasks
    function removeTask(taskID: string, todolistID: string) {
        const action = RemoveTasksAC(taskID, todolistID);
        dispatchToTasksReducer(action);
    }
    //Add tasks from input
    function addTask(title: string, todolistID: string) {
        const action = AddTaskAC(title, todolistID);
        dispatchToTasksReducer(action);
    }
    //Change checkbox
    function changeStatus(id: string, newIsDone: boolean, todolistID: string) {
        const action = ChangeStatusTaskAC(id, newIsDone, todolistID)
        dispatchToTasksReducer(action);
    }
    //Change text in tasks
    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
        const action = ChangeTitleTaskAC(id, newTitle, todolistID);
        dispatchToTasksReducer(action);
    }

    //TODO Функции тудулистов
    //Filter tasks on buttons
    function changeFilterTodolist(value: FilterType, todolistID: string) {
        const action = ChangeFilterTodolistAC(todolistID, value);
        dispatchTodolistsReducer(action);
    }
    //Change text in title for todolist
    function changeTodolistTitle(newTitle: string, todolistID: string) {
        const action = ChangeTitleTodolistAC(newTitle, todolistID);
        dispatchTodolistsReducer(action);
    }
    //Delete Todolist
    function removeTodolist(todolistID: string) {
        const action = RemoveTodolistAC(todolistID);
        dispatchToTasksReducer(action);
        dispatchTodolistsReducer(action);
    }
    //add Todolists
    function addTodolist(title: string) {
        const action = AddTodolistAC(title);
        dispatchToTasksReducer(action);
        dispatchTodolistsReducer(action);
    }

    //UI
    const TodolistComponents = todoLists.map(tl => {
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

export default AppWithRedux;