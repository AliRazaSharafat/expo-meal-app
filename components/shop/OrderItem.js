import { StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useState } from "react";
import CartItem from "./CartItem";

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
        color={Colors.primary}
      />
      {showDetails && (
        <View style={styles.details}>
          {items.map((item, ind) => (
            <CartItem
              key={ind}
              quantity={item.productQuantity}
              title={item.productTitle}
              sum={item.productSum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  details: {
    width: "100%",
  },
});
