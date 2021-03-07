import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "complete"

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTasks: (title: string) => void
}

export function Todolist(props: TodolistType) {
    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTasks(title);
        setTitle("")
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { addTask() }
    }

    const setAllFilter = () => { props.changeFilter("all") };
    const setActiveFilter = () => { props.changeFilter("active") };
    const setCompleteFilter = () => { props.changeFilter("complete") };

    const tasks = props.tasks.map(
        t => {
            const remove = () => { props.removeTask(t.id) }
            return <li key={t.id}>
                <input type="checkbox"
                    checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={remove}>X</button>
            </li>
        }
    )

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask} />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={setAllFilter}>All</button>
                <button onClick={setActiveFilter}>Active</button>
                <button onClick={setCompleteFilter}>Completed</button>
            </div>
        </div>
    )
}