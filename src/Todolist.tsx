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
    filter: FilterType
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTasks: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export function Todolist(props: TodolistType) {
    let [title, setTitle] = useState("")

    let [error,setError] = useState<string | null>(null)
    const addTask = () => {
        const trimmerTitle = title.trim()
        if (trimmerTitle) {
            props.addTasks(title);
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") { addTask(); }
    }

    const setAllFilter = () => { props.changeFilter("all") };
    const setActiveFilter = () => { props.changeFilter("active") };
    const setCompleteFilter = () => { props.changeFilter("complete") };

    const tasks = props.tasks.map(
        t => {
            const remove = () => { props.removeTask(t.id) }
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked)
            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus} />
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
                    onKeyPress={onKeyPressAddTask} 
                    className={error? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className= "errorMessage">{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={setAllFilter} className={props.filter === 'all' ? "active-filter" : ""}>All</button>
                <button onClick={setActiveFilter} className={props.filter === 'active' ? "active-filter" : ""}>Active</button>
                <button onClick={setCompleteFilter} className={props.filter === 'complete' ? "active-filter" : ""}>Completed</button>
            </div>
        </div>
    )
}