import PRODUCTS from "../../data/dummy-data";

const initalValue = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

const ProductReducer = (state = initalValue, action) => {
  return state;
};

export default ProductReducer;
