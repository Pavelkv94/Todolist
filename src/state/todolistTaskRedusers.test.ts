// создаем тест для обоих редьюсеров
import { TasksStateType, TodolistType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolists-reducer";

test('ids should be equals', () => {
    //создается стартовое значение для тасок
    const startTasksState: TasksStateType = {}; // => {'aaa' : []}
    //создается стартовое значение для тудулиста
    const startTodolistsState: Array<TodolistType> = [];

    //вызываем экшенКреатор, который создает экшен 
    const action = addTodolistAC({ todolistId: "new todolist" }); //=> {id: 'aaa', title: "new todolist", filter: 'all'}

    //редьюсеры создадут новые обьекты с ключами
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
