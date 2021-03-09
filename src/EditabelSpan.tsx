import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    //режим редактирования
    const [editMode, setEditMode] = useState<boolean>(true);
    //локальный стейт для закидывания названия таски в инпут
    let [title, setTitle] = useState(props.title);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onEditMode = () => {setEditMode(true)};
    const offEditMode = () => {setEditMode(false)};
    return (
        editMode ? <input value={title} onChange={onChangeTitle}/> : <span>{props.title}</span>
    )
}