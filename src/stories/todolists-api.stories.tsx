import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/api';

export default {
    title: 'API'
}
const instatnce = axios.create({
    baseURL: "",
    withCredentials: true,
    headers: {
        'API-KEY': 'a75ca69e-11c9-4fb1-b265-ac7ff31550a1'
    }
})



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodo()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodo("newTitle").then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.deleteTodo('b185fb4f-2582-4437-ba77-9231da03a02f').then((res) => {
            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist('b185fb4f-2582-4437-ba77-9231da03a02f', "newTodo")
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
