import { title } from 'node:process';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { FilterType, Todolist } from './Todolist';

function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Git", isDone: false },
        { id: v1(), title: "SCSS", isDone: false }
    ])

    //Delete tasks
    function removeTask(id: string) {
        let filterTasks = tasks.filter(t => t.id != id);
        setTasks(filterTasks)
    }

    //Filter tasks on buttons
    let [filter,setFilter] = useState<FilterType>("all");
    let tasksForTodolist = tasks;
    if(filter === "active") {tasksForTodolist= tasks.filter(t=>t.isDone===false);}
    if (filter === "complete") {tasksForTodolist= tasks.filter(t=>t.isDone===true);}
    function changeFilter(value: FilterType) {
        setFilter(value);
    }

    //Add tasks from input
    function addTask(title:string) {
        let task = {id:v1(), title: title, isDone: false};
        let newTasks= [task,...tasks];
        setTasks(newTasks)
    }
    return (
        <div className="App">
            <Todolist
                title="What tot learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter = {changeFilter}
                addTasks={addTask}
            />
        </div>
    );
}

export default App;
