import { FlatList, Platform, Text } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Product from "../../components/shop/Product";
import * as Actions from "../../store/actions";

const ProductsScreen = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);
  const state = useSelector((state) => state);
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
          productToCartHandler={() => {
            dispatch(Actions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

ProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    // headerRight: () => <Text>Cart</Text>,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsScreen;
