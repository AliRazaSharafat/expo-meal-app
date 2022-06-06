import { FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Product from "../../components/shop/Product";

const ProductsScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <Product
          title={itemData.item.title}
          price={itemData.item.price.toFixed(2)}
          image={itemData.item.imageUrl}
          productDetailHandler={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          productToCartHandler={() => {}}
        />
      )}
    />
  );
};

export default ProductsScreen;
