// создаем тест для обоих редьюсеров
import { v1 } from "uuid";
import { TasksStateType, TodolistType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, TodolistDomainType, todolistsReducer } from "./todolists-reducer";

test('ids should be equals', () => {
    //создается стартовое значение для тасок
    const startTasksState: TasksStateType = {}; // => {'aaa' : []}
    //создается стартовое значение для тудулиста
    let todolistId = v1();
    const startTodolistsState: Array<TodolistDomainType> = [];
    const newTodolist = { id: todolistId, title: "new Todolist", filter: "all", addedDate: "", order: 1, entityStatus: "idle" };
    //вызываем экшенКреатор, который создает экшен 
    const action = addTodolistAC({ todolist: newTodolist }); //=> {id: 'aaa', title: "new todolist", filter: 'all'}

    //редьюсеры создадут новые обьекты с ключами
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});