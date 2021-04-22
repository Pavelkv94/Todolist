import { Button, Checkbox, IconButton } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditabelSpan';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Task } from './Task';
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
//export const Todolist = React.memo(({id, title, tasks, filter, removeTask, 
//                                  removeTodolist, addTasks, Changefilter, changeTaskStatus, changeTaskTitle, changeTodolostTitle }: TodolistPropsType) => {
export const Todolist = React.memo((props: TodolistPropsType) => {

    //console.log("TODOLIST RENDER")

    const setAllFilter = useCallback(() => { props.changeFilter("all", props.id) }, [props.id]);
    const setActiveFilter = useCallback(() => { props.changeFilter("active", props.id) }, [props.id]);
    const setCompleteFilter = useCallback(() => { props.changeFilter("complete", props.id) }, [props.id]);

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") { tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false); }
    if (props.filter === "complete") { tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true); }

    const removeTodolist = useCallback(() => { props.removeTodolist(props.id) }, []);
    const addTask = useCallback((title: string) => { props.addTasks(title, props.id) }, [props.id, props.addTasks]);
    const changeTodolistTitle = useCallback((title: string) => { props.changeTodolistTitle(title, props.id) }, [props.id, props.changeTodolistTitle]);

    const remove = useCallback((taskId: string) => { props.removeTask(taskId, props.id) }, [props.id, props.removeTask]);
    const changeTaskTitle = useCallback((newTitle: string, taskId: string) => { props.changeTaskTitle(taskId, newTitle, props.id) }, [props.id, props.changeTaskTitle]);
    const changeTaskStatus = useCallback((taskId: string, isDOne: boolean) => props.changeTaskStatus(taskId, isDOne, props.id), [props.id, props.changeTaskStatus]);

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
                <HighlightOffIcon onClick={removeTodolist} className="btn" fontSize="default" color="secondary"> </HighlightOffIcon></h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {tasksForTodolist.map(
                    t => {
                        return (<Task
                            key={t.id}
                            task={t}
                            todolistId={props.id}
                            removeTask={remove}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />)
                    }
                )}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "outlined"} color="secondary" onClick={setAllFilter} className="btn-filter">All</Button>
                <Button variant={props.filter === 'active' ? "contained" : "outlined"} color="secondary" onClick={setActiveFilter} className="btn-filter">Active</Button>
                <Button variant={props.filter === 'complete' ? "contained" : "outlined"} color="secondary" onClick={setCompleteFilter} className="btn-filter">Completed</Button>
            </div>
        </div>
    )
})

