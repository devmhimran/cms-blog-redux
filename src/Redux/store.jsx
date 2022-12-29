import { applyMiddleware, createStore } from "redux";
import rootReducer from "./Reducers/rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import categoryCounter from "./Middleware/categoryCounter";



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(categoryCounter, thunk)))

export default store;