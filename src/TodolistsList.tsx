import { Grid, Paper } from "@material-ui/core"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { TaskStatuses } from "./api/api"
import { FilterValuesType, TasksStateType } from "./App"
import { AddItemForm } from "./components/AddItemForm/AddItemForm"
import { AppRootStateType } from "./state/store"
import { addTaskTC, changeTaskTitleTC, removeTasksTC, updateTaskStatusTC } from "./state/tasks-reducer"
import { addTodosTC, changeTodolistFilterAC, changeTodosTitleTC, removeTodosTC, setTodosTC, TodolistDomainType } from "./state/todolists-reducer"
import { Todolist } from "./Todolist"
//* demo - проверка для сторибука
type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        const thunk = setTodosTC()
        dispatch(thunk)
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch();

    //todo TASKS FUNCTION
    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTasksTC(todolistId, id))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title))
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskStatusTC(todolistId, id, status));
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {

        dispatch(changeTaskTitleTC(todolistId, id, newTitle));
    }, []);

    //todo TODOLISTS FUNCTION
    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodosTC(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodosTitleTC(id, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodosTC(title));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    } else {
        return <>
            <Grid container style={{ padding: "20px" }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Paper style={{ padding: "10px" }}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    filter={tl.filter}
                                    entityStatus={tl.entityStatus}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    }
}