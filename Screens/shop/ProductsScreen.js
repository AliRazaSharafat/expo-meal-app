import { FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Product from "../../components/shop/Product";

const ProductsScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <Product
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          productDetailHandler={() => {}}
          productToCartHandler={() => {}}
        />
      )}
    />
  );
};

export default ProductsScreen;
