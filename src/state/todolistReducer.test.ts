import { AddTodolistAC, ChangeFilterTodolistAC, ChangeTitleTodolistAC, RemoveTodolistAC, todolistReducer } from './todolistReducer';
import { v1 } from 'uuid';
import { TodolistType } from '../App';
import { FilterType } from '../Todolist';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };
    const endState = todolistReducer(startState, ChangeTitleTodolistAC(action.title, action.id));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = "complete";
    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };
    const endState = todolistReducer(startState, ChangeFilterTodolistAC(action.id, action.filter));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



