import { combineReducers, createStore, Store } from "redux";
import { tasksReducer } from "./tasksReducer";
import { todolistReducer } from "./todolistReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
}
);
type AppRootState = ReturnType<typeof rootReducer>


export const store:Store = createStore(rootReducer);

//@ts-ignore
window.store=store;