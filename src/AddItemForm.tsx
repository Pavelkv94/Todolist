import { TextField } from '@material-ui/core';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") { addTask(); }
    }
    const addTask = () => {
        const trimmerTitle = title.trim()
        if (trimmerTitle) {
            props.addItem(trimmerTitle);
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    return (
        <div>
            <TextField
                variant="outlined"
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : "default"} 
                placeholder="Enter the task"/>
            <AddIcon fontSize="large" onClick={addTask} className="btn">+</AddIcon>
            {error && <div className="errorMessage">{error}</div>}
        </div>
    )
}