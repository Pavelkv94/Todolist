import React, { useEffect, useState } from 'react'
import { tasksAPI } from '../api/api'

export default {
    title: 'TASKS-API'
}
const todolistId = "d50fa9a9-437b-470a-a83b-d5134d35a0b9";
const taskId = "29f49cda-31a5-4893-b15a-d6a92cbd45e4";

//task example
let model = {
    title: "React",
    description: "string",
    status: 1,
    priority: 1,
    startDate: "12.12.12",
    deadline: "13.13.13"
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
                console.log(res)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.createTask(todolistId, "Two task").then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

