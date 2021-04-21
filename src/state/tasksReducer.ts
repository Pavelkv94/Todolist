import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType, todoListID1, todoListID2 } from "./todolistReducer";

type ActionTypeTwo =
  | AddTaskActionType
  | ChangeStatusTaskActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | RemoveTaskActionType;
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

const initialState: TaskStateType = {
  [todoListID1]: [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Git", isDone: false },
    { id: v1(), title: "SCSS", isDone: false }
  ],
  [todoListID2]: [
    { id: v1(), title: "Milk", isDone: false },
    { id: v1(), title: "Bread", isDone: true },
    { id: v1(), title: "EGGS", isDone: false },
    { id: v1(), title: "Meat", isDone: false },
  ],

}

export function tasksReducer(tasks: TaskStateType = initialState, action: ActionTypeTwo): TaskStateType { //tasks === state
  const tasksCopy = { ...tasks }
  switch (action.type) {
    case "REMOVE-TASK": {
      tasksCopy[action.todolistID] = tasksCopy[action.todolistID].filter(t => t.id !== action.taskID)
      return tasksCopy;
    }
    case "ADD-TASK": {
      let newTask = { id: v1(), title: action.title, isDone: false };
      tasksCopy[action.todolistID] = [newTask, ...tasks[action.todolistID]];
      return tasksCopy;   // {...state, [action.todolistID]: [newTask, ...tasks[action.todolistID]]}
    }
    case "CHANGE-STATUS-TASK": {
      // const todolistTasks = tasksCopy[action.todolistID];
      // const task = todolistTasks.find(t => t.id === action.taskID);
      // if (task) { task.isDone = action.newIsDone }    tasks[action.todolistID] = [...todolistTasks]
      // return tasksCopy
      return { ...tasks, [action.todolistID]: tasks[action.todolistID].map(t => { if (t.id === action.taskID) { return { ...t, isDone: action.newIsDone } } else { return t } }) }

    }

    case "CHANGE-TASK-TITLE": {
      // const todolistTasks = tasksCopy[action.todolistID];
      // const task = todolistTasks.find(t => t.id === action.taskID);
      // if (task) {
      //   task.title = action.newTitle;
      //   return tasksCopy
      // }
      return {
        ...tasks,
        [action.todolistID]: tasks[action.todolistID]
          .map(task => task.id === action.taskID
            ? { ...task, title: action.newTitle }
            : task)
      }
    }



    //при добалении нового тудулиста в массив тудулистов добавляем новый пустой массив в ассоциативный массив тасок с ключом
    case "ADD-TODOLIST":
      //let todolistId = v1(); - Два раза создаем ключ, здесь и в todolistReducer, для этого создаем общий ключ в экшерКреаторе AddTodolistAC
      // return {...tasks, [todolistId]: []}
      return { ...tasks, [action.todolistID]: [] }

    //при удалении тудулиста удаляется и массив тасок
    case "REMOVE-TODOLIST": {
      delete tasksCopy[action.id]
      return tasksCopy
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
