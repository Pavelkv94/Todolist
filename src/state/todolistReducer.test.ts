import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, TodolistDomainType, todolistsReducer } from './todolists-reducer';
import { v1 } from 'uuid';
import { FilterValuesType } from '../App';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus: "idle" },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus: "idle" },
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC({ todolistId: todolistId1 }))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolist = { id: todolistId2, title: "new Todolist", filter: "all", addedDate: "", order: 1, entityStatus: "idle" };
    const endState = todolistsReducer(startState, addTodolistAC({ todolist: newTodolist }));
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("new Todolist");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };
    const endState = todolistsReducer(startState, changeTodolistTitleAC({ title: action.title, id: action.id }));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New Todolist");
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };
    const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: action.id, filter: action.filter }));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



