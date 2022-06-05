import { createStore, combineReducers } from "redux";

import ProductReducer from "./reducers/products";

const rootReducer = combineReducers({
  products: ProductReducer,
});

export const store = createStore(rootReducer);
