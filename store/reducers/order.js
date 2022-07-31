import * as Actions from "../actions";
import Order from "../../model/order";

const initialState = {
  orders: [],
};

const OrderReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case Actions.ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.items,
        action.totalAmount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};

export default OrderReducer;
