import { v1 } from "uuid";
import { TaskStateType } from "../App";

type ActionTypeTwo = RemoveTaskActionType | AddTaskActionType | ChangeStatusTaskActionType | ChangeTaskTitleActionType;
type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskID: string;
  todolistID: string;
};
type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistID: string;
};
type ChangeStatusTaskActionType = {
  type: "CHANGE-STATUS-TASK";
  taskID: string;
  newIsDone: boolean;
  todolistID: string;
};
type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskID: string;
  newTitle: string;
  todolistID: string;
};

export function tasksReducer(tasks: TaskStateType, action: ActionTypeTwo): TaskStateType {
  const tasksCopy = { ...tasks }
  switch (action.type) {
    case "REMOVE-TASK":
      tasksCopy[action.todolistID] = tasksCopy[action.todolistID].filter(t => t.id !== action.taskID);
      return tasksCopy;

    case "ADD-TASK":
      let newTask = { id: v1(), title: action.title, isDone: false };
      tasksCopy[action.todolistID] = [newTask, ...tasks[action.todolistID]];
      return tasksCopy;

    case "CHANGE-STATUS-TASK":{
      const todolistTasks = tasksCopy[action.todolistID];
      const task = todolistTasks.find(t => t.id === action.taskID);
      if (task) { task.isDone = action.newIsDone }
      return tasksCopy}

    case "CHANGE-TASK-TITLE":{
      const todolistTasks = tasksCopy[action.todolistID];
      const task = todolistTasks.find(t => t.id === action.taskID);
      if (task) {
        task.title = action.newTitle;
      return tasksCopy}}
    default:
      return tasks;
  }
}
