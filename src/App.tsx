import { AppBar, Container, Grid, Paper, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { FilterType, Todolist, TaskType } from './Todolist';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL
    const todoListID1 = v1();
    const todoListID2 = v1();
    const [todoLists, setTodolists] = useState<Array<TodolistType>>(
        [
            { id: todoListID1, title: "What to learn", filter: "all" },
            { id: todoListID2, title: "What to buy", filter: "all" },
        ]
    )
    let [tasks, setTasks] = useState<TaskStateType>({
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
        const todolistTasks = tasks[todolistID]; //ищем в каком тудулисте таска
        const filterTasks = todolistTasks.filter(t => t.id !== taskID);
        tasks[todolistID] = filterTasks;
        setTasks({ ...tasks })
    }
    //Add tasks from input
    function addTask(title: string, todolistID: string) {
        let newTask = { id: v1(), title: title, isDone: false }; // новая таска
        const todolistTasks = tasks[todolistID];//ищем в каком тудулисте таска
        tasks[todolistID] = [newTask, ...todolistTasks]
        setTasks({ ...tasks})
    }
    //Change checkbox
    function changeStatus(id: string, newIsDone: boolean, todolistID: string) {
        const todolistTasks = tasks[todolistID];//ищем в каком тудулисте таска

        const task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = newIsDone;
            setTasks({ ...tasks })
        }
    }
    //Change text in tasks
    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
        const todolistTasks = tasks[todolistID];//ищем в каком тудулисте таска

        const task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({ ...tasks })
        }
    }

    //TODO Функции тудулистов
    //Filter tasks on buttons
    function changeFilterTodolist(value: FilterType, todolistID: string) {
        const todolistSingle = todoLists.find(tl => tl.id === todolistID)//ищем нужный тудулист
        if (todolistSingle) { todolistSingle.filter = value }
        setTodolists([...todoLists])
    }
    //Change text in title for todolist
    function changeTodolistTitle(newTitle: string, todolistID: string) {
        const todolistSingle = todoLists.find(tl => tl.id === todolistID)//ищем нужный тудулист
        if (todolistSingle) { todolistSingle.title = newTitle }
        setTodolists([...todoLists])
    }
    //Delete Todolist
    function removeTodolist(todolistID: string) {
        setTodolists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }
    //add Todolists
    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todoLists]);
        setTasks({ ...tasks, [todolist.id]: [] })
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

export default App;
