import PRODUCTS from "../../data/dummy-data";
import Product from "../../model/product";
import * as Actions from "../actions";

const initalValue = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

const ProductReducer = (state = initalValue, action) => {
  switch (action.type) {
    case Actions.CREATE_PRODUCT:
      console.log("action", action);
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.desc,
        action.productData.price
      );
      console.log("newProduct", newProduct);
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case Actions.UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      console.log("productIndex", productIndex);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.desc,
        state.userProducts[productIndex].price
      );
      console.log("updatedProduct", updatedProduct);
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.id
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
    default:
      return state;
  }
};

export default ProductReducer;
