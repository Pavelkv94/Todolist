import { TodolistType } from "./../App";
import React from "react";
import { v1 } from "uuid";
import { FilterType } from "../Todolist";

type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | FilterTodolistActionType
  | ChangeTitleTodolistActionType;
type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};
type FilterTodolistActionType = {
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
      return [...todolists]
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
