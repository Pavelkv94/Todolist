import { TaskStateType } from "./../App";
import { RemoveTasksAC, AddTaskAC, tasksReducer, ChangeStatusTaskAC, ChangeTitleTaskAC } from "./tasksReducer";
import { AddTodolistAC, RemoveTodolistAC } from "./todolistReducer";

let startState: TaskStateType;

beforeEach(() => {
  startState = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };
});




//todo tests for default functions taskReducer
test("correct tasks should be removed", () => {
 

  const action = RemoveTasksAC("2", "todolistId2");

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState).toEqual({
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false }
    ]
  });
});

test("correct tasks should be ADD", () => {
 
  const action = AddTaskAC("juce", "todolistId2");

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);

});

test("correct tasks should be Change Status", () => {

  const action = ChangeStatusTaskAC("2", false, "todolistId1");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].isDone).toBe(false);
  expect(endState["todolistId2"][1].isDone).toBe(true);

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


//todo новый массив должен добавляться в наш ассоциативный массив
test('new array should be added when new todolist is added', () => {
 
  const action = AddTodolistAC("new todolist");

  const endState = tasksReducer(startState, action)
  //после того как отработает создание нвоого тудулиста у нас должен появится третий массив(в ассоциативном), который будет пустым []


  const keys = Object.keys(endState);//забираем в массив все свойства endState
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2"); //проверяем key нового добавленного массива, что он не совпадает ни с первым не со вторым
  //если ключ повторяется то ошибка иначе идем дальше
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);//проверяем что длина ассоциативного массива стала 3
  expect(endState[newKey]).toEqual([]); //проверяем что новый массив пустой
});

//todo проверка что с тудулистом мы и таски тоже удаляем
test('property with todolistId should be deleted', () => {
 
  const action = RemoveTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});



