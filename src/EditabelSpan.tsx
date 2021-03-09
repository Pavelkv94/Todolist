import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    //режим редактирования
    const [editMode, setEditMode] = useState<boolean>(false);
    //локальный стейт для закидывания названия таски в инпут
    let [title, setTitle] = useState(props.title);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
const onEnter = (e:KeyboardEvent)=> {
    if(e.key ==='Enter') {
        setEditMode(false)
        props.changeTitle(title)
    }
}
    
    const onEditMode = () => { setEditMode(true) };
    const offEditMode = () => {
        setEditMode(false);
        props.changeTitle(title);// для сохранения изменений в таске
    };
    return (
        editMode ? <input value={title} onChange={onChangeTitle} onBlur={offEditMode} autoFocus onKeyPress={onEnter} /> : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}