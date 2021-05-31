import axios from 'axios'
import { TodolistType } from '../App'


type TodolistResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldErrors: Array<string>
    data: T
}

const instatnce = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': 'a75ca69e-11c9-4fb1-b265-ac7ff31550a1'
    }
})

export const todolistAPI = {

    getTodo() {
        const promise = instatnce.get<Array<TodolistType>>(`todo-lists`)
        return promise
    },
    createTodo(title: string) {
        const promise = instatnce.post<TodolistResponseType<{ item: TodolistType }>>('todo-lists', { title: title })
        return promise
    },
    deleteTodo(todolistId: string) {
        const promise = instatnce.delete<TodolistResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise

    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instatnce.put<TodolistResponseType<{}>>(`todo-lists/${todolistId}`, { title: title })
        return promise
    },
}

export const tasksAPI = {

    getTask(todolistId: string) {
        const promise = instatnce.get(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instatnce.post(`todo-lists/${todolistId}/tasks`, { title: title })
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instatnce.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise

    },
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instatnce.put(`todo-lists/${todolistId}/tasks/${taskId}`, { title: title })
        return promise
    },

}