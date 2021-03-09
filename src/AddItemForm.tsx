import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
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
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""} />
            <button onClick={addTask}>+</button>
            {error && <div className="errorMessage">{error}</div>}
        </div>
    )
}