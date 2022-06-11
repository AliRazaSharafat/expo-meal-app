import {
  StyleSheet,
  Text,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ quantity, title, sum, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity}</Text>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.text}>${sum}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  quantity: {
    fontSize: 14,
    marginRight: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
