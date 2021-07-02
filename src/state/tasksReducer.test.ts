
import { TasksStateType } from "../App";
import { removeTaskAC, addTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC } from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    "todolistId1": [
      {
        description: "",
        title: "CSS",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId1",
        order: 1,
        addedDate: ""
      },
      {
        description: "",
        title: "JS",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolistId1",
        order: 1,
        addedDate: ""
      },
      {
        description: "",
        title: "REACT",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todolistId1",
        order: 1,
        addedDate: ""
      },
    ],
    "todolistId2": [
      {
        description: "",
        title: "bread",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId2",
        order: 1,
        addedDate: ""
      },
      {
        description: "",
        title: "milk",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolistId2",
        order: 1,
        addedDate: ""
      },
      {
        description: "",
        title: "water",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todolistId2",
        order: 1,
        addedDate: ""
      },
    ]
  };
});

//todo tests for default functions taskReducer
test("correct tasks should be removed", () => {


  const action = removeTaskAC({ taskId: "3", todolistId: "todolistId2" });

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState).toEqual({
    "todolistId1": [
      {
        description: "",
        title: "CSS",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId1",
        order: 1,
        addedDate: ""
      },
      {
        description: "",
        title: "JS",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolistId1",
        order: 1,
        addedDate: ""
      },
      {
        description: "",
        title: "REACT",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todolistId1",
        order: 1,
        addedDate: ""
      },
    ],
    "todolistId2": [
      {
        description: "",
        title: "bread",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId2",
        order: 1,
        addedDate: ""
      },
      {
        description: "",
        title: "milk",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolistId2",
        order: 1,
        addedDate: ""
      }
    ]
  });
});

test("correct tasks should be ADD", () => {
  const newTask = {
    description: "",
    title: "newTask",
    status: 2,
    priority: 1,
    startDate: "",
    deadline: "",
    id: "4",
    todoListId: "todolistId2",
    order: 1,
    addedDate: ""
  }
  const action = addTaskAC({ task: newTask });

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][3].title).toBe("newTask");
  expect(endState["todolistId2"][3].status).toBe(2);

});

test("correct tasks should be Change Status", () => {

  const action = changeTaskStatusAC({ taskId: "2", status: 3, todolistId: "todolistId1" });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].status).toBe(3);
  expect(endState["todolistId2"][1].status).toBe(1);

});

test("correct tasks should be Change Task Title", () => {

  const action = changeTaskTitleAC({ taskId: "2", title: "QWEQWE", todolistId: "todolistId1" });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("QWEQWE");
  expect(endState["todolistId2"][1].title).toBe("milk");

});


//todo новый массив должен добавляться в наш ассоциативный массив
test('new array should be added when new todolist is added', () => {
  const newTodolist = { id: "todolistId3", title: "new Todolist", filter: "all", addedDate: "", order: 1, entityStatus: "idle" };
  const action = addTodolistAC({ todolist: newTodolist });

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

  const action = removeTodolistAC({ todolistId: "todolistId2" });

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});



