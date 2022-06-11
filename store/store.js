import { createStore, combineReducers } from "redux";
import CartReducer from "./reducers/cart";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductReducer from "./reducers/products";

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
