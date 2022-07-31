import { createStore, combineReducers } from "redux";
import CartReducer from "./reducers/cart";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductReducer from "./reducers/products";
import OrderReducer from "./reducers/order";

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: OrderReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
