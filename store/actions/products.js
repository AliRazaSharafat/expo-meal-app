export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const createProduct = (title, imageUrl, desc, price) => {
  console.log(title, imageUrl, desc, price);
  return {
    type: CREATE_PRODUCT,
    productData: { title, imageUrl, desc, price },
  };
};

// we are not updating price
export const updateProduct = (productId, title, imageUrl, desc) => {
  console.log("updated Product new", { title, imageUrl, desc });
  return {
    type: UPDATE_PRODUCT,
    pid: productId,
    productData: { title, imageUrl, desc },
  };
};
export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};
