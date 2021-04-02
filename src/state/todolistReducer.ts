import { TodolistType } from "./../App";
import { v1 } from "uuid";
import { FilterType } from "../Todolist";

export type ActionTypeOne = | RemoveTodolistActionType | AddTodolistActionType | ChangeFilterTodolistActionType
  | ChangeTitleTodolistActionType;

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};
export type ChangeFilterTodolistActionType = {
  type: "CHANGE-FILTER-TODOLIST";
  id: string;
  filter: FilterType;
};
export type ChangeTitleTodolistActionType = {
  type: "CHANGE-TITLE-TODOLIST";
  id: string;
  title: string;
};

export function todolistReducer(todolists: Array<TodolistType>, action: ActionTypeOne): Array<TodolistType> {
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
        // если нашёлся - изменим ему заголовок
        todolistFSingle.filter = action.filter;
      }
      return [...todolists];
    case "CHANGE-TITLE-TODOLIST":
      const todolistSingle = todolists.find((tl) => tl.id === action.id);
      if (todolistSingle) {
        // если нашёлся - изменим ему заголовок
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
}
export function AddTodolistAC(title: string): AddTodolistActionType {
  return {
    type: "ADD-TODOLIST",
    title, // вместо title:title можно использовать просто title
  };
}
export function ChangeFilterTodolistAC(id: string, filter: FilterType): ChangeFilterTodolistActionType {
  return {
    type: "CHANGE-FILTER-TODOLIST",
    id, // вместо id:id можно использовать просто id
    filter, // вместо filter:filter можно использовать просто filter
  };
}
export function ChangeTitleTodolistAC(title: string, id: string): ChangeTitleTodolistActionType {
  return {
    type: "CHANGE-TITLE-TODOLIST",
    id,
    title, // вместо id:id можно использовать просто id
  };
}
