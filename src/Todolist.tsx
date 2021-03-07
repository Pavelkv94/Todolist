import React from 'react';
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType =  "all" | "active" | "complete"

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string)=>void
    changeFilter: (value: FilterType) => void
}


export function Todolist(props: TodolistType) {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(
                    t =>
                        <li key={t.id}>
                            <input type="checkbox"
                                checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={()=>{props.removeTask(t.id)}}>X</button>
                        </li>)}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("all")}}>All</button>
                <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                <button  onClick={()=>{props.changeFilter("complete")}}>Completed</button>
            </div>
        </div>
    )
}