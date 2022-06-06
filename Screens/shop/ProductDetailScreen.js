import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navdata) => {
  return {
    headerTitle: navdata.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    alignItems: "center",
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
    color: "#888",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 10,
  },
});

export default ProductDetailScreen;
