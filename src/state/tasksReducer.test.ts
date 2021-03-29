import { TaskStateType } from "./../App";
import { RemoveTasksAC, AddTaskAC, tasksReducer, ChangeStatusTaskAC, ChangeTitleTaskAC } from "./tasksReducer";

test("correct tasks should be removed", () => {
  const startState: TaskStateType = {
    "todoListID1": [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Git", isDone: false },
    ],
    "todoListID2": [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "EGGS", isDone: false },
      { id: "4", title: "Meat", isDone: false },
    ],
  };
  const action = RemoveTasksAC("2", "todolistID2");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListID1"].length).toBe(4);
  expect(endState["todoListID2"].length).toBe(3);
  expect(endState["todoListID2"].every((t) => t.id != "2")).toBe(false);
});

test("correct tasks should be ADD", () => {
  const startState: TaskStateType = {
    "todoListID1": [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Git", isDone: false },
    ],
    "todoListID2": [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "EGGS", isDone: false },
      { id: "4", title: "Meat", isDone: false },
    ],
  };
  const action = AddTaskAC("Juse", "todolistID2");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListID1"].length).toBe(4);
  expect(endState["todoListID2"].length).toBe(5);
  expect(endState["todoListID2"][0].id).toBeDefined();
  expect(endState["todoListID2"][0].title).toBe("Juse");
  expect(endState["todoListID2"][0].isDone).toBe(false);
});

test("correct tasks should be Change Status", () => {
  const startState: TaskStateType = {
    "todoListID1": [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Git", isDone: false },
    ],
    "todoListID2": [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "EGGS", isDone: false },
      { id: "4", title: "Meat", isDone: false },
    ],
  };
  const action = ChangeStatusTaskAC("2", false, "todoListID1");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListID1"][1].isDone).toBe(false);
  expect(endState["todoListID2"][1].isDone).toBe(true);
  
});

test("correct tasks should be Change Task Title", () => {
  const startState: TaskStateType = {
    "todoListID1": [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Git", isDone: false },
    ],
    "todoListID2": [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: true },
      { id: "3", title: "EGGS", isDone: false },
      { id: "4", title: "Meat", isDone: false },
    ],
  };
  const action = ChangeTitleTaskAC("2", "QWEQWE", "todoListID1");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListID1"][1].title).toBe("QWEQWE");
  expect(endState["todoListID2"][1].title).toBe("Bread");
  
});

