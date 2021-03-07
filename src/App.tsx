import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { FilterType, Todolist } from './Todolist';

function App() {
    let [tasks, setTask] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Git", isDone: false },
        { id: v1(), title: "SCSS", isDone: false }
    ])

    function removeTask(id: string) {
        let filterTasks = tasks.filter(t => t.id != id);
        setTask(filterTasks)
    }

    let [filter,setFilter] = useState<FilterType>("all");
    let tasksForTodolist = tasks;
    if(filter === "active") {tasksForTodolist= tasks.filter(t=>t.isDone===false);}
    if (filter === "complete") {tasksForTodolist= tasks.filter(t=>t.isDone===true);}
    function changeFilter(value: FilterType) {
        setFilter(value);
    }
    return (
        <div className="App">
            <Todolist
                title="What tot learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter = {changeFilter}
            />
        </div>
    );
}

export default App;
