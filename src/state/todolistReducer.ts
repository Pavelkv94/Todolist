import { TodolistType } from "./../App";
import { v1 } from "uuid";
import { FilterType } from "../Todolist";

type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeFilterTodolistActionType
  | ChangeTitleTodolistActionType;
type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};
type ChangeFilterTodolistActionType = {
  type: "CHANGE-FILTER-TODOLIST";
  id: string;
  filter: FilterType;
};
type ChangeTitleTodolistActionType = {
  type: "CHANGE-TITLE-TODOLIST";
  id: string;
  title: string;
};

export function todolistReducer(
  todolists: Array<TodolistType>,
  action: ActionType
) {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return todolists.filter((tl) => tl.id !== action.id);
    case "ADD-TODOLIST":
      let todolist: TodolistType = {
        id: v1(),
        title: action.title,
        filter: "all",
      };
      return [...todolists, todolist];
    case "CHANGE-FILTER-TODOLIST":
      const todolistFSingle = todolists.find((tl) => tl.id === action.id);
      if (todolistFSingle) {
        todolistFSingle.filter = action.filter;
      }
      return [...todolists];
    case "CHANGE-TITLE-TODOLIST":
      const todolistSingle = todolists.find((tl) => tl.id === action.id);
      if (todolistSingle) {
        todolistSingle.title = action.title;
      }
      return [...todolists];

    default:
      return todolists;
  }
}

//TODO CREATE ACTION CREATORs
export function RemoveTodolistAC(id: string): RemoveTodolistActionType {
  return {
    type: "REMOVE-TODOLIST",
    id, // вместо id:id можно использовать просто id
  };
};
export function AddTodolistAC(title: string): AddTodolistActionType {
  return {
    type: "ADD-TODOLIST",
    title, // вместо title:title можно использовать просто title
  };
};
export function ChangeFilterTodolistAC(id: string, filter:FilterType): ChangeFilterTodolistActionType {
  return {
    type: "CHANGE-FILTER-TODOLIST",
    id, // вместо id:id можно использовать просто id
    filter,// вместо filter:filter можно использовать просто filter
  };
};
export function ChangeTitleTodolistAC(title: string, id:string): ChangeTitleTodolistActionType {
  return {
    type: "CHANGE-TITLE-TODOLIST",
    id,
    title, // вместо id:id можно использовать просто id
  };
};

