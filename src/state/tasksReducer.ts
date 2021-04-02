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

export function tasksReducer(tasks: TaskStateType, action: ActionTypeTwo): TaskStateType { //tasks === state
  const tasksCopy = { ...tasks }
  switch (action.type) {
    case "REMOVE-TASK":
      tasksCopy[action.todolistID] = tasksCopy[action.todolistID].filter(t => t.id !== action.taskID)
      return tasksCopy;

    case "ADD-TASK":
      let newTask = { id: v1(), title: action.title, isDone: false };
      tasksCopy[action.todolistID] = [newTask, ...tasks[action.todolistID]]; 
      return tasksCopy;   // {...state, [action.todolistID]: [newTask, ...tasks[action.todolistID]]}

    case "CHANGE-STATUS-TASK":{
      const todolistTasks = tasksCopy[action.todolistID];
      const task = todolistTasks.find(t => t.id === action.taskID);
      if (task) { task.isDone = action.newIsDone }    //return {...tasks, [action.todolistID]: tasks[action.todolistID].map(t=>{if (t.id === action.taskID) {return {...t, isDone:action.newIsDone}} else {return t}})}
      return tasksCopy
    
    
    }
      

    case "CHANGE-TASK-TITLE":{
      const todolistTasks = tasksCopy[action.todolistID];
      const task = todolistTasks.find(t => t.id === action.taskID);
      if (task) {
        task.title = action.newTitle;
      return tasksCopy} 

      
    }
    default:
      return tasks;
  }
}

//TODO CREATE ACTION CREATORs
export function RemoveTasksAC(taskID: string, todolistID: string): RemoveTaskActionType {
  return {
    type: "REMOVE-TASK",
    taskID,
    todolistID,
  };
}
export function AddTaskAC(title: string, todolistID: string): AddTaskActionType {
  return {
    type: "ADD-TASK",
    title,
    todolistID,
  };
}
export function ChangeStatusTaskAC(taskID: string, newIsDone: boolean, todolistID: string): ChangeStatusTaskActionType {
  return {
    type: "CHANGE-STATUS-TASK",
    taskID,
    newIsDone,
    todolistID,
  };
}
export function ChangeTitleTaskAC(taskID: string, newTitle: string, todolistID: string): ChangeTaskTitleActionType {
  return {
    type: "CHANGE-TASK-TITLE",
    taskID,
    newTitle,
    todolistID,
  };
}
