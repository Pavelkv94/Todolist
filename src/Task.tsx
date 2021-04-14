import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from './EditabelSpan';
import { TaskType } from './Todolist';

type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    changeTaskTitle: (id: string, newTitle: string) => void
}


export const Task = React.memo((props: TaskPropsType) => {

    const remove = useCallback(() => { props.removeTask(props.task.id) }, [])

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked);

    const changeTaskTitle = (newTitle: string) => { props.changeTaskTitle(props.task.id, newTitle) };


    return (<li className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            className="checkbox"
            color="primary"
            checked={props.task.isDone}
            onChange={changeTaskStatus} />
        <EditableSpan title={props.task.title} changeTitle={changeTaskTitle} />
        <IconButton onClick={remove} className="btn-remove"><Delete fontSize="small" /></IconButton>
    </li>)
})