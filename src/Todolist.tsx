import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditabelSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "complete"

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (taskID: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    addTasks: (title: string, todolistID: string) => void
    changeFilter: (value: FilterType, todolistID: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void


}

export function Todolist(props: TodolistPropsType) {
    const setAllFilter = () => { props.changeFilter("all", props.id) };
    const setActiveFilter = () => { props.changeFilter("active", props.id) };
    const setCompleteFilter = () => { props.changeFilter("complete", props.id) };

    const tasks = props.tasks.map(
        t => {
            const remove = () => { props.removeTask(t.id, props.id) }
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
            const changeTaskTitle = (newTitle: string) => { props.changeTaskTitle(t.id, newTitle, props.id) }
            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus} />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
                <button onClick={remove}>X</button>
            </li>
        }
    )
    const removeTodolist = () => { props.removeTodolist(props.id) };
    const addTask = (title: string) => { props.addTasks(title, props.id) };
    const changeTodolistTitle = (title: string) => { props.changeTodolistTitle(title, props.id) };
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
                <button onClick={removeTodolist}>X</button></h3>
            <AddItemForm addItem={addTask} />
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

