// создаем тест для обоих редьюсеров

import { TaskStateType, TodolistType } from "../App";
import { tasksReducer } from "./tasksReducer";
import { AddTodolistAC, todolistReducer } from "./todolistReducer";

test('ids should be equals', () => {
    //создается стартовое значение для тасок
    const startTasksState: TaskStateType = {}; // => {'aaa' : []}
    //создается стартовое значение для тудулиста
    const startTodolistsState: Array<TodolistType> = [];

    //вызываем экшенКреатор, который создает экшен 
    const action = AddTodolistAC("new todolist"); //=> {id: 'aaa', title: "new todolist", filter: 'all'}

    //редьюсеры создадут новые обьекты с ключами
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);
});
