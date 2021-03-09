import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { FilterType, Todolist, TaskType } from './Todolist';

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TaskStateType = {
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
        setTasks({ ...tasks })
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

    //Filter tasks on buttons
    function changeFilter(value: FilterType, todolistID: string) {
        const todolistSingle = todoLists.find(tl => tl.id === todolistID)//ищем нужный тудулист
        if (todolistSingle) { todolistSingle.filter = value }
        setTodolists([...todoLists])
    }
    //Delete Todolist
    function removeTodolist (todolistID:string) {
        setTodolists(todoLists.filter(tl=>tl.id!== todolistID))
        delete tasks[todolistID]
    }
    const TodolistComponents = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") { tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false); }
        if (tl.filter === "complete") { tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true); }

        return (
            <Todolist
                id={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
            />
        )
    })

    function addTodolist(title:string) {
       let  todolist: TodolistType = {
           id: v1(),
           title:title,
           filter: "all"
       }
        setTodolists([todolist,...todoLists]);
        setTasks({...tasks, [todolist.id]:[]})
    }
    return (
        <div className="App">
            <AddItemForm addItem = {addTodolist} />
            {TodolistComponents}

        </div>
    );
}

export default App;
