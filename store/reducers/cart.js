import * as Actions from "../actions";
import CartItem from "../../model/cartItem";

const initialState = {
  items: {},
  totalAmount: 0,
};

const CartReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case Actions.ADD_TO_CART:
      const newProduct = action.product;
      const prodPrice = newProduct.price;
      const prodTitle = newProduct.title;
      let updateOrAddProduct;
      if (state.items[newProduct.id]) {
        updateOrAddProduct = new CartItem(
          state.items[newProduct.id].productQuantity + 1,
          prodPrice,
          prodTitle,
          state.items[newProduct.id].productSum + prodPrice
        );
      } else {
        updateOrAddProduct = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: {
          ...state.items,
          [newProduct.id]: updateOrAddProduct,
        },
        totalAmount: state.totalAmount + prodPrice,
      };

    case Actions.REMOVE_FROM_CART:
      const selectedItem = state.items[action.productId];
      const updatedCartItems = state.items;
      if (selectedItem.productQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedItem.productQuantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.productSum - selectedItem.productPrice
        );
        updatedCartItems[action.productId] = updatedCartItem;
      } else {
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.productPrice,
      };
    default:
      return state;
  }
};

export default CartReducer;
