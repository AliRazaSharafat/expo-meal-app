import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import * as Actions from "../../store/actions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.items);
  const transformedItems = [];
  for (const key in cartItems) {
    transformedItems.push({
      productId: key,
      productTitle: cartItems[key].productTitle,
      productQuantity: cartItems[key].productQuantity,
      productPrice: cartItems[key].productPrice,
      productSum: cartItems[key].productSum,
    });
  }
  transformedItems.sort((a, b) => a.productId > b.productId);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: $ <Text style={styles.amount}>{totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          disabled={transformedItems.length === 0}
          color={Colors.secondary}
          onPress={() => {
            dispatch(Actions.addOrder(transformedItems, totalAmount));
          }}
        />
      </View>
      <FlatList
        data={transformedItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.productQuantity}
            title={itemData.item.productTitle}
            sum={itemData.item.productSum}
            deletable
            onRemove={() => {
              dispatch(Actions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    shadowOpacity: 0.26,
    shadowRadius: 8,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
