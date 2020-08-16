import { createStore } from "redux";
import rootReducer from "./redux/modules/reducer";

const store = createStore(rootReducer);

export default store;
