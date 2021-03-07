import React from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';

function App() {
    const tasks = [
        {id:v1(), title: "HTML&CSS", isDone: true},
        {id:v1(), title: "JS", isDone: true},
        {id:v1(), title: "React", isDone: false},
        {id:v1(), title: "Git", isDone: false},
        {id:v1(), title: "SCSS", isDone: false}
    ]
    return (
        <div className="App">
           <Todolist title="What tot learn" tasks={tasks}/>
        </div>
    );
}

export default App;
