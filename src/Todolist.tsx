import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { EditableSpan } from './components/EditableSpan/EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Task } from './Task'
import { FilterValuesType } from './App';
import { TaskStatuses, TaskType } from './api/api'
import { useDispatch } from 'react-redux'
import { fetchTasksTC } from './state/tasks-reducer'
import { RequestStatusType } from './state/app-reducer'

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    entityStatus: RequestStatusType
    demo?: boolean
};

export const Todolist = React.memo(function (props: PropsType) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.demo) {
            return
        }
        const thunk = fetchTasksTC(props.id)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    };
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle]);

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter]);


    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    };
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    };

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} entityStatus={props.entityStatus} />
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{ paddingTop: '10px', display: "flex", justifyContent: "space-between" }}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
            </Button>
        </div>
    </div >
});


